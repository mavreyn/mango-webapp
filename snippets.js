const SNIPPETS =
[
    //greek letters
    {"trigger": "@l", "replace": "\\lambda"},
    
    //vector and hat notation
    {"trigger": /([\w_]+)vc/, "replace": "\\vec{$1}"},
    {"trigger": /([\w_]+)ht/, "replace": "\\hat{$1}"},

    //variables with subscripts
    {"trigger": /(^| )([a-z])(\d)/, "replace": "$1$2_$3"},

    //simple operators
    {"trigger": " * ", "replace": " \\cdot "},
    {"trigger": "sr", "replace": "^2"},
    {"trigger": "cb", "replace": "^3"},
    {"trigger": "INV", "replace": "^{-1}"},

    //logic and proof
    {"trigger": /R([n\d])/, "replace": "\\R^$1"},
    {"trigger": "inn", "replace": "\\in "},
    {"trigger": "===", "replace": "\\equiv"},

    //matrix and linear algebra
    {"trigger": "xx", "replace": "\\times"},
    {"trigger": "wperp", "replace": "W^⟂"},

    //other
]