const markdownlint = require("markdownlint");

if (process.argv.length !== 3) {
    throw new Error("Usage: node . <file>")
}

let file = process.argv[2]

const options = {
    "files": [file]
};

let lintResults = markdownlint.sync(options);
console.log({lintResults})
