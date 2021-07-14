#!/usr/bin/env ruby
#
#  SystemServices.rb
#  HP Uninstaller
#
#  Copyright (c) 2013-2017 HP Development Company, L.P.
#  All Rights Reserved Worldwide
#  Proprietary and Confidential - Not for Distribution
#

class SystemServices
    
    def getUsersInfoList
        usersInfoList = []
        usersNamesList = getUsersNamesList()
        usersNamesList.each do | userName |
           userInfo = userName, pathToHomeDirForUser(userName)
           usersInfoList << userInfo
        end
        
        return usersInfoList
    end

	def getUsersNamesList
		userList	= []
		possibleUsers = (%x[/usr/bin/dscl . list /users shell | /usr/bin/grep -v "false" | /usr/bin/grep -v "_uucp" | /usr/bin/grep -v "root" | /usr/bin/awk '{ printf("%s\\n", $1) }']).split("\n")
		possibleUsers.each do | u |
			output=%x[/usr/bin/su '#{u}' -c '/bin/ls' 2>&1]
			userList<<u if !output.include?("unknown")
		end
	end

	def pathToHomeDirForUser(_userName)
		homeDirPath = (%x[/usr/bin/dscacheutil -q user -a name "#{_userName}" | /usr/bin/grep "dir" | /usr/bin/awk '{ printf("%s\\n", $2) }']).strip
		return homeDirPath
	end
    
  	def killProcess(_appName)
		#puts "Shutting down process if running '#{_appName}'."
		pidList=(%x[/bin/ps aux | /usr/bin/grep "#{_appName}" | /usr/bin/grep -v "grep" | /usr/bin/awk '{ printf("%s\\n", $2) }']).split("\n")

		if pidList.count == 0
			#puts "No processes found for application '#{_appName}'."
			return
		end

		#puts "Note - multiple processes found for application '#{_appName}'." if pidList.count > 1

		pidList.each do | pid |
			if !pid.empty?
				%x[/bin/kill -9 "#{pid}"]
				if $?.success?
					puts "Process '#{pid}' (#{_appName}) closed."
				else
					puts "Error closing process '#{pid}' (#{_appName})."
				end
			end
		end
	end

	def closeHPEasyStart
		appName = "HP Easy Start"
	  
	  	# Precess IDs of all opened HP Easy Start app
	  	pidList=(%x[/bin/ps aux | /usr/bin/grep "#{appName}" | /usr/bin/grep -v "grep" | /usr/bin/grep -v "HP Uninstaller" | /usr/bin/awk '{ printf("%s\\n", $2) }']).split("\n")
		
		pidList.each do | pid |
			if !pid.empty?
				# full path to opened app
				pathToApp = (%x[/bin/ps -p "#{pid}" -o "comm="]).strip
				
				if pathToApp.empty?
				  next
				end
				
				# Try to quit HP Easy Start gracefully
				%x[/usr/bin/osascript -e 'quit app "#{pathToApp}"' 2>&1]
                
                # Waiting for apple script finished
                result = $?
            end
	  	end
	  
	  	# If app didn't quit, kill it
	  	pidList=(%x[/bin/ps aux | /usr/bin/grep "#{appName}" | /usr/bin/grep -v "grep" | /usr/bin/grep -v "HP Uninstaller" | /usr/bin/awk '{ printf("%s\\n", $2) }']).split("\n")
		if pidList.count != 0
			%x[/usr/bin/killall 'HP Easy Start' 2>&1]
		end
	end

	def removeDirectoryIfEmpty(_directory)
		pathEmpty = false
		if(File.directory?(_directory))
			pathEmpty=(Dir.entries(_directory).delete_if{|x| x.start_with?(".") || x.start_with?("Icon") }.count == 0)
			if(pathEmpty)
				%x[/bin/rm -rf '#{_directory}']
			end
		end
		return pathEmpty
	end

	def removeDirectoryTreeIfEmpty(_directory)
		removedItems = []
		if(File.directory?(_directory))
			dfsTree=%x[/usr/bin/find -d '#{_directory}' 2>/dev/null].split("\n")
			dfsTree.each do | dfsPath |
				isRemoved = removeDirectoryIfEmpty(dfsPath)
				if (isRemoved)
					removedItems << dfsPath
				end
			end
		end
		return removedItems
	end
	
	def removeDefaults(_defaultsName)
		%x[/usr/bin/defaults delete '#{_defaultsName}' 2>&1]
	end

	def cancelAllPrintJobs
		%x[/bin/bash -c "SOFTWARE= LANG=C /usr/bin/lpstat -a " | /usr/bin/awk '{print $1}' | /usr/bin/xargs -I{} /usr/bin/cancel -a '{}']
	end
	
	def removeHPPrintQueues
		begin
			# retrieved all print queue names
			printQueueNames = nil
			if(defined?((String.new).force_encoding).nil?)
				#Ruby pre-2.0
				printQueueNames=%x[/bin/bash -c "SOFTWARE= LANG=C /usr/bin/lpstat -p 2>/dev/null" | /usr/bin/awk '{print $2}'].split("\n").map{|x| x.strip }
			else
				#Ruby 2.0
				printQueueNames=%x[/bin/bash -c "SOFTWARE= LANG=C /usr/bin/lpstat -p 2>/dev/null" | /usr/bin/awk '{print $2}'].force_encoding("UTF-8").split("\n").map{|x| x.strip }
			end

			# remove non HP queues
			hpPrintQueueNames = printQueueNames.reject{ |queueName| false == printQueueHasHPOrigin(queueName) }
						
			puts "NOTE:  No HP printer's queues to process." if hpPrintQueueNames.count == 0

			# removing HP print queues
			hpPrintQueueNames.each do | printQueue |
				puts "Deleting printer queue: [#{printQueue}]"
				
				fork do
   				ENV['SOFTWARE'] = ''
   				ENV['LANG'] = 'C'
   				exec "/usr/sbin/lpadmin", "-x", printQueue
				end
				Process.wait
	
				puts "Printer queue [#{printQueue}] %s." % ($?.success? ? "removed successfully." : "FAILED to be removed.")
			end
		rescue
			removeAllPrintQueues()
		end		
	end
	
	def printQueueHasHPOrigin(_queueName)
		
		queueHasHPOrigin = false
		
		queuePPDPath = "/etc/cups/ppd/#{_queueName}.ppd"
		
		if File.exists?(queuePPDPath)
			ppdFile = open(queuePPDPath)
			
			ppdFile.each_line { |line|

				# Exclude AirPrint generated queues
				if line.include? "APAirPrint: True"
					break
				end
				
				if line.include? "/Library/Printers/hp/" or
					line.include? "/Library/Image Capture/Devices/HP Scanner"
					
					queueHasHPOrigin = true
					break
				end
			}
		else
			puts "ERROR:  PPD file is missing for queue with name #{_queueName}."			
		end
		
		return queueHasHPOrigin
	end

	def removeAllPrintQueues
		begin
			# retrieved all print queue names
			printQueueNames = nil
			if(defined?((String.new).force_encoding).nil?)
				#Ruby pre-2.0
				printQueueNames=%x[/bin/bash -c "SOFTWARE= LANG=C /usr/bin/lpstat -p 2>/dev/null" | /usr/bin/awk '{print $2}'].split("\n").map{|x| x.strip }
			else
				#Ruby 2.0
				printQueueNames=%x[/bin/bash -c "SOFTWARE= LANG=C /usr/bin/lpstat -p 2>/dev/null" | /usr/bin/awk '{print $2}'].force_encoding("UTF-8").split("\n").map{|x| x.strip }
			end

			puts "NOTE:  No printer's queues to process." if printQueueNames.count == 0

			# removing print queues
			printQueueNames.each do | printQueue |
				puts "Deleting printer queue: [#{printQueue}]"
				
				fork do       
   				ENV['SOFTWARE'] = ''
   				ENV['LANG'] = 'C'
   				exec "/usr/sbin/lpadmin", "-x", printQueue
				end
				Process.wait
				
				puts "Printer queue [#{printQueue}] %s." % ($?.success? ? "removed successfully." : "FAILED to be removed.")
			end
		rescue
			puts "ERROR:  An error occurred while removing printer's queues."
		end
	end

	def launchServicesReset
	  puts "Resetting launch services cache..."
	  coreLaunchServicesPath="/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/"
	  if(File.directory?(coreLaunchServicesPath))
			Dir.chdir(coreLaunchServicesPath) do
				 %x[./lsregister -kill -domain local -domain system -domain user]
				 puts "Launch services cache reset %s." % ($?.success? ? "succeeded" : "FAILED")
			end
	  end
	end

	def getPkgVolumeAndLocation(_pkgID)
        packageInfo=%x[/usr/sbin/pkgutil --pkg-info "#{_pkgID}"].split("\n")
		packageVolume = "(null)"
		packageLocation = "(null)"
		begin
			volumeRegex=/^volume:\s(.*)$/
			packageVolume = packageInfo.select{|x| x =~ volumeRegex}[0].match(volumeRegex)[1]

			locationRegex=/^location:\s(.*)$/
			packageLocation = packageInfo.select{|x| x =~ locationRegex}[0].match(locationRegex)[1]
		rescue
			puts "Error obtaining package location information for package ID '#{pkgID}'.  Skipping..."
			packageVolume = "(null)"
			packageLocation = "(null)"
		end
		return packageVolume, packageLocation
	end

	def getLocatedPacakgeIds(_pkgIdPatterns=["com.hp.*", "com.apple.pkg.HP*", "com.apple.pkg.HewlettPackardPrinterDrivers"])
		wildCardPkgPatterns=_pkgIdPatterns.select{|x| x.include?("*")}
		nonWildCardPkgPatterns=_pkgIdPatterns-wildCardPkgPatterns
		currentClientPackageIds=%x[/usr/sbin/pkgutil --pkgs].split("\n")
		locatedNonWildCardPackageIds=(currentClientPackageIds & nonWildCardPkgPatterns)

		locatedWildCardPacakgeIds=[]
		wildCardPkgPatterns.each{ | pkgID | locatedWildCardPacakgeIds.concat(%x[/usr/sbin/pkgutil --pkgs='#{pkgID}'].split("\n")) }

		return (locatedWildCardPacakgeIds+locatedNonWildCardPackageIds)
	end

end
