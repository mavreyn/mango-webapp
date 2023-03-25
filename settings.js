var useMathNewlines = true;

$("#close-settings-button").click(function() { $("#settings-window").toggle() });
$("#open-settings-button").click(function() { $("#settings-window").toggle() });

$("#cb-toggle-debug").click(function() { $("#debug-box").toggle() });
$("#cb-use-math-newlines").click(function() { useMathNewlines = $("#cb-use-math-newlines").is(":checked"); updateDisplay(); });