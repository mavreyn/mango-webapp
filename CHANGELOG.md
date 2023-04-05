# Changelog

### 1.0.2 April 5, 2023

- The `isMathBlock()` function will search for at least one word without leading \ or trailing { in the block. If successful, the block is categorized as text

### 1.0.1 April 3, 2023

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