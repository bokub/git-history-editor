if [[ "$OSTYPE" == "darwin"* ]]; then
	gnubase64="base64"
	command -v gbase64 > /dev/null 2>&1 && gnubase64="gbase64 -w0"
else
	gnubase64="base64 -w 0"
fi

echo -e "$(git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s"|${gnubase64})"
echo -e 'Double-click to select, then copy/paste it in Git History Editor'