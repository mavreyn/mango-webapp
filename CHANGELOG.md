# Changelog

#### 1.3.1 April 10, 2023

- Any token containing `$` will be rendered as a math expression if it is not autodetected as math

### 1.3.0 April 9, 2023

- Snippets implementation! Snippets found in the `snippets.js` file. Triggers and replacements may be strings or regular expressions, capture groups may be defined and used in replacement expressions

### 1.2.0 April 8, 2023

- Basic autodetection and rendering of math tokens in a text block containing either `=`, `\`, `+`, or `^`
- Support for column vector notation! Use `[]` with tokens inside separated by spaces for KaTeX to render as a column vector. `...` will render as vertical ellipses. Example: `[1 4 2.0 \vec{x} ... W]`
- The `isMathBlock()` function will now search for plain words as well as math characters in a block, and pass the weighted sum through a sigmoid function to gauge an overall rating for the block
- Math blocks that contain `=` in separate lines will be wrapped in an `{align*}` command to horizontally align equal signs
- Debug box shows character at the cursor and the last character typed

### 1.1.0 April 3, 2023

- Settings window contains editor and display subsections
- Block splitting will now identify multiple newlines as a single delimiter and ignore leading and trailing newlines
- Expressions typed between `$$` will render as inline math
- Saves textarea to client's local storage
- Removed div wrappers around each child in main display element

## 1.0 April 1, 2023

- Text not identified as math renders as Markdown
- Automatically detects blocks of text containing mathematical expressions. No delimiters required
- Scroll sync between user input and render output containers
- Debug box will show cursor position, math value of current block, and other information

