#!/bin/sh

# change to working directory
cd /workspace

# container init commands
chown -R dockerapp:dockerapps $LOGS

echo NODE_ENV=$NODE_ENV 

# call su-exec to execute the main process with non-root user
if [ $NODE_ENV == development ]
then
    npm install
    echo CHROME INSPECTOR PORT $DEV_PORT
    exec su-exec dockerapp:dockerapps npm run dev
else
    npm install
    exec su-exec dockerapp:dockerapps npm run start
fi
