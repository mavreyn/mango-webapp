/*
Putting the js in a separate file
03.09.2023
*/

const macros = {};
const MATH_THRESHOLD = 0.2; //0 = false 1 = true

const options = {
    displayMode: true,
    throwOnError: false
}

const mainDisp = document.getElementById("render-display");
const userText = document.getElementById("user-text");

var textBlocks = [];

var cursorStart = 0;
var cursorEnd = 0;
var cursorBlock = 0;
var currentSelection = "";  

//---------------------------------------------------------------------//

//compare the percent of non-word-ish characters against the threshold
function mathValue(b) {
    var irregularChars = b.match(/[^a-zA-Z#! ]/g);
    //if no match or the string is part of a header
    if (irregularChars == null || b.match(/#/)) {
        return 0;
    } else {
        return irregularChars.length / b.length;
    }
}

function isBlockMath(b) {
    return mathValue(b) >= MATH_THRESHOLD;
}


//MAIN UPDATE
function mainUpdate() {
    splitTextBlocks();
    updateDisplay();
    updateCursorInfo();

    updateDebugBox();
}

//separate blocks from user
function splitTextBlocks() {
    textBlocks = userText.value.split("\n\n");
}

//updates the main display
function updateDisplay() {
    mainDisp.innerText = "";
    
    for (let i = 0; i < textBlocks.length; i++) {
        curr = textBlocks[i];
        const newDiv = document.createElement("div")

        //if math: render with KaTeX. Otherwise: use showdown for MD
        if (isBlockMath(curr)) {
            curr = curr.replace(/\n/gm, " \\\\\n")
            katex.render(curr, newDiv, options);
        } else {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(curr);
            newDiv.innerHTML = html;
        }

        mainDisp.appendChild(newDiv);
    }
}

//cursor locations, selection, and section
function updateCursorInfo() {
    cursorStart = userText.selectionStart;
    cursorEnd = userText.selectionEnd;
    cursorBlock = userText.value.substring(0, cursorEnd).split("\n\n").length - 1;
    currentSelection = userText.value.substring(cursorStart, cursorEnd);
}


//updates the debug box
function updateDebugBox() {
    document.getElementById("debug-cursor-start").innerText = cursorStart;
    document.getElementById("debug-cursor-end").innerText = cursorEnd;
    document.getElementById("debug-cursor-block").innerText = cursorBlock;
    document.getElementById("debug-math-value").innerText = mathValue(textBlocks[cursorBlock]).toFixed(2);
    document.getElementById("debug-is-math").innerText = isBlockMath(textBlocks[cursorBlock]);
    if (currentSelection != null) { document.getElementById("debug-current-selection").innerText = currentSelection; }
}


$("#close-settings-button").click(function() { $("#settings-window").toggle(); });
$("#open-settings-button").click(function() { $("#settings-window").toggle(); });
$("#toggle-debug").click(function() { $("#debug-box").toggle() });
