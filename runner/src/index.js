const markdownlint = require("markdownlint");

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
    config: {  // Configuration docs: https://github.com/DavidAnson/markdownlint#optionsconfig
        comment: "Using our custom lint rules",
        default: false,
        "dgroomes-list-alignment": true
    }
};

let lintResults = markdownlint.sync(options);
console.log(`Lint results: ${JSON.stringify(lintResults, null, 2)}`)
for (let key of Object.getOwnPropertyNames(lintResults)) {
    let value = lintResults[key]
    if (value.length > 0) {
        console.error("❌ Markdown lint violations detected!")
        process.exit(1) // There was a lint violation! Exit with an error status code
    }
}
