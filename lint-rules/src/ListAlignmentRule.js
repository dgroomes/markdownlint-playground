/*
 A custom markdownlint rule for enforcing the alignment of list elements.
 */
let listAlignmentRuleObject = {
    names: ["dgroomes-list-alignment"],
    description: "Enforces the alignment of list elements.",
    information: new URL("https://example.com/rules/any-blockquote"),
    tags: ["test"]
};

// Note: maybe break this out into two rules:
// 1) List element leading indentation
// 2) List element inner content leading indentation
//
// TODO implement the trailing whitespace rule after the list element markdown characters (i.e. '1.' and '*')
function listAlignmentRuleFn(params, onError) {
    let listsOpen = 0 // Track how many lists are open. This implies the level of nesting for list elements.

    for (let token of params.tokens) {
        if (["ordered_list_open", "bullet_list_open"].includes(token.type)) listsOpen++ // A new list has opened
        else if (["ordered_list_close", "bullet_list_close"].includes(token.type)) listsOpen-- // The list has closed
        else if (token.type === "list_item_open") { // A list element appeared
            let nestedLevel = listsOpen - 1; // A top-level list list is not nested, so subtract one.
            let expectedLeadingIndentation = nestedLevel * 3

            let actualLeadingIndentation = 0
            for (let i = 0; i < token.line.length && token.line[i] === ' '; i++) {
                actualLeadingIndentation++
            }

            // Helper function for marking a lint violation
            function violation(detailDesc) {
                onError({
                    lineNumber: token.lineNumber,
                    detail: `${detailDesc}. Expected ${expectedLeadingIndentation} but found ${actualLeadingIndentation}.`,
                    context: token.line
                });
            }

            if (actualLeadingIndentation < expectedLeadingIndentation) violation("Too little leading indentation")
            else if (actualLeadingIndentation > expectedLeadingIndentation) violation("Too much leading indentation")
        }
    }
}

module.exports = {
    ...listAlignmentRuleObject,
    "function": listAlignmentRuleFn
};
