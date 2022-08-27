"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var emmet_1 = require("emmet");
var node_1 = require("vscode-languageserver/node");
var syntaxes = {
    markup: ["html", "xml", "xsl", "jsx", "js", "pug", "slim", "haml", "hbs",
        "handlebars", "php", "vue"],
    stylesheet: ["css", "sass", "scss", "less", "sss", "stylus"]
};
function parseLanguage(language) {
    if (language == "javascriptreact" || language == "typescriptreact")
        language = "jsx";
    if (language === "javascript")
        language = "js";
    return language;
}
function isMarkupEmmet(language) {
    var markupSyntaxes = syntaxes.markup;
    language = parseLanguage(language);
    if (markupSyntaxes.some(function (filetype) { return language == filetype; })) {
        return true;
    }
    return false;
}
function getSyntax(language) {
    var availableSyntaxes = __spreadArray(__spreadArray([], syntaxes.markup, true), syntaxes.stylesheet, true);
    language = parseLanguage(language);
    if (availableSyntaxes.some(function (syntax) { return syntax == language; })) {
        return language;
    }
    return undefined;
}
function getExtracted(language, line, character) {
    var extracted;
    if (isMarkupEmmet(language)) {
        extracted = (0, emmet_1.extract)(line, character);
    }
    else {
        extracted = (0, emmet_1.extract)(line, character, { type: "stylesheet" });
    }
    if ((extracted === null || extracted === void 0 ? void 0 : extracted.abbreviation) == undefined) {
        throw "failed to parse line";
    }
    return {
        left: extracted.start,
        right: extracted.end,
        abbreviation: extracted.abbreviation,
        location: extracted.location
    };
}
function getExpanded(language, abbreviation) {
    var expanded;
    var options = {
        "output.field": function (index, placeholder) {
            return "${" + index + (placeholder && ":" + placeholder) + "}";
        }
    };
    var syntax = getSyntax(language);
    if (isMarkupEmmet(language)) {
        expanded = (0, emmet_1["default"])(abbreviation, { options: options, syntax: syntax });
    }
    else {
        expanded = (0, emmet_1["default"])(abbreviation, { type: "stylesheet", options: options, syntax: syntax });
    }
    return expanded;
}
function complete(textDocsPosition, documents) {
    var docs = documents.get(textDocsPosition.textDocument.uri);
    if (!docs)
        throw "failed to find document";
    var languageId = docs.languageId;
    var content = docs.getText();
    var linenr = textDocsPosition.position.line;
    var line = String(content.split(/\r?\n/g)[linenr]);
    var character = textDocsPosition.position.character;
    var _a = getExtracted(languageId, line, character), left = _a.left, right = _a.right, abbreviation = _a.abbreviation;
    var textResult = getExpanded(languageId, abbreviation);
    var range = {
        start: {
            line: linenr,
            character: left
        },
        end: {
            line: linenr,
            character: right
        }
    };
    return [
        {
            insertTextFormat: node_1.InsertTextFormat.Snippet,
            label: abbreviation,
            detail: abbreviation,
            documentation: textResult,
            textEdit: {
                range: range,
                newText: textResult
            },
            kind: node_1.CompletionItemKind.Snippet,
            data: {
                range: range,
                textResult: textResult
            }
        },
    ];
}
exports["default"] = complete;
