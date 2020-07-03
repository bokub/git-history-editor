# Git history editor

[![License](https://flat.badgen.net/github/license/bokub/git-history-editor?color=f49068)](https://raw.githubusercontent.com/bokub/git-history-editor/master/LICENSE)

**Git history editor** is an easy-to-use online tool hosted by Github Pages, intended to help you edit your past commits.

Just type [`git.io/editor`](https://git.io/editor) to use it ⚡️

[![Git history editor](http://bit.ly/2eOyTGA)](https://git.io/editor)


## Features

- [X] Bulk edit mode
- [x] Regular edit mode
- [x] Edit author name / email
- [x] Edit commit time / date
- [x] Edit commit message


## How it works

Editing your git history takes 3 main steps:


### Step 1: Import

In order to import information about past commits in any project, Git History Editor asks you the result of your `git log`.

Because this log is made to be read by a program, it is formatted using the `--pretty=format` option of `git log`, then encoded
to `base64` to avoid problems with carriage returns or spaces. 

Only the last 100 commits are imported, because a really huge commit history could drastically slow down your browser, or even make it crash.

The import command to run is the following:

```bash
git log -100 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64 | tr -d "\n"
```


### Step 2: Edit

Git History Editor has a nice UI designed to let you edit what you want in each one of your past commits, or create a rule that will apply to multiple commits. [Just try it](https://git.io/editor).


### Step 3: Export

When the `edit` step is finished, Git History Editor provides a script that you can run in order to apply the changes immediatly.

This script uses the `git filter-branch` command, which is the less painful way to rewrite a git branch history with precision.


## Libraries used

- [Vue.js](https://github.com/vuejs/vue)
- [Materialize](https://github.com/Dogfalo/materialize)
- [jQuery](https://github.com/jquery/jquery)
- [Prism](https://github.com/PrismJS/prism)
- [Jekyll](https://github.com/jekyll/jekyll)
- [Sass](https://github.com/sass/sass)
