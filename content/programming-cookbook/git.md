---
title: Git Cookbook
showMetadata: true
editable: true
showToc: true
order: 2
---

# To untrack all files that already added to a repository and then add to .gitignore later.
- Commit any code changes, and then run this command:
```
git rm -r --cached .
```
*This removes any changed files from the index(staging area).*
- Explain `rm` command
    - rm is the remove command
    - -r will allow recursive removal
    - –cached will only remove files from the index. Your files will still be there.
    - The . indicates that all files will be untracked. You can untrack a specific file with git rm --cached foo.txt.
    - The rm command can be unforgiving. If you wish to try what it does beforehand, add the -n or --dry-run flag to test things out.

- Then run:
```
git add .
```
*This add all changes files to a staging area.*

- Verify what you have changed.
```
git log
```
*This will show all file all ignored file are mark as deleted*

- Create a new commit:
```
git commit -m ".gitignore is now working"
```
credit https://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/

---

# Inti
```
git init
```

# Working with Remote
```
git config global
```
```
git remote add main url //need remote brance and url
```
```
git remote remove origin //don't need url
```

# Working with a branch

## Set an existing branch to track a remote branch
```
git branch -u upstream/foo
```

## Untrack a remote branch
```
git branch --unset-upstream
```

## Create a branch based on the current branch
```
git checkout -b "new-branch-name"
```

## Create a branch based on the hash value or relative to the latest commit of the current branch
```
git checkout -b "new-branch-name" <sha1-of-commit or HEAD~3>
```

# Reset/Reverse
## How to reset or revert a file to a specific revision?
```
git checkout c5f567 -- file1/to/restore file2/to/restore

```
## Hard reset of a single file
```
git checkout -- file-name-that-you-deleted
```
**--** basically means: treat every argument after this point as a file name.
More details in [this answer](https://stackoverflow.com/a/6561160/1872200).
