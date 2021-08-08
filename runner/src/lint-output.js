const flatten = require('lodash.flatten');

/**
 * Print the lint results to the console in an easy-to-read format. The person reading this output cares about the line
 * of the lint violation, a portion of the violating markdown snippet, the violated rule, and a link to the rule's explanation
 * so they can understand why it matters.
 *
 * NOTE: This function was copied from https://github.com/igorshubovych/markdownlint-cli (MIT LICENSED) and stripped down
 * and edited.
 *
 * @param lintResult the lint result from markdownlint
 */
function printResult(lintResult) {

    const results = flatten(Object.keys(lintResult).map(file => {
        return lintResult[file].map(result => {
            return {
                file: file,
                lineNumber: result.lineNumber,
                column: (result.errorRange && result.errorRange[0]) || 0,
                names: result.ruleNames.join('/'),
                description: result.ruleDescription +
                    (result.errorDetail ? ' [' + result.errorDetail + ']' : '') +
                    (result.errorContext ? ' [Context: "' + result.errorContext + '"]' : '')
            };
        });
    }));

    let lintResultString = '';
    if (results.length > 0) {

        results.sort((a, b) => {
            return a.file.localeCompare(b.file) || a.lineNumber - b.lineNumber ||
                a.names.localeCompare(b.names) || a.description.localeCompare(b.description);
        });

        lintResultString = results.map(result => {
            const {file, lineNumber, column, names, description} = result;
            const columnText = column ? `:${column}` : '';
            return `${file}:${lineNumber}${columnText} ${names} ${description}`;
        }).join('\n');
        // Note: process.exit(1) will end abruptly, interrupting asynchronous IO
        // streams (e.g., when the output is being piped). Just set the exit code
        // and let the program terminate normally.
        // @see {@link https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_exit_code}
        // @see {@link https://github.com/igorshubovych/markdownlint-cli/pull/29#issuecomment-343535291}
        process.exitCode = 1;
    }


    console.error(lintResultString);
}

module.exports = printResult
