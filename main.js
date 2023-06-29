/*
Putting the js in a separate file
03.09.2023
*/

const MATH_THRESHOLD = 0.5; //0 = false 1 = true

const userTextElt = document.getElementById("user-text");
const mainDispElt = document.getElementById("render-display");

var textBlocks = [];

var cursorStart = 0;
var cursorEnd = 0;
var cursorBlock = 0;
var currentChar = "";
var charEntered = "";
var currentSelection = "";

//set text area to pull from local storage on load
userTextElt.value = localStorage.getItem('userText');

//------------------------------------------------------------------------------------//

function sigmoid(z) {
    const SENSITIVITY = 0.2;
    return 1 / (1 + Math.exp(-SENSITIVITY * z));
}

//threshold function to determine if a block of text is math or plain
//ranges from 0 being non math to 1 being all math
function mathValue(block) {
    if (block.match(/^#/) || block.length === 1) {
        // skip headers and first characters
        return 0;
    } else {
        //count how many word there are not proceeded with \ or followed with {
        var wordTokens = block.match(/(?<![\w\\{])[a-zA-Z]{2,}(?![\w{}+^])/gm);
        const WORDS_WEIGHT = 1;
        //count how many math characters appear, or single letters (variables)
        var mathChars = block.match(/[\^\+\\{}()=]|(?<![a-zA-Z\n])\w(?![a-zA-Z\n])/gm);
        const MATH_WEIGHT = 0.2;

        if (wordTokens === null) {
            return 1;
        } else if (mathChars === null) {
            return 0;
        } else {
            return sigmoid(-WORDS_WEIGHT * wordTokens.length + MATH_WEIGHT * mathChars.length);
        }
    }
}

function isMathBlock(block) {
    return mathValue(block) > MATH_THRESHOLD;
}


//MAIN UPDATE
function mainUpdate() {
    var inputTxt = userTextElt.value

    //set the text area to local storage
    localStorage.setItem('userText', inputTxt);
    
    //apply snippets on hidden layer
    //then split into blocks for decomposition
    textBlocks = useSnippets(inputTxt).trim().split(/\n{2,}/gm);

    updateDisplay();
    updateCursorInfo();
    updateDebugBox();
}


//updates the main display
function updateDisplay() {
    mainDispElt.innerHTML = "";
    
    for (let i = 0; i < textBlocks.length; i++) {
        let curr = textBlocks[i];

        //if math: render with KaTeX
        if (isMathBlock(curr)) {
            mainDispElt.innerHTML += generateMathBlockHTML(curr);
        } else {
            //go through each token
            tokens = curr.split(" ")
            var newHTML = '';
            for (let k = 0; k < tokens.length; k++) {
                let currToken = tokens[k];
                //Look for math tokens that match the following special characters / format
                //                    `    =\+^_   ...        single variables
                if (currToken.match(/\`|[=\\+^_<>]|\.\.\.|(?<=^| )[b-zB-Z](?=\W|$)/)) {
                    if (currToken.length != 1 || k != tokens.length - 1) {
                        //remove affirmative characters ($) if any
                        currToken = currToken.replace("`", "");
                        //render the token using KaTeX
                        let mathSpan = document.createElement("span");
                        katex.render(currToken, mathSpan, { throwOnError: false, output: "html", minRuleThickness: 0.05});
                        currToken = mathSpan.innerHTML;
                    }
                }
                newHTML += currToken + " ";
            }
            //render the rest using showdown
            let converter = new showdown.Converter({
                "noHeaderId": true,
                "literalMidWordUnderscores": true,
                "ellipsis": false,
                "ghCodeBlocks": false
            });
            mainDispElt.innerHTML += converter.makeHtml(newHTML);
        }
    }
}


//given raw text, will return the HTML to present to the user
//manipulations specific to block math occur here
function generateMathBlockHTML(txt) {
    let mathDiv = document.createElement("div");

    if (useMathNewlines) { txt = txt.replace(/(?<!\\\\)\n/gm, " \\\\\n"); }
    if (autoAlignEquals && txt.match(/\=.+\n.*\=/gm)) {
        txt = "\\begin{align*} " + txt + " \\end{align*}";
        txt = txt.replace(/\=/gm, "&=");
    }
    
    //create column vectors from easy syntax
    if (columnVecSyntax && txt.match(/\[.*\]/gm)) {
        function colVecToMatrix(match) {
            match = match.replaceAll(" ", "\\\\");                                                      // turn spaces into \\
            match = match.replaceAll("\\dots", "\\vdots")                                               // turn ellipses vertical
            match = match.replace(/\[/gm, "\\begin{bmatrix}").replace(/\]/gm, "\\end{bmatrix}");        //begin and end to column vector
            return match;
        }
        txt = txt.replaceAll(/\[.*?\]/gm, colVecToMatrix);
    }
    //render with KaTeX and return the result
    katex.render(txt, mathDiv, {
        displayMode: true,
        throwOnError: false,
        output: "html",
        minRuleThickness: 0.05
    });
    return mathDiv.innerHTML;
}


//cursor locations, selection, and section
function updateCursorInfo() {
    cursorStart = userTextElt.selectionStart;
    cursorEnd = userTextElt.selectionEnd;
    currentChar = userTextElt.value[cursorStart - 1];
    cursorBlock = userTextElt.value.substring(0, cursorEnd).split(/\n{2,}/gm).length - 1;
    currentSelection = userTextElt.value.substring(cursorStart, cursorEnd);
}


//get the last character entered
function getLastChar(event) {
    charEntered = String.fromCharCode(event.which || event.keyCode);
}


//updates the debug box
function updateDebugBox() {
    document.getElementById("debug-cursor-start").innerText = cursorStart;
    document.getElementById("debug-cursor-end").innerText = cursorEnd;
    document.getElementById("debug-current-char").innerText = currentChar;
    document.getElementById("debug-char-entered").innerText = charEntered;
    document.getElementById("debug-cursor-block").innerText = cursorBlock;
    document.getElementById("debug-math-value").innerText = mathValue(textBlocks[cursorBlock]).toFixed(2);
    document.getElementById("debug-is-math").innerText = isMathBlock(textBlocks[cursorBlock]);
    if (currentSelection != null) { document.getElementById("debug-current-selection").innerText = currentSelection; }
}


//make substitutions according to snippets
function useSnippets(txt) {
    let txtSnippets = txt;
    for (let i = 0; i < SNIPPETS.length; i++) {
        let curr = SNIPPETS[i];
        txtSnippets = txtSnippets.replaceAll(curr["trigger"], curr["replace"]);
    }
    return txtSnippets;
}