# runner

A 'runner' program to run markdownlint with custom lint rules against my project.

## Instructions

1. Install the `lint-rules` package
   *  `npm run install-lint-rules`
1. Lint a markdown file!
   *  `node . ../lint-rules/README.md`
1. Install the runner globally
   *  `npm install -g`
   *  The above command added a symlink of the name `md-lint` somewhere on the PATH. The symlink links to the main script
      file: `src/index.js`. Study the `package.json` file to learn more.
1. Lint a markdown file using the global script!
   *  `md-lint ../lint-rules/README.md`

## Wish list

General clean ups, TODOs and things I wish to implement for this project:

*  DONE Install `runner` as a bin on the PATH.
   *  How? There should be a way with npm and the package.json to do this.

## Reference

*  [npm Docs: *npm bin*](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)
