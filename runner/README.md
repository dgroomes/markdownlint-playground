# runner

---
**OBSOLETE**

This `runner/` module is obsolete since [`markdownlint-cli2` added support for a configurable path to a configuration file](https://github.com/DavidAnson/markdownlint-cli2/issues/8).
See my [detailed comment on the GitHub issue](https://github.com/DavidAnson/markdownlint-cli2/issues/8#issuecomment-890687861).
The feature was merged in January 2021.

I'll keep the `runner/` module around for posterity and because I want a reference for myself about how to make a Node-based
CLI in this particular style: a shell-based runner script and a dependency to an NPM `pack`ed module.

---

A "runner" program to run markdownlint with custom lint rules against a markdown file.

## Instructions

1. Install the `lint-rules` package
   *  `npm run install-lint-rules`
1. Lint a markdown file!
   *  `node . ../lint-rules/README.md`
1. Install the runner globally
   *  `npm install -g`
   *  The above command added a symlink of the name `md-lint` in the `bin/` directory of your Node installation. The symlink
      links to the main script file: `src/index.js`. Study the `package.json` file to learn more.
   *  Note: for some reason when I change the content of the `bin` field in `package.json`, it doesn't get applied on
      subsequent executions of `npm install -g` after the first. I've found that you have to do an `npm uninstall -g` first.
      So, use this combination of commands in your "develop-build-install" loop:
      
      ```shell
      npm uninstall -g && npm install -g
      ```
   
1. Lint a markdown file using the global script!
   *  `md-lint ../lint-rules/README.md`
   
## `package.json` comments

Unfortunately, the `package.json` file can't have any developer comments in it because JSON does not allow comments. Instead,
the commentary is written here.

The `bin` field defines an executable file–`runner.sh`–, which can be installed globally and executed via the command `md-lint <file>`.
Usually, I think executable files defined in this way are JavaScript files, but I've used a Bash shell script instead. I'm
not sure what is idiomatic for NPM projects, but in general I find it useful to have a shell-based entrypoint file into
tools and programs, regardless of the programming language that powers the tool. In this case, it's useful because I can
pipe the output of the `runner` command to the `less` command-line tool.

I'm not sure if I'll stick with piping the output to `less`, but I'm trying something.

## Wish list

General clean ups, TODOs and things I wish to implement for this project:

*  DONE Install `runner` as a bin on the PATH.
   *  How? There should be a way with npm and the package.json to do this.
*  IN PROGRESS Print the lint violations in an easy-to-read format
   * Consider color, lowlighting, highlighting, indentation

## Reference

*  [npm Docs: *npm bin*](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)
