const settingsWindow = $("#settings-window");
settingsWindow.hide();
const saturationReducer = $("#saturation-reducer");
saturationReducer.hide();

var useMathNewlines = true;

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

//Change which window is visible
$(document).ready(function() {
    // Add click event listener to buttons
    $(".settings-nav-button").click(function() {
      // Get the ID of the div element to show
      const divId = $(this).data("divid");
      // Show the corresponding div element and hide the others
      $(".settings-section").hide();
      $("#" + divId).show();
    });
  });

//change settings
$("#cb-toggle-debug").click(function() { $("#debug-box").toggle() });
$("#cb-use-math-newlines").click(function() { useMathNewlines = $("#cb-use-math-newlines").is(":checked"); updateDisplay(); });