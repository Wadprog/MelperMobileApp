#!/bin/sh
#  removeUninstaller.sh
#  HP Uninstaller
#
#  Copyright (c) 2013-2015 HP Development Company, L.P.
#  All Rights Reserved Worldwide
#  Proprietary and Confidential - Not for Distribution
#
SLEEP_DELAY=$1
WAIT_PID=$2

LogMessage() {
	DATE=`date +'%Y/%m/%d %H:%M:%S'`
	echo "${DATE} HP Uninstaller: $1"
}

LogMessage 'Running removal script'

# Block until WAIT_PID is gone.
while true; do
	STATUS=`/bin/ps p $WAIT_PID 2>/dev/null >/dev/null;/bin/echo $?`

	if [ $STATUS -ne "0" ]; then
		break;
	fi
	/bin/sleep $SLEEP_DELAY
done

LogMessage 'Removing uninstaller'

# Drop the package receipt.
/usr/sbin/pkgutil --forget com.hp.Uninstaller

# Remove the Hewlett-Packard folder if empty.
VENDOR_FOLDER_PATHS=("/Applications/Hewlett-Packard" "/Applications/HP")
for HP_DIR in "${VENDOR_FOLDER_PATHS[@]}"; do

	# Remove the application bundle if present.
	UNINSTALLER_BUNDLE="${HP_DIR}/HP Uninstaller.app"
	if [ -d "${UNINSTALLER_BUNDLE}" ]; then
		LogMessage "Removing ${UNINSTALLER_BUNDLE}"
		/bin/rm -rf "${UNINSTALLER_BUNDLE}"
	fi

	SUBDIR_ITEMS=`/bin/ls -1 "${HP_DIR}" | /usr/bin/grep -v Icon | /usr/bin/grep -v "^\\." | /usr/bin/wc -l`
    if [ $SUBDIR_ITEMS -eq 0 ]; then
	 LogMessage "Removing ${HP_DIR}"
    /bin/rm -rf "${HP_DIR}"
    fi
done

LogMessage 'Uninstaller removal completed'

exit 0