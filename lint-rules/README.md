# lint-rules

Custom lint rules for 'markdownlint'.

## Instructions

This package should be built and "packed" with the `npm pack` command so that it can be used by another local project; I
don't have a need to publish this to the npm Registry.

1. "Pack" the library 
   *  `npm pack`
    
## Lint Rules

This package defines a custom lint rule named "dgroomes-list-alignment". It enforces the indentation of list elements so
that the following constraint is always true:

> Ordered list elements and unordered list elements are always aligned in a vertical column

For example, consider the following Markdown snippet between **START** and **END** and look at the snippet in raw form.
Do not look at the HTML rendered version of the Markdown. The point of this is to study the "authored Markdown text" not the
rendered HTML:

**START**

1. This is an *ordered* list element. The leading character in the paragraph element–'T'–is in column 4. In other words,
   the 'T' is the fourth character on the line. The 'h' is the fifth, the 'i' is the sixth, the 's' is the seventh and so
   on.
1. For effect, here is another element.

*  This is an *unordered* list element. Similar to the first ordered element, the leading character in the paragraph–'T'–
   is in column 4. In other words, the two "This" words are vertically aligned with each other. This is nice!
* This paragraph element starts one column earlier and its "This" word is not aligned with the earlier "This" words. This
  is not nice! While this Markdown will render perfectly fine, the raw Markdown is not aligned. The lint rule should find
  an error for this element.

1. Top-level `ol` (ordered list)
   1. Nested `ol` (three leading spaces to clear the parent string `1. `)
   *  Nested `ul` (unordered element) (three leading spaces and two trailing spaces after the `*` to clear the `1.` string
      of `ol` elements at the same level)
    *  Nested list element NOT ALIGNED (there is one space extra in leading indentation)  
   * Nested list element NOT ALIGNED (there needs to be another trailing space after the `*`)
     *  Doubly nested `ul` NOT ALIGNED (there needs to be another leading space before the `*`)

* Top-level `ul` NOT ALIGNED (there needs to be another trailing space after the `*`)
   *  Nested `ul`

**END**

## Reference

*  [Blog Post: *Testing npm packages before publishing*](https://medium.com/@vcarl/problems-with-npm-link-and-an-alternative-4dbdd3e66811)
   *  This blog post makes a good case for the `npm pack` command in favor of `npm link`.
*  [`markdownlint`: *Custom Rules*](https://github.com/DavidAnson/markdownlint/blob/main/doc/CustomRules.md)
