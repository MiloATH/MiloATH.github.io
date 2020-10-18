#! /bin/bash

set -x
CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
ARGS="--headless --allow-insecure-localhost --hide-scrollbars --window-size=545,408 --virtual-time-budget=1000000"

screenshot() {
 "$CHROME" $ARGS --screenshot="portfolio/$1/screenshot.png" "http://localhost:8000/portfolio/$1/index.html"
}

for i in `ls portfolio`; do
  screenshot $i
done
