/*
Putting the js in a separate file
03.09.2023
*/

const macros = {};

const options = {
    displayMode: true,
    throwOnError: false
}

const mainDisp = document.getElementById("main-display");
const userText = document.getElementById("user-text");

//---------------------------------------------------------------------//

function isEven(x) {
    return x % 2 == 0;
}

function mainUpdate() {
    updateCursorLocations();
    updateDisplay();
}


//updates the main display using either showdown or KaTeX
function updateDisplay() {
    mainDisp.innerHTML = '';
    
    //split on $$ to find block KaTeX
    var rawUserText = userText.value;
    var textSections = rawUserText.split("$$");
    
    //render each section depending on the content it contains
    for (let i = 0; i < textSections.length; i++) {
        const newDiv = document.createElement("div");
        
        if (isEven(i) || i == textSections.length - 1) {
            //render with Showdown
            var converter = new showdown.Converter();
            var html = converter.makeHtml(textSections[i]);
            newDiv.innerHTML = html;
        } else {
            //render with KaTeX
            katex.render(textSections[i], newDiv, options);
        }

        mainDisp.appendChild(newDiv);
    }

}

//updates the cursor location on a textarea change or click within
function updateCursorLocations() {
    document.getElementById("cursor-start").innerText = userText.selectionStart;
    document.getElementById("cursor-end").innerText = userText.selectionEnd;
}

