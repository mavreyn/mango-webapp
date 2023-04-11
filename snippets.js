const SNIPPETS =
[
    //greek letters
    {"trigger": "@l", "replace": "\\lambda"},
    
    //variables with subscripts
    {"trigger": /(?<=\W)([evx])([n\d])/g, "replace": "$1_$2"},

    //vectorand hat notation
    //(must run after subscripting snippet)
    {"trigger": /([a-z0](?:_\d)?)vc/g, "replace": "\\vec{$1}"},
    {"trigger": /([a-z0](?:_\d)?)htt/g, "replace": "\\hat{$1}"},

    //simple operators
    {"trigger": /=\/|\/=|neq/g, "replace": "\\neq"},
    {"trigger": " * ", "replace": " \\cdot "},
    {"trigger": "sr", "replace": "^2"},
    {"trigger": "cb", "replace": "^3"},
    {"trigger": "INV", "replace": "^{-1}"},

    //parenthesis and brackets
    {"trigger": "{{", "replace": " \\left\\{ "},
    {"trigger": "}}", "replace": " \\right\\} "},

    //logic and proof
    {"trigger": "===", "replace": "\\equiv"},
    {"trigger": "inn", "replace": "\\in "},

    //sets
    {"trigger": /R([n\d])/g, "replace": "\\R^$1"},

    //matrix and linear algebra
    {"trigger": "xx", "replace": "\\times"},
    {"trigger": "wperp", "replace": "W^⟂"},

    //other notation
    {"trigger": "...", "replace": "\\dots"},
    {"trigger": /fancy([A-Z])/g, "replace": "\\mathcal{$1}"},
]