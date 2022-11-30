<<<<<<< HEAD
# START WITH THE MAIN BRANCH
All feature brnaches are created off the latest code state of a project.
git checkout main
git fetch origin
git reset --hard origin/main
This switches the repo to the main branch, pulls the latest commits and resets the repo's local copy of main to match the latest version
=======
# Update, add, commit, and push changes

On this branch, edit, stage, and commit changes in the usual fashion, building up the feature with as many commits as necessary. Work on the feature and make commits like you would any time you use Git. When ready, push your commits, updating the feature branch on Bitbucket.

git status
git add <some-file>
git commit

# silver-chainsaw


# Create a new-branch
Use a separate branch for each feature or issue you work on. After creating a branch, check it out locally so that any changes you make will be on that branch.

git checkout -b new-feature
This checks out a branch called new-feature based on main, and the -b flag tells Git to create the branch if it doesn’t already exist.
>>>>>>> main
