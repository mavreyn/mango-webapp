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

const mainDisp = document.getElementById("main-display");
const userText = document.getElementById("user-text");

//---------------------------------------------------------------------//

//compare the percent of non-word-ish characters against the threshold
function isSectionMath(s) {
    var nonMathChars = s.match(/[^a-zA-Z# ]/g);
    if (nonMathChars == null || s.match(/#/)) {
        return false;
    } else {
        return nonMathChars.length / s.length > MATH_THRESHOLD;
    }
}

//updates the main display
function updateDisplay() {
    mainDisp.innerHTML = "";
    var rawtxt = userText.value;
    
    sections = rawtxt.split("\n\n");
    
    for (let i = 0; i < sections.length; i++) {
        const newDiv = document.createElement("div")
        curr = sections[i];

        if (isSectionMath(curr)) {
            katex.render(curr, newDiv, options);
        } else {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(curr);
            newDiv.innerHTML = html;
        }

        mainDisp.appendChild(newDiv);
    }
}

//updates the cursor locations on a textarea change or click within
function updateCursorLocations() {
    document.getElementById("cursor-start").innerText = userText.selectionStart;
    document.getElementById("cursor-end").innerText = userText.selectionEnd;
}
