/*
Putting the js in a separate file
03.09.2023
*/



const macros = {};

const options = {
    displayMode: true,
    throwOnError: false
}

var userText = document.getElementById("user-text");
const mainDisp = document.getElementById("main-display");

function mainUpdate() {
    updateCursorLoc();
    updateDisplay();
    updateKaTeX();
}

//updates the main display using showdown
function updateDisplay() {
    var converter = new showdown.Converter();
    var text = document.getElementById("user-text").value;
    var html = converter.makeHtml(text);
    document.getElementById("main-display").innerHTML = html;
}

//updates the cursor location on a textarea change or click within
function updateCursorLoc() {
    var cursorPos = document.getElementById("user-text").selectionStart;
    document.getElementById("cursor-loc").innerText = cursorPos;
}

//updates KaTeX still in beta phase
function updateKaTeX() {
    var rawUserInput = document.getElementById("user-text").value;
    var togo = document.getElementById("KaTeX Here");
    
    //render the KaTeX with options above
    katex.render(rawUserInput, togo, options);
}