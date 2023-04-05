/*
Putting the js in a separate file
03.09.2023
*/

const MATH_THRESHOLD = 0.8; //0 = false 1 = true

//remember to escape out \ with \\
const SNIPPETS = {
    "asdf": "ghjk",
    "yo": "big dawg",
    "@l": "\\lambda",
    "IN": "\\in",
    "Rn": "\\R^n",
    "===": "\\equiv "
}

const userText = document.getElementById("user-text");
const mainDisp = document.getElementById("render-display");

var textBlocks = [];

var cursorStart = 0;
var cursorEnd = 0;
var cursorBlock = 0;
var currentSelection = "";

//set text area to pull from local storage
userText.value = localStorage.getItem('userText');

//---------------------------------------------------------------------//

function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

//threshold function to determine if a block of text is math or plain
//AT THE MOMENT, ONE REGULAR WORD WILL DECLARE NON MATH
function mathValue(block) {
    if (block.match(/^#/) || block.length === 1) {
        // skip headers and first characters
        return 0;
    } else {
        //count how many word there are not proceeded with \ or followed with {
        var matches = block.match(/(?<![\w\\])[a-zA-Z]{2,}(?![\w{])/gm);
        if (matches === null) {
            return 1
        } else {
            return sigmoid(-matches.length);
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
            if (useMathNewlines) { curr = curr.replace(/\n/gm, " \\\\\n"); }

            katex.render(curr, mathDiv, {
                displayMode: true,
                throwOnError: false
            });
            mainDisp.innerHTML += mathDiv.innerHTML;

        } else {
            //otherwise: use showdown for MD
            var converter = new showdown.Converter();
            var html = converter.makeHtml(curr);
            
            //replace anything between dollar signs with inline KaTeX
            html = html.replace(/\$(.*?)\$/gm, "<span>$1</span>");
            
            //innerHTML ensures elements are created inside
            //now just the word <span>
            const newDiv = document.createElement("p");
            newDiv.innerHTML = html;
            const contentElt = newDiv.children[0];

            //loop through subsections
            for (let j = 0; j < contentElt.children.length; j++) {
                var subCurr = contentElt.children[j];
                //render with KaTeX if in a span element
                if (subCurr.tagName === "SPAN") {
                    katex.render(subCurr.innerText.trim(), subCurr, { throwOnError: false });
                    subCurr.outerHTML = subCurr.innerHTML;
                }
            }
            mainDisp.appendChild(contentElt);
        }

    }
}


//cursor locations, selection, and section
function updateCursorInfo() {
    cursorStart = userText.selectionStart;
    cursorEnd = userText.selectionEnd;
    cursorBlock = userText.value.substring(0, cursorEnd).split(/\n{2,}/gm).length - 1;
    currentSelection = userText.value.substring(cursorStart, cursorEnd);
}


//updates the debug box
function updateDebugBox() {
    document.getElementById("debug-cursor-start").innerText = cursorStart;
    document.getElementById("debug-cursor-end").innerText = cursorEnd;
    document.getElementById("debug-cursor-block").innerText = cursorBlock;
    document.getElementById("debug-math-value").innerText = mathValue(textBlocks[cursorBlock]).toFixed(2);
    document.getElementById("debug-is-math").innerText = isMathBlock(textBlocks[cursorBlock]);
    if (currentSelection != null) { document.getElementById("debug-current-selection").innerText = currentSelection; }
}


//replaces some groups of characters
//IF CURSOR IS AT THAT POSITION AND LAST CHARACTER TYPED WAS THAT ONE
function useSnippets() {
    for (let key in SNIPPETS) {
        if (userText.value.substring(userText.value.length - key.length) == key) {
            userText.value = userText.value.replace(key, SNIPPETS[key]);
        }
    }   
}

// http://jsfiddle.net/o5ay42kr/

// var x = /tes(t)/gi;
// 
// var y = "I am Testing a thing for my test here";
// 
// var matches = y.match(x);
// 
// if (matches) {
//     alert(matches[0].length)
// }
// 
// var keys = [];
// $('#target').keypress(function(e) {
//     keys.unshift(e.which);
//     update();
// });
// 
// function update() {
//        $('#last')
//            .prepend($('<li/>').text(String.fromCharCode(keys[0])))
//            .children(':eq(5)').remove();
// }