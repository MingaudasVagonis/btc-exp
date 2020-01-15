#!/bin/bash 

echo Launching bcoin

if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/bcoin/ && yarn install && cd bin && ./bcoin --index-tx --index-address --selfish --listen=false"'
else
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/bcoin/bin/ && ./bcoin --index-tx --index-address --selfish --listen=false"'
fi

echo Launching server

if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/btc-exp-server && yarn install && yarn dev-start"'
else
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/btc-exp-server && yarn dev-start"'
fi

echo Launching client

if [ "$1" == "initial" ]; then
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/btc-exp-client && yarn install && yarn start"'
else
	osascript -e 'tell app "Terminal" to do script "cd /Users/mingaudasvagonis/VU/Blockchain/btc-exp/btc-exp-client && yarn start"'
fi

echo Done

#bcoin --proxy user035:0442gO9s@158.129.140.201:3637