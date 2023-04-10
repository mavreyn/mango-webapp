/*
Putting the js in a separate file
03.09.2023
*/

const MATH_THRESHOLD = 0.5; //0 = false 1 = true

const userText = document.getElementById("user-text");
const mainDisp = document.getElementById("render-display");

var textBlocks = [];

var cursorStart = 0;
var cursorEnd = 0;
var cursorBlock = 0;
var currentChar = "";
var charEntered = "";
var currentSelection = "";

//set text area to pull from local storage
userText.value = localStorage.getItem('userText');

//---------------------------------------------------------------------//

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
    //split text into blocks for decomposition
    textBlocks = userText.value.trim().split(/\n{2,}/gm);

    //render the text, and update the debug box
    useSnippets();
    updateDisplay();
    updateCursorInfo();
    updateDebugBox();

    //set the local storage after render is complete
    localStorage.setItem('userText', userText.value);
}


//updates the main display
function updateDisplay() {
    mainDisp.innerHTML = "";
    
    for (let i = 0; i < textBlocks.length; i++) {
        curr = textBlocks[i];

        //if math: render with KaTeX
        if (isMathBlock(curr)) {
            const mathDiv = document.createElement("div");
            //add \\ to end of lines without \\
            if (useMathNewlines) { curr = curr.replace(/(?<!\\\\)\n/gm, " \\\\\n"); }
            //align sections with =
            if (autoAlignEquals && curr.match(/\=.+\n.*\=/gm)) {
                curr = "\\begin{align*} " + curr + " \\end{align*}";
                curr = curr.replace(/\=/gm, "&=");
            }
            //create column vectors from easy syntax
            if (columnVecSyntax && curr.match(/\[.*\]/gm)) {
                function colVecToMatrix(match) {
                    match = match.replaceAll(" ", "\\\\");                                                      // turn spaces into \\
                    match = match.replaceAll("...", "\\vdots")                                                  // turn ellipses vertical
                    match = match.replace(/\[/gm, "\\begin{bmatrix}").replace(/\]/gm, "\\end{bmatrix}");        //begin and end to column vector
                    return match;
                }
                curr = curr.replaceAll(/\[.*?\]/gm, colVecToMatrix);
            }

            katex.render(curr, mathDiv, {
                displayMode: true,
                throwOnError: false
            });
            mainDisp.innerHTML += mathDiv.innerHTML;
        } else {
            //otherwise: use showdown for MD
            var converter = new showdown.Converter({"noHeaderId": true, "literalMidWordUnderscores": true, "ellipsis": false});
            var html = converter.makeHtml(curr);
            //generate html inside sectionElt
            var tempElt = document.createElement("div");
            tempElt.innerHTML = html;
            var sectionElt = tempElt.firstChild;
            html = sectionElt.innerHTML;

            //split on the dollars signs if they are in pairs (affirmed math)
            var mathSplits = html.split(/\$/gm);
            var inlinesClosed = mathSplits.length % 2 != 0;
            
            //if all $ have matching pair
            if (inlinesClosed) {
                var newHTML = '';
                //for each subgroup, alternating math and non math
                for (let j = 0; j < mathSplits.length; j++) {
                    subCurr = mathSplits[j];

                    if (j % 2 != 0) {
                        //if in a math inline, trim and render
                        const mathSpan = document.createElement("span");
                        katex.render(subCurr.trim(), mathSpan, { throwOnError: false });
                        subCurr = mathSpan.innerHTML;
                    } else {
                        //otherwise, look for math tokens
                        tokens = subCurr.split(" ");
                        subCurr = ""

                        for (let k = 0; k < tokens.length; k++) {
                            currToken = tokens[k];
                            //render tokens that match the following regex
                            if (currToken.match(/[\=\\\+\^\_]|\.\.\./)) {                            //find these special characters in each token
                                const mathSpan = document.createElement("span");
                                katex.render(currToken, mathSpan, { throwOnError: false });
                                tokens[k] = mathSpan.innerHTML;
                            }
                            subCurr += tokens[k] + " ";
                        }
                    }
                    newHTML += subCurr;
                }
                sectionElt.innerHTML = newHTML;
            }
            mainDisp.appendChild(sectionElt);
        }
    }
}


//cursor locations, selection, and section
function updateCursorInfo() {
    cursorStart = userText.selectionStart;
    cursorEnd = userText.selectionEnd;
    currentChar = userText.value[cursorStart - 1];
    cursorBlock = userText.value.substring(0, cursorEnd).split(/\n{2,}/gm).length - 1;
    currentSelection = userText.value.substring(cursorStart, cursorEnd);
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


// REFORMAT JSON TO PROPER
// SPLIT ON CURSOR
// STORE CURSOR POS
// IF MATCH
// REPLACE (STR|REX)
// GET LEN OF REPLACED STR
// APPEND LATTER HALF
// SET CURSOR TO LOC FIRST

// http://jsfiddle.net/5dxLo60y 

function useSnippets() {
    for (let i = 0; i < SNIPPETS.length; i++) {
        let curr = SNIPPETS[i];
        userText.value = userText.value.replace(curr["trigger"], curr["replace"]);
    }
}