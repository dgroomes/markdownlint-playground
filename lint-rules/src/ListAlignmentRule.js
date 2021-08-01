/*
 A custom markdownlint rule for enforcing the alignment of list elements.
 */
let listAlignmentRuleObject = {
    names: ["dgroomes-list-alignment"],
    description: "Enforces the alignment of list elements.",
    tags: ["test"]
};

// Note: maybe break this rule out into two different rules:
// 1) List element leading indentation
// 2) List element trailing indentation
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
            function leadingIndentationViolation(detailDesc) {
                onError({
                    lineNumber: token.lineNumber,
                    detail: `Too ${detailDesc} leading indentation. Expected ${expectedLeadingIndentation} but found ${actualLeadingIndentation}.`,
                    context: token.line
                });
            }

            if (actualLeadingIndentation < expectedLeadingIndentation) leadingIndentationViolation("little")
            else if (actualLeadingIndentation > expectedLeadingIndentation) leadingIndentationViolation("much")

            // Lint for trailing whitespace after the list element Markdown element
            let markupChar = token.markup // For list element Markdown elements, the "markup" field on the "token" object will be the character '*' (unordered element) or '.' (ordered element (1.))
            let expectedTrailingIndentation = markupChar === '*' ? 2 : 1 // The string '*' takes up one less character than '1.' so the trailing space must be 2 and 1 respectively so that the content aligns vertically.
            let markupCharIdx = token.line.indexOf(markupChar)

            let actualTrailingIndentation = 0
            for (let i = markupCharIdx + 1; i < token.line.length && token.line[i] === ' '; i++) {
                actualTrailingIndentation++
            }

            // Helper function for marking a lint violation
            function trailingIndentationViolation(detailDesc) {
                onError({
                    lineNumber: token.lineNumber,
                    detail: `Too ${detailDesc} trailing indentation for the list element. Expected exactly ${expectedTrailingIndentation} space(s) but found ${actualTrailingIndentation}.`,
                    context: token.line
                });
            }

            if (actualTrailingIndentation < expectedTrailingIndentation) trailingIndentationViolation("little")
            else if (actualTrailingIndentation > expectedTrailingIndentation) trailingIndentationViolation("much")
        }
    }
}

module.exports = {
    ...listAlignmentRuleObject,
    "function": listAlignmentRuleFn
};
