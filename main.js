/*
    Putting the js in a separate file
    03.09.2023
*/

function updateCursorLoc() {
    var cursorPos = document.getElementById("user-text").selectionStart;
    document.getElementById("cursor-loc").innerHTML = cursorPos;
}

//split on newlines
function updateDisp() {
    var rawUserInput = document.getElementById("user-text").value;
    var lines = rawUserInput.split("\n");
    lines = lines.join("<br>");

    document.getElementById("display-text").innerHTML = lines;
}