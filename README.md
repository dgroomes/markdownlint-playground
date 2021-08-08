# markdownlint-playground

📚 Learning and exploring [`markdownlint`](https://github.com/DavidAnson/markdownlint>).

## Why?

In my many "playground" repositories I follow a specific style in the README markdown files. I want to create some custom
linter rules to make it easier to spot inconsistencies in my markdown files. For example, I don't have a consistent indentation
in my lists. Even the act of deciding "how many leading spaces should there be before the `*` character?" is a waste of
time. I don't want to have to decide arbitrary things over and over. So if I make a custom linter rule, then this decision
will be decided once and for all. I'll lint the file and do what the linter tells me to do.  

## Design

This repo breaks down into sub-projects:

### `lint-rules/`

Custom lint rules for 'markdownlint'.

See the README in [lint-rules/](lint-rules/).

### `runner/`

A 'runner' program to run markdownlint with custom lint rules against my project.

See the README in [runner/](runner/).
