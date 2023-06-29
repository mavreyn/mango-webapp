const SNIPPETS =
[
    //fractions
    //num & denom continue until space
    {"trigger": /(\S+)\/(\S+)/g, "replace": "\\frac{$1}{$2}"},

    //integrals
    {"trigger": /int (\S+) (\S+) of /g, "replace": "\\int_{$1}^{$2} "},
    {"trigger": /int INF /g, "replace": "\\int_{-\\infty}^{\\infty} "},
    {"trigger": /(?<!\\)int/g, "replace": "\\int "},    //regular if none of the specials

    //greek letters
    {"trigger": "pi", "replace": "\\pi"},

    {"trigger": "@l", "replace": "\\lambda"},

    //simple operators
    {"trigger": "+-", "replace": "\\pm"},
    {"trigger": "sr", "replace": "^2"},
    {"trigger": "cb", "replace": "^3"},
    {"trigger": /rt(\S+)/g, "replace": "\\sqrt{$1}"},
    {"trigger": /(\S+)pow(\S+)/g, "replace": "$1^{$2}"},

    //functions
    {"trigger": /exp(\S+)/g, "replace": "e^{$1}"},

    //complex operators
    {"trigger": "ddx", "replace": "\\frac{d}{dx}"},
]