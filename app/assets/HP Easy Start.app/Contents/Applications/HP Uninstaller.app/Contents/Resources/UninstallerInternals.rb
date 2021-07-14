#!/usr/bin/env ruby
#
#  UninstallerInternals.rb
#  HP Uninstaller
#
#  Copyright (c) 2013-2015 HP Development Company, L.P.
#  All Rights Reserved Worldwide
#  Proprietary and Confidential - Not for Distribution
#
class UninstallerInternals
	require "pathname"
	require "fileutils"
	require "./SystemServices"

	def initialize(_progressReporter, _systemServices)
		@progressReporter = _progressReporter
		@kextRefresh = false
		@dockRefresh = false
        @systemServices = _systemServices
        # @usersInfoList is the array of tuples: tuple[0] = userName tuple[1] = userHomeDirPath
		@usersInfoList = _systemServices.getUsersInfoList()
	end

	def pushProgressUpdate(_incrementAmount = 0.0)
		if @progressReporter != nil
			@progressReporter.pushProgressUpdate(_incrementAmount)
		end
	end

	def interrogateRemovePackagePayloads(_pkgIdPatterns=["com.hp.*", "com.apple.pkg.HP*", "com.apple.pkg.HewlettPackardPrinterDrivers"])

		locatedPacakgeIds = @systemServices.getLocatedPacakgeIds(_pkgIdPatterns)

		pushProgressUpdate(10.0)
		# Get payload listing.
		payloadFilesToRemove=[]
		locatedPacakgeIds.each do | pkgID |
			pushProgressUpdate(10.0/locatedPacakgeIds.count)
			packageVolume, packageLocation = @systemServices.getPkgVolumeAndLocation(pkgID)
			next if packageVolume=="(null)" && packageLocation=="(null)"

			currentPkgPayloadFiles=[]
			%x[/usr/sbin/pkgutil --files "#{pkgID}"].split("\n").each{|x| currentPkgPayloadFiles.insert(0, x)}

			# To handle poorly created help packages.
			languagePaths=[]
			languagePaths = currentPkgPayloadFiles.select{|x| x =~ /\/_Language\/(\w*)/}
			if(languagePaths.count > 0)
				currentPkgPayloadFiles.clear

				basePaths=[]
				languageMatchRegex=/(.*)_Language\/(\w*)/
				languagePaths.each do |x|
					detectedBasepath=x.match(languageMatchRegex)[1]+"**"
					basePaths<<detectedBasepath if !basePaths.include?(detectedBasepath)
					detectedBasepath=x.match(languageMatchRegex)[1]
					basePaths<<detectedBasepath if !basePaths.include?(detectedBasepath)
				end
				
				currentPkgPayloadFiles.concat(basePaths)
			end

			currentPkgPayloadFiles.map!{|x| x.gsub(/\/_Language\/\w*/, "")} # To handle poorly created help packages.

			# Build up a full path to each payload item...
			pathRoot=Pathname.new(packageVolume)+packageLocation if packageLocation != "(null)"
			pathRoot=Pathname.new(packageVolume) if packageLocation == "(null)"
			currentPkgPayloadFiles.map!{|x| (pathRoot+x).to_s }
			payloadFilesToRemove.concat(currentPkgPayloadFiles)
		end

		payloadFilesToRemove.uniq!

		pathsToProtect = loadFileIntoArray("#{Dir.pwd}/pathsToProtect")

		scrubbedPayloadFilesToRemove=(payloadFilesToRemove-pathsToProtect)

		# Compress bundles and subdirs into top level bundle.
		scrubbedPayloadFilesToRemove.delete_if{|x| x=~/\/Contents.*$/}
		scrubbedPayloadFilesToRemove.delete_if{|x| x=~/\.framework\/.*$/}
		scrubbedPayloadFilesToRemove.uniq!

		# Get list of app bundles and kill the processes if they are running.
		appBundles=(scrubbedPayloadFilesToRemove.select{|x| x =~ /.app$/ }).map{|y| File.basename(y)}
		appBundles.delete_if{|x| x=="app"}
		appBundles.each{ | appBundleName | @systemServices.killProcess(appBundleName) }

		# Get list of kernel extension bundles and unload them if they are running.
		kernelExtentions=(scrubbedPayloadFilesToRemove.select{|x| x =~ /.kext$/ }).map{|y| File.basename(y)}
		kernelExtentions.delete_if{|x| x=="kext"}
		kernelExtentions.each{ | kextName | unloadKernelExtension(kextName) }
		#FileUtils.touch("/System/Library/Extensions") if @kextRefresh
		#FileUtils.touch("/Library/Extensions") if @kextRefresh
		%x[/usr/bin/killall -HUP kextd] if @kextRefresh

		# Get list of kernel extension bundles and unload them if they are running.
		dashboardWidgets=(scrubbedPayloadFilesToRemove.select{|x| x =~ /.wdgt$/ }).map{|y| File.basename(y)}
		dashboardWidgets.delete_if{|x| x=="wdgt"}
		dashboardWidgets.each{ | widgetName | unregisterRemoveDashboardWidget(widgetName) }

		# Perform file removal with kext unload handling.
		scrubbedPayloadFilesToRemove.each do | pathToItem |
			pushProgressUpdate(50.0/scrubbedPayloadFilesToRemove.count)
			removeItem(pathToItem)
		end

		# Drop the package receipt
		locatedPacakgeIds.each do |pkgID|
			dropPackageReceipt(pkgID)
			pushProgressUpdate(10.0/locatedPacakgeIds.count)
		end
	end

	def dropPackageReceipt(_pkgID)
