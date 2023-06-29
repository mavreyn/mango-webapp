# Mango

Mango (Mathematical Notation Generator Online) is a project I designed near the end of my sophomore year of college as a response to the lack of a designated split screen markdow/latex editor for taking math notes. The user enters plain text in the main input at the left side of the screen, and the text is automatically rendered using either the [Showdown](https://github.com/showdownjs/showdown) library or the [KaTeX](https://katex.org/) web render engine.

## Features

This is Mango's first release. Usability is extremely limited at this stage.

- Automatically detects blocks of text containing mathematical expressions. No delimiters required
- Scroll sync between user input and render output containters

## Future Updates

This is a highly active project for me, and will continue to see meaningful and useful updates to make the project valuable for notetaking and use in the classroom. I may rebuild using React.js in the near future before it gets too complicated

- Will auto align equal signs in math blocks containing more than one line where each line contains the character '='
- Major improvement to the robustness of the `isBlockMath()` function to reduce false positives and false negatives
- Inline KaTeX rendering with possible autodetection (implememtation and/or delimiters unknown)
- Snippets including regex triggers, replacements, and tab stops for shortcuts and hotkeys
- Shortcuts for quickly moving lines up or down (and removing lines) in the editor
- Auto fraction ability and auto-enlargement of surrounding parentheses or brackets
- Exporting notes
- Ability for user to save settings locally
- Feedback area for quick recommendations
- Color and theme customizability
- Many other user-experience improvements

## Use

At the moment, the current version of Mango can be accessed by navigating to this repository's latest environment.

## Why I Created Mango

I have given other sites and programs (such as Stackedit and Obsidian) a try. However, there were certain behavior that I wanted in an editor that they did not have. In addition, I believed I was ready and up for the challenge, since the front-end would be rather simple and I knew there would be plenty of regex involved, which I was quite fluent in at the time.

More importantly, I wanted a piece of software that would allow me to type math real time. As fast as humanly possible while using as little keystrokes as possible and rendering with nice formatting.

## Contributions

If you would like to contribute to the project, I happily welcome PRs. I am creating this in my free time with minimal prior experience in web-app development so I am very appreciative of any help.
