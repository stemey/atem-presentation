#!/bin/bash
echo "working on $1"
dot -T svg -o /tmp/$1.svg $1.dot 
xsltproc /home/stefan/application/dojo/gfx/svg2gfx.xsl /tmp/$1.svg > /tmp/$1.js
sed 's/,}/}/' /tmp/$1.js > /usr/share/mini-httpd/html/graph/$1.js
