#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var completion_1 = require("./completion");
var vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
var node_1 = require("vscode-languageserver/node");
var connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
var documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
var triggerCharacters = [
    ">",
    ")",
    "]",
    "}",
    "@",
    "*",
    "$",
    "+",
    // alpha
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    // num
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];
connection.onInitialize(function () {
    var result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: triggerCharacters
            }
        }
    };
    return result;
});
var documentSettings = new Map();
documents.onDidClose(function (e) {
    documentSettings["delete"](e.document.uri);
});
connection.onCompletion(function (textDocumentPosition) {
    try {
        return (0, completion_1["default"])(textDocumentPosition, documents);
    }
    catch (error) {
        connection.console.log("ERR: ".concat(error));
    }
    return [];
});
documents.listen(connection);
connection.listen();
