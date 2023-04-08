# Changelog

### 1.2.0 April 7, 2023

- The `isMathBlock()` function will search for plain words as well as math characters in a block, and pass the weighted sum through a sigmoid function to gauge an overall rating for the block
- Basic autodetection and rendering of math tokens in a text block containing either `=` or `\`

### 1.1.1 April 5, 2023

- The `isMathBlock()` function find a word not following `\` and not trailing `{` to determine if the block is math

### 1.1.0 April 3, 2023

- Settings window contains editor and display subsections
- Block splitting will identify multiple newlines as a single delimiter and ignore leading and trailing newlines
- Expressions typed between $$ will render as inline math
- Saves textarea to client's local storage
- Removed div wrappers around each child in main display element

## 1.0 April 1, 2023

- Text not identified as math renders as Markdown
- Automatically detects blocks of text containing mathematical expressions. No delimiters required
- Scroll sync between user input and render output containers
- Debug box will show cursor position, math value of current block, and other information

