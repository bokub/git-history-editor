# Git History Editor
Git History Editor is an easy-to-use online tool hosted by Github Pages, intended to help you edit your past commits. 

---

## [<p align="center">git.io/editor</p>](https://git.io/editor)

---

## How it works

Editing your git history takes 3 main steps:

### Step 1: Import

In order to import information about past commits in any project, Git History Editor asks you the result of your `git log`.

Because this log is made to be read by a program, it is formatted using the `--pretty=format` option of `git log`, then encoded
to `base64` to avoid problems with carriage returns or spaces. 

Only the last 1000 commits are imported, because a really huge commit history could drastically slow down your browser, or even make it crash.

The import command to run is the following:

```bash
git log -1000 --pretty=format:"%H*#%an*#%ae*#%at*#%s" | base64
```

### Step 2: Edit

Git History Editor has a nice UI designed to let you edit what you want in each one of your past commits. [Just try it](https://git.io/editor).

### Step 3: Export

When the edition step is finished, Git History Editor provides a script that can be run inside the project in order to
apply the changes.

This script uses the `git filter-branch` command, which is the less painful way to rewrite a git branch history with precision.


## Libraries used

- [Vue.js](https://github.com/vuejs/vue)
- [Materialize](https://github.com/Dogfalo/materialize)
- [jQuery](https://github.com/jquery/jquery)
- [Prism](https://github.com/PrismJS/prism)
- [Jekyll](https://github.com/jekyll/jekyll)
- [Sass](https://github.com/sass/sass)

## TODO list

- [x] Atomic editing mode
- [x] Edit author name / email
- [x] Edit commit time / date
- [ ] Edit commit message
- [ ] Bulk editing mode
