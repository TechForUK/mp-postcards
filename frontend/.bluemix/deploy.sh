#!/bin/bash

npm config delete prefix
curl "https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh" | bash
. "$HOME/.nvm/nvm.sh"
nvm install 8.9.0

npm install -g @angular/cli

cd frontend

npm install
npm run build

cp src/Staticfile dist/gbhackoff-postcards/

cd dist/gbhackoff-postcards

cf push "${CF_APP}" -m 64M
