cp index.html dist/index.html;

# go to the out directory and create a *new* Git repo
cd dist;
git init;

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI";
git config user.email "gbuckle@purdue.edu";

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy".
git add -A;
git commit -m "Deploy";

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "ssh://root@${DO_GIT_WEB}" master;
