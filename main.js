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
    mainDisp.innerHTML = "";
    
    //split on double $$ to split on only block math
    var rawUserText = userText.value;
    var textSections = rawUserText.split(/(\$\$.+?\$\$)/gms);
    
    for (let i = 0; i < textSections.length; i++) {
        const newDiv = document.createElement("div");
        currSection = textSections[i];
        
        if (currSection.match(/(\$\$.+?\$\$)/gms)) {
            //render block math with KaTeX
            currSection = currSection.replace(/^[\$\n ]+/, "").replace(/[\$\n ]+$/, "");
            katex.render(currSection, newDiv, options);
        } else {
            //render with Showdown
            var converter = new showdown.Converter();
            var html = converter.makeHtml(currSection);
            newDiv.innerHTML = html;
        }
        
        mainDisp.appendChild(newDiv);
    }

}

//updates the cursor location on a textarea change or click within
function updateCursorLocations() {
    document.getElementById("cursor-start").innerText = userText.selectionStart;
    document.getElementById("cursor-end").innerText = userText.selectionEnd;
}

