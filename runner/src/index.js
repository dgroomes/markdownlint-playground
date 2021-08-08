#!/usr/bin/env node

const markdownlint = require("markdownlint");
const printResult = require("./lint-output")

if (process.argv.length !== 3) {
    throw new Error("Usage: node . <file>")
}

let file = process.argv[2]

// I wish the IDE knew that this was markdownlint's "Options" type so that it would offer code completion! There doesn't
// seem a way in Webstorm/Intellij to annotate a local variable declaration with something like an inline comment to show
// its type. The beckon of TypeScript is strong!
const options = {
    files: [file],
    customRules: [require("lint-rules/src/ListAlignmentRule")],
    config: { // Configuration docs: https://github.com/DavidAnson/markdownlint#optionsconfig

        comment: "Using a combination of out-of-the-box and custom lint rules that match my preferred style",
        default: false, // Disable all rules, Instead, the rules be enabled explicitly. See below.

        // Rules docs: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md
        "dgroomes-list-alignment": true, // My custom rule
        MD001: true, // "Heading levels should only increment by one level at a time"
        MD041: true, // "First line in a file should be a top-level heading"
        MD004: { // "Unordered list style"
            style: "asterisk" // I like to use asterisks for unordered lists
        },
        MD005: true, // "Inconsistent indentation for list items at the same level"
        MD007: { // "Unordered list indentation"
            indent: 2, // I prefer only two spaces of indentation in Markdown documents
            start_indented: false // "Starting-level" lists–or, first-level lists–should not be indented. An indent there is not a good use of space in my opinion.
        },
        MD009: true, // "Trailing spaces"
        MD010: true, // "Hard tabs"
        MD011: true, // "Reversed link syntax"
        MD012: true, // "Multiple consecutive blank lines"
        MD013: false, // "Line length". I'm not sure I want to enforce line length. There are so many exceptions. It's nice to stick to a line-length of course but a strict enforcement is tough.
        MD018: true, // "No space after hash on atx style heading"
        MD019: true, // "Multiple spaces after hash on atx style heading"
        MD022: true, // "Headings should be surrounded by blank lines"
        MD023: true, // "Headings must start at the beginning of the line"
        MD025: true, // "Multiple top-level headings in the same document"
        MD027: true, // "Multiple spaces after blockquote symbol"
        MD028: true, // "Blank line inside blockquote"
        MD029: true, // "Ordered list item prefix"
        MD030: { // "Spaces after list markers"
            ul_single: 2,
            ol_single: 1,
            ul_multi: 2,
            ol_multi: 1
        },
        MD034: true, // "Bare URL used"
        MD035: { // "Horizontal rule style"
            style: "---" // I prefer to use dashes "-" for horizontal rules
        },
        MD037: true, // "Spaces inside emphasis markers"
        MD038: true, // "Spaces inside code span elements"
        MD039: true, // "Spaces inside link text"
        MD042: true, // "No empty links"
        MD045: true, // "Images should have alternate text (alt text)"
        MD046: { // "Code block style"
            style: "fenced" // I prefer the fenced code block style and not the indented style.
        },
        MD047: true, // "Files should end with a single newline character"
        MD048: { // "Code fence style"
            style: "backtick" // I prefer the backtick character for code fences instead of the tilde
        }
    }
};

let lintResults = markdownlint.sync(options);
printResult(lintResults)
for (let [, value] of Object.entries(lintResults)) {
    if (value.length > 0) {
        console.error("❌  Markdown lint violations detected!")
        process.exit(1) // There was a lint violation! Exit with an error status code
    }
}

console.log("✅  All good. No lint violations.")
