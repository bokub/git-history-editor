if [[ "$OSTYPE" == "darwin"* ]]; then
	gnubase64=gbase64
else
	gnubase64=base64
fi

echo -e "$(git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s"|${gnubase64} -w 0)"
echo -e 'Double-click to select, then copy/paste it in Git History Editor'