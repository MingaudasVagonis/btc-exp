#!/bin/bash 

echo Launching bcoin

osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd bcoin/ && yarn install && cd bin && ./bcoin --index-tx --index-address --selfish --listen=false"'
else
	osascript -e 'tell app "Terminal" to do script "cd bcoin/bin/ && ./bcoin --index-tx --index-address --selfish --listen=false"'
fi

echo Launching server

osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd btc-exp-server && yarn install && yarn dev-start"'
else
	osascript -e 'tell app "Terminal" to do script "cd btc-exp-server && yarn dev-start"'
fi

echo Launching client

osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd btc-exp-client && yarn install && yarn start"'
else
	osascript -e 'tell app "Terminal" to do script "cd btc-exp-client && yarn start"'
fi

echo Done
