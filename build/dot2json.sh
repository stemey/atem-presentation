#!/bin/bash
echo "working on $1"
dot -T svg -o /tmp/$1.svg src/graph/$1.dot 
xsltproc build/svg2gfx.xsl /tmp/$1.svg > /tmp/$1.js
#mkdir target/graph
sed 's/,}/}/' /tmp/$1.js > target/graph/$1.js
