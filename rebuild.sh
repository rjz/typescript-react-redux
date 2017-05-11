#!/bin/bash

FILES="src package.json tsconfig.json tslint.json typings.json webpack.config.js"

git checkout master index.html ${FILES}

npm run build

git reset HEAD ${FILES}
rm -rf ${FILES}

# Add referenced files
cat index.html | grep -o '"node_modules.*"' | xargs git add -f