#        puts "mb|| #{_pkgID}"
		pathToBundleReceipt=locateBundleReceipt(_pkgID)
		if(pathToBundleReceipt.nil?)
			#Not a bundle receipt.  Use pkgutil to drop the identifier...
			%x[/usr/sbin/pkgutil --forget '#{_pkgID}']
		else
			#Remove the bundle receipt.
			fullPathToBundleReceipt="/Library/Receipts/#{pathToBundleReceipt}"
			#puts "Planning to remove bundle receipt: #{fullPathToBundleReceipt}"
			removeItem(fullPathToBundleReceipt)
		end

		# Note - this uses inverse logic.  If the query succeeds, then the package receipt was not removed.  Otherwise it was removed.
		%x[/usr/sbin/pkgutil --pkgs='#{_pkgID}']
		if($?.success?)
			puts "Unable to drop package identifier: #{_pkgID}"
		else
			#puts "Successfully dropped package identifier: #{_pkgID}"
		end
	end

	def locateBundleReceipt(_pkgID)
		package=nil
		receiptInfoPlistFiles=%x[/usr/bin/find /Library/Receipts -name Info.plist].split("\n")
		regex=/^\/Library\/Receipts\/(.*.pkg)\/Contents\/Info.plist$/
		receiptInfoPlistFiles.each do | infoPlist |
			cfBundleIdentifier=%x[/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" '#{infoPlist}' 2>/dev/null].strip
			if(cfBundleIdentifier==_pkgID)
				begin
					package=infoPlist.match(regex)[1]
				rescue
				end
				break
			end
		end
		return package
	end

	def loadFileIntoArray(dataFilePath="")
		items=[]
		begin
			if(File.exists?(dataFilePath))
				file = File.open(dataFilePath, 'r')
				items=file.readlines
				items.map!{|x| x.strip}
				file.close
				else
				puts "Warning: Data file not found: #{dataFilePath}"
			end
		end
		return items
	end

	def logRemovalStatus(_item)
		if(File.exists?(_item))
			puts "Error:  Failed to remove item: #{_item}"
		else
			puts "Successfully removed item: #{_item}"
		end
	end

	def unloadKernelExtension(_kextName)
#        puts "mb||4: Remove kext #{_kextName}"
		possibleKextInstallPaths=[]
		possibleKextInstallPaths<<"/System/Library/Extensions/#{_kextName}"
		possibleKextInstallPaths<<"/Library/Extensions/#{_kextName}"

		possibleKextInstallPaths.each do | kextLocation |
			if(File.exists?(kextLocation))
				puts "Unloading kernel extension '#{File.basename(_kextName)}'."

				loadedKexts=%x[/usr/sbin/kextstat].split("\n")
				if(loadedKexts.include?(_kextName))
					%x[/sbin/kextunload '#{_kextName}']
					puts "%s kernel extension: #{_kextName}" % ($?.success? ? "Successfully unloaded" : "Failed to unload")
				end

				removeItem(kextLocation)
				@kextRefresh=true
			else
				#puts "Kernel extension '#{_kextName}' doesn't exist on disk.  Skipping removal..."
				next
			end
		end
	end

	def unregisterRemoveFromDock(_bundleId)
		if _bundleId.nil? || _bundleId.empty?
			#puts "Bundle identifier is nil or empty.  Skipping removal..."
			return
		end

		puts "Removing bundle identifier '#{_bundleId}' from Dock if present."

		@usersInfoList.each do | userInfo |
			begin
                userName = userInfo[0]
                userHomeDir = userInfo[1]
				perUserDockPlist="#{userHomeDir}/Library/Preferences/com.apple.dock.plist"

				if(!File.exists?(perUserDockPlist))
					puts "Dock PLIST file doesn't exist for user #{userName} : #{perUserDockPlist}"
					next
				end

				index=0
				plistData=[]
				while(true)
					plistData << %x[/usr/libexec/PlistBuddy -c "Print :persistent-apps:#{index}" "#{perUserDockPlist}" 2>/dev/null]
					break if !$?.success?
					index=index+1
				end

				bundleIdPlistIndex=plistData.index(plistData.select{|x| x.include?(_bundleId)}[0])
				if(!bundleIdPlistIndex.nil?)
					%x[/usr/libexec/PlistBuddy -c "Delete :persistent-apps:#{bundleIdPlistIndex}" "#{perUserDockPlist}"]
					@dockRefresh = true
				end
			rescue
				# Do nothing, continue.
			end
		end
	end

	def unregisterRemoveDashboardWidget(_widgetName)
		puts "Unregistering dashboard widget '#{_widgetName}' if registered."
		@usersInfoList.each do | userInfo |
			begin
                userName = userInfo[0]
                userHomeDir = userInfo[1]
				perUserDashboardPlist="#{userHomeDir}/Library/Preferences/com.apple.dashboard.plist"

				if(!File.exists?(perUserDashboardPlist))
					puts "Dashboard PLIST file doesn't exist for user #{userName}: #{perUserDashboardPlist}"
					next
				end

				index=0
				plistData=[]
				while(true)
					plistData << %x[/usr/libexec/PlistBuddy -c "Print :layer-gadgets:#{index}" "#{perUserDashboardPlist}" 2>/dev/null]
					break if !$?.success?
					index=index+1
				end

				widgetPlistIndex=plistData.index(plistData.select{|x| x.include?(_widgetName)}[0])
				if(!widgetPlistIndex.nil?)
					%x[/usr/libexec/PlistBuddy -c "Delete :layer-gadgets:#{widgetPlistIndex}" "#{perUserDashboardPlist}"]
					#puts "%s dashboard widget '#{_widgetName}' from plist '#{perUserDashboardPlist}'" % ($?.success? ? "Successfully removed" : "Failed to remove")

					pathRegex=/path = (.*)\/$/
					widgetPath=(plistData[widgetPlistIndex].split("\n")).select{|x| x =~ pathRegex}[0].match(pathRegex)[1]
					@dockRefresh = true
				else
					#puts "Unable to locate widget '#{_widgetName}' in dashboard plist: #{perUserDashboardPlist}"
				end
			rescue
				# Do nothing, continue.
			end
		end
	end

	def removeItem(_item)
		containsWildcard=_item.include?("*")
		if(!containsWildcard && !File.exists?(_item) && !File.symlink?(_item))
			#puts "Item '#{_item}' doesn't exist, skipping removal..."
			return
		end

		if(File.directory?(_item) && !containsWildcard)
#            puts "mb||1: #{File}"
#            puts "mb||2: #{File.basename}"
			if(File.extname(_item) == ".kext")
				# Folder is really a KEXT bundle...
				kextLocations=["/System/Library/Extensions/#{File.basename(_item)}", "/Library/Extensions/#{File.basename(_item)}"]
				kextLocations.each do | kextPath |
					if(File.exists?(kextPath))
						%x[/bin/rm -rf '#{kextPath}']
						logRemovalStatus(kextPath)
					end
				end
			elsif(File.extname(_item) == ".app")
				# Folder is really an APP bundle...
				bundleInfoPlist="#{_item}/Contents/Info.plist"
				puts "Checking for presence of app bundle Info.plist file: #{bundleInfoPlist}"
				if(File.exists?(bundleInfoPlist))
					cfBundleIdentifier=%x[/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "#{bundleInfoPlist}"].strip
					puts "Located bundle identifier '#{cfBundleIdentifier}' for app bundle '#{File.basename(_item)}'."
					unregisterRemoveFromDock(cfBundleIdentifier) if(! (cfBundleIdentifier.nil? || cfBundleIdentifier.empty?))
				else
					puts "Note: App bundle Info.plist file '#{bundleInfoPlist}' doesn't exist."
				end

				%x[/bin/rm -rf '#{_item}']
				logRemovalStatus(_item)
			elsif(!File.extname(_item).empty?)
				# Folder has an extension...
				%x[/bin/rm -rf '#{_item}']
				logRemovalStatus(_item)
			else
				# Folder has no extension...
				isRemoved = @systemServices.removeDirectoryIfEmpty(_item)
				if (isRemoved)
					logRemovalStatus(_item)
				end
			end
		else
			# Item is a file...

			if(containsWildcard)
				# Item contains wildcards...
                _item.gsub!(' ', '\ ')
                puts "Removing wildcard item: #{_item}"
                itemsRemoved=%x[/bin/rm -rf #{_item}].split("\n")
                itemsRemoved.each{ |x| logRemovalStatus(x) }
			else
				# Item does not contains wildcards...
				%x[/bin/rm -rf '#{_item}']
				logRemovalStatus(_item)
			end
		end
	end

	def cleanupPreferenceFiles(_itemsToRemove=[], _userKey="%%USER_PATH%%")
		@usersInfoList.each do | userInfo |
            userName = userInfo[0]
            userHomeDir = userInfo[1]
			_itemsToRemove.each do | runtimeItemToDelete |
				if runtimeItemToDelete.include?(_userKey)
					# Item is a per-user item.
                    removeItem(runtimeItemToDelete.gsub(_userKey, userHomeDir))
				else
					# Item is a global item.
					removeItem(runtimeItemToDelete)
				end
			end

			# 10.9 and later caches preference files.
			# Need to restart the cache process to refresh the state.
			%x[/usr/bin/su #{userName} -c "killall cfprefsd"]
		end
	end

	def resetPrintSubsystem
		begin
			puts "mb|| Resetting the print subsystem..."

			@systemServices.cancelAllPrintJobs()
			
			@systemServices.removeHPPrintQueues()

			begin
				itemsToRemove=[]
				itemsToRemove<<"%%USER_PATH%%/Library/Printers"
				@usersInfoList.each do | userInfo |
					itemsToRemove.each do | item |
						if item.include?("%%USER_PATH%%")
                            userHomeDir = userInfo[1]
							resolvedItem=item.gsub("%%USER_PATH%%", userHomeDir)
							next if !File.exists?(resolvedItem)

							Dir.entries(resolvedItem).select{|x| File.extname(x)==".app"}.each do | printerProxyItem |
								Dir.chdir(resolvedItem) do
									@systemServices.killProcess(File.basename(printerProxyItem))
									removeItem(printerProxyItem)
								end
							end
						else
							removeItem(item)
						end
					end
				end
			rescue
				puts "ERROR:  An error occurred while removing queue proxy bundles."
			end

			%x[/bin/launchctl stop org.cups.cupsd]
			puts "%s 'org.cups.cupsd'." % ($?.success? ? "Successfully stopped" : "FAILED to stop")

			removeItem("/var/spool/fax/*")
			removeItem("/var/spool/cups/*")
			%x[/bin/mv -v /etc/cups/cupsd.conf /etc/cups/cupsd.conf.backup] if File.exists?("/etc/cups/cupsd.conf")
			%x[/bin/cp -p /etc/cups/cupsd.conf.default /etc/cups/cupsd.conf] if File.exists?("/etc/cups/cupsd.conf.default")
			%x[/bin/launchctl start org.cups.cupsd]
			puts "%s 'org.cups.cupsd'." % ($?.success? ? "Successfully restarted" : "FAILED to restart")
			puts "Print subsystem reset done."
		rescue
			puts "Error during print subsystem reset."
		end
	end

	def shutdownRemoveHPLaunchAgents
		@usersInfoList.each do | userInfo |
			begin
                userName = userInfo[0]
				puts "Shutting down agents for user '#{userName}'"

				allLaunchAgents=%x[/usr/bin/su #{userName} -c "/bin/launchctl list"].split("\n")
				hpLaunchAgents=allLaunchAgents.select{|x| x.include?("com.hp")}
				hpLaunchAgents=hpLaunchAgents.delete_if{|x| x.include?("Uninstaller")}
				hpLaunchAgents.map!{|x| x.split(" ")[2]}
				allCurrentHpLaunchAgents=hpLaunchAgents.delete_if{|x| x.start_with?("[0x")}

				allCurrentHpLaunchAgents.each do | x |
					puts "Shutting down launch agent: '#{x}'."
					%x[/usr/bin/su '#{userName}' -c "/bin/launchctl unload #{x}"]

					puts "Removing launch agent: '#{x}'."
					%x[/usr/bin/su '#{userName}' -c "/bin/launchctl remove #{x}"]
				end
			rescue
				next
			end
		end

		if(File.directory?("/Library/LaunchAgents"))
			allHPAgentFiles=Dir.entries("/Library/LaunchAgents").select{|x| x.include?("com.hp")}
			allHPAgentFiles.each{|x| removeItem(x)}
		end
	end

	def performRemoval()
		#Close HP Easy Start
		@systemServices.closeHPEasyStart()

		# Reset print subsystem:
		pushProgressUpdate(2.0)
		resetPrintSubsystem()

		# Disable current launch agents:
		pushProgressUpdate(3.0)
		shutdownRemoveHPLaunchAgents()

		# HP/ASU packages
		asuPackages=["com.apple.pkg.HP*"]
        asuPackagesNew=["com.apple.pkg.HewlettPackardPrinterDrivers"]
        

		# Load list of packages from 'packages' file
		packageIdsFromFile = loadFileIntoArray("#{Dir.pwd}/packages")

		# Kill processes, drop all package payloads and receipts:
		interrogateRemovePackagePayloads(asuPackages+asuPackagesNew+packageIdsFromFile)

		# Remove preference files:
		pushProgressUpdate(5.0)
		loadedUserPreferenceFiles = loadFileIntoArray("#{Dir.pwd}/runtimeItems")
		cleanupPreferenceFiles(loadedUserPreferenceFiles, "%%USER_PATH%%")

		# Prune empty directories recursively...
		loadedUserPreferenceFiles.each do |item|
			removedDirs = @systemServices.removeDirectoryTreeIfEmpty(item)
			removedDirs.each{|removedDir| logRemovalStatus(removedDir)}
		end

		# Reset launch services...
		pushProgressUpdate(2.0)
		@systemServices.launchServicesReset()

		# Reset print subsystem once more:
		pushProgressUpdate(3.0)
		resetPrintSubsystem()

		@systemServices.killProcess("Dock.app") if @dockRefresh
		
		# Remove scan modules defaults
		@systemServices.removeDefaults("com.hp.scanModule2")
		@systemServices.removeDefaults("com.hp.scanModule3")
		@systemServices.removeDefaults("com.hp.scanModule4")
		@systemServices.removeDefaults("com.hp.scancaps")

		pushProgressUpdate(100.0)
		sleep(2)
	end
end


# Base progress reportedr
class ProgressReporter
	def initialize
		@progress = 0.0
	end
	
	# Do nothing by default
	def open; end
	def close; end
	
	# Report numeric progress
	def pushProgressUpdate(_incrementAmount = 0.0)
		@progress += _incrementAmount
		if @progress > 100
			@progress = 100
		end
		__reportProgressData(__formatNumericProgress(@progress))
	end
	
	# Overrides
	def __formatNumericProgress(_progressValue)
		return "%.3f" % _progressValue
	end

	def __reportProgressData(_progressTextData)
		print _progressTextData
	end
end

# Peporter for named pipes
class NamedPipeProgressReporter < ProgressReporter
  def initialize(_pipePath)
      super()
      @pipePath = _pipePath  
  end
  
  def __reportProgressData(_progressText)
      outputProgressPipe = File.open(@pipePath, "w+")
      outputProgressPipe.sync = true
      outputProgressPipe.printf(_progressText)
      outputProgressPipe.fsync()
      outputProgressPipe.flush()
      outputProgressPipe.close()
      outputProgressPipe = nil
  end
end

#Progress reporter that uses TCP socket
class TCPProgressReporter < ProgressReporter
	require 'socket'
	def initialize(_tcpPort)
		super()
		@tcpPort = _tcpPort
		@socket = nil
	end
  
	def open
		if @socket == nil
			@socket = TCPSocket.new('localhost', @tcpPort)
		end
	end
  
	def close()
		if @socket != nil
			@socket.close()
			@socket = nil
		end 
	end
	
	def __formatNumericProgress(_progressValue)
		return "[%.3f]" % _progressValue
	end
	  
	def __reportProgressData(_progressText)
		if @socket != nil
     		@socket.puts(_progressText)
   	end 
	end 
end
