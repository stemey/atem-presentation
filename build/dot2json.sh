#!/bin/bash

regex='resources/(.*)\.dot'
for i in resources/*.dot
do
	file=$(echo $i)
	echo "working on $file"
	[[ $file =~ $regex ]];
	name=${BASH_REMATCH[1]}	
	echo "working on $name"
	dot -T svg -o /tmp/$name.svg $i
	xsltproc build/svg2gfx.xsl /tmp/$name.svg > /tmp/$name.js
	mkdir -p target/graph/pages
	sed 's/,}/}/' /tmp/$name.js > target/graph/pages/$name.json
done
