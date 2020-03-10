# trace-chrome

`trace-chrome` is a NodeJS script for obtaining a running Chrome browser
instance trace.

This is the same kind of traces you obtain using
[chrome://tracing](chrome://tracing)).

## Prepare

Fetch the repository, and on its root run:

	npm install

It should fetch chrome-remote-interface.

## Run

Run chrome with remote debugging port enabled:

	google-chrome --remote-debugging-port=9222

Take into account Chrome only allows local access to the debugging port. Set up
tunnels if needed if you connect to a remote browser.

Then, again on the root of the trace-chrome folder do:

	nodejs bin/trace-chrome.js -H localhost -p 9222 > yourtrace.json

When the tracing session is finished, press ctrl+c, and it will dump the
resulting JSON.

Check parameters allowed with

	nodejs bin/trace-chrome.js --help

# Examples

## Trace chromium on desktop

If you want to trace chromium on desktop with this tool, first enable remote
debugging port on running it:

	path/to/chromium --remote-debugging-port=9222

Then connect to it in the same machine:

	nodejs bin/trace-chrome.js -p 9222 > yourtrace.json

## Trace chromium on remote device

On running chromium, enable remote debugging port:

	chromium --remote-debugging-port=9876

Enable devtool :

        mkdir -p /var/luna/preferences
        cd /var/luna/preferences
        touch devmode_enabled
        touch debug_system_apps

As Chromium sets as incoming address 127.0.0.1, remote access to the
debugging port is not allowed. So a tunnel is needed to access device
port from host machine. SSH can be used for that:

	ssh root@DEVICE_IP -L 9876:localhost:9876

This will tunnel 9876 port on device to host 9876 port.

Now tracing tool can be used from host:

	nodejs bin/trace-chrome.js -p 9876 > yourtrace.json

