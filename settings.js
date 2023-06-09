//get window variables
const settingsWindow = $("#settings-window");
const saturationReducer = $("#saturation-reducer");
const debugBox = $("#debug-box");

//set defaults
settingsWindow.hide();
saturationReducer.hide();
debugBox.show()

var useMathNewlines = true;
var autoAlignEquals = true;
var autoDetectMath = true;
var columnVecSyntax = true;

//toggle settings window
$("#close-settings-button").click(function() {
    settingsWindow.hide();
    saturationReducer.hide();
});
$("#open-settings-button").click(function() { 
    settingsWindow.show();
    saturationReducer.show();
});

//add event listener for esc key
$(document).keydown(function(event) {
    if (event.key === "Escape") {
        settingsWindow.hide();
        saturationReducer.hide();
    }
});

//Change which settings sections is visible
$(".settings-nav-button").click(function() {
    // Get the ID of the div element to show
    const divId = $(this).data("divid");
    // Show the corresponding div element and hide the others
    $(".settings-section").hide();
    $("#" + divId).show();
});

//change settings
$("#cb-toggle-debug").click(function() { $("#debug-box").toggle() });
$("#cb-use-math-newlines").click(function() { useMathNewlines = $("#cb-use-math-newlines").is(":checked"); updateDisplay(); });
$("#cb-auto-align-equals").click(function() { autoAlignEquals = $("#cb-auto-align-equals").is(":checked"); updateDisplay(); });
$("#cb-use-col-vec-syntax").click(function() { columnVecSyntax = $("#cb-use-col-vec-syntax").is(":checked"); updateDisplay(); });