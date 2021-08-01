/*
 A custom markdownlint rule for enforcing the alignment of list elements.
 */
let listAlignmentRuleObject = {
    names: ["dgroomes-list-alignment"],
    description: "Enforces the alignment of list elements.",
    information: new URL("https://example.com/rules/any-blockquote"),
    tags: ["test"]
};

function listAlignmentRuleFn(params, onError) {
    for (let token of params.tokens) {
        // todo find violating elements
        onError({
            lineNumber: token.lineNumber,
            detail: "List element indentation violation. Elements with different indentations will cause misalignment.",
            context: token.line.substr(0, 7)
        });
        break;
    }
}

module.exports = {
    ...listAlignmentRuleObject,
    "function": listAlignmentRuleFn
};
