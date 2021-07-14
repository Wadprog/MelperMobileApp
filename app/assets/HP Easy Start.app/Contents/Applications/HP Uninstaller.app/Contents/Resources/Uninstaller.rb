#!/usr/bin/env ruby
#
#  uninstaller.rb
#  HP Uninstaller
#
#  Copyright (c) 2013-2015 HP Development Company, L.P.
#  All Rights Reserved Worldwide
#  Proprietary and Confidential - Not for Distribution
#
$installerLogfile="/tmp/com.hp.uninstaller-log.txt"

def puts(msg)
	require 'date'
	require 'fileutils'

	currentDate = DateTime.now.strftime('%Y/%m/%d %H:%M:%S')

	logMsg="#{currentDate} HP Uninstaller: #{msg}"

	super(logMsg)

	%x[/usr/bin/logger "#{logMsg}"]

	File.open($installerLogfile,
		File::CREAT | File::APPEND | File::RDWR, 0666) do |f|
			f.puts "#{logMsg}"
	end

end

class Uninstaller
	require 'optparse'
	require 'optparse/time'
	require 'ostruct'
    require './SystemServices'

	def initialize
		@options = {}
		@options.default = ""
	end

	def parse(args)
		require "./UninstallerInternals"
		opts = OptionParser.new do |opts|
			opts.banner = "Usage: #{File.basename($0)} [options]"

			opts.separator ""
			opts.separator "Specific options:"
			
			# Look for pipe location to report progress with named pipe
			opts.on("--progressPipeLocation PATH", "Pipe location where the progress updates are routed.") do |progressPipeLocation|
				reporter = NamedPipeProgressReporter.new(progressPipeLocation)
				@options["progressReporter"] = reporter
			end
			
			# Look for TCP port to report progress via TCP socket
			opts.on("--progressTCPPort PORT", "TCP PORT where the progress updates are routed.") do |port|
				reporter = TCPProgressReporter.new(port.to_i)
				@options["progressReporter"] = reporter
			end


			opts.on("--waitPid PID", "Process identifier to wait for before uninstalling the uninstaller.") do |waitPid|
				@options["waitPid"] = waitPid
			end

			opts.on("--remove", "Spawn subprocess to uninstall the uninstaller when completed.") do |removalRequested|
				@options["remove"] = true
			end

			opts.separator ""
			opts.separator "Other options:"

			opts.on_tail("--help", "Show this message") do
				puts opts
				exit
			end

		end

		begin
			opts.parse!(args)

			# Required options:
			#if not @options.key?("progressPipeLocation")
			#	raise "Missing required option: --progressPipeLocation"
			#end

			#if not @options.key?("waitPid")
			#	raise "Missing required option: --waitPid"
			#end

			@options
		rescue => ex
			puts "#{ex.class}: #{ex.message}"
			puts opts
			exit(1)
		end
	end

	def performUninstall(_progressReporter, _systemServices)
		require "./UninstallerInternals"

		uninstallerInternals = UninstallerInternals.new(_progressReporter, _systemServices)

		uninstallerInternals.performRemoval()
	end

	def performUninstallerRemoval(_waitPid=nil)
		puts "Detaching uninstaller removal script"

		# Copy script to temp dir.
		removalScriptFilename="removeUninstaller.sh"
		removalScriptSrc="#{Dir.pwd}/#{removalScriptFilename}"
		tempDir=%x[/usr/bin/mktemp -d -q /tmp/com.hp.uninstaller.XXXXXXXXXXX].strip
		removalScriptDest="#{tempDir}/#{removalScriptFilename}"
		%x[/bin/cp -v '#{removalScriptSrc}' '#{removalScriptDest}']

		# queue up copied script for exec after uninstaller exits.
		if(File.exists?(removalScriptDest))
			sleepDelay=1
			backgroundProcess = fork do
				exec "/bin/bash #{removalScriptDest} #{sleepDelay} #{_waitPid} >> #{$installerLogfile}"
			end
			Process.detach(backgroundProcess)
		else
			puts "Unable to invoke script - file not found: [#{removalScriptDest}]"
		end
		puts "Removal script is detached"
	end
end

uninstaller = Uninstaller.new
options = uninstaller.parse(ARGV)

if(options.key?("remove") && options.key?("waitPid"))
	
	# Remove uninstaller itself
	uninstaller.performUninstallerRemoval(options["waitPid"])

else

	# Run Software uninstallation
	
	puts "Starting ------------------------------------------"
	puts "Waiting for incomplete installations..."
	progressReporter = nil
	if (options.key?("progressReporter"))
		progressReporter = options["progressReporter"]
	else
		progressReporter = ProgressReporter.new
	end
	
	progressReporter.open()
	progressReporter.pushProgressUpdate(0.0)

	file = File.open("/private/tmp/com.hp.software.96EB4066-D8CA-4343-ACC7-4D3CCFF4FB01",
				File::RDWR|File::CREAT, 0666)
	file.flock(File::LOCK_EX)
    
    systemServices = SystemServices.new
	uninstaller.performUninstall(progressReporter, systemServices)
	
	file.flock(File::LOCK_UN)
	file.close()
	
	progressReporter.close()

end


#puts "Uninstall completed with code 0"
exit(0)