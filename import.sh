git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s"|base64 -w 0
echo -e '\n\n↑ \e[1mDouble-click\e[0m to select, and \e[1mcopy/paste\e[0m in Git History Editor'