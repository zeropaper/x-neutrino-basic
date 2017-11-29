- go to https://github.com/zeropaper/x-neutrino-basic/tree/exercise-carousel (the exercise-carousel branch)
- Click the "Clone or download" (green button) and then "Download ZIP"
- In your (local) repository, create a new branch `git checkout -b ajax`
- Remove the `src` directory of your repository and put the one from the `.zip` file instead
- Change the `import navbar from './templates/navbar.html';`
  to `import navbarTemplate from './templates/navbar.html';`
  That way, it is clearer what the variable is.
  Don't forget to change the name of the variable at the end of the file (where it is `append()`).
- Do the same renaming for the `carousel` import.
- Remove the "Products" (grid) part (and again... don't forget to remove it from the end of the file where it is `append()`).
