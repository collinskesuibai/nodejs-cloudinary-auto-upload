"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterArray = void 0;
//requiring path and fs modules
var path = require('path');
var fs = require('fs');
var os_1 = __importDefault(require("os"));
//joining path of directory
var directoryPath = path.join(__dirname, 'screenshots');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    console.log(files);
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    var array = fs.readFileSync('links.txt').toString().split('\n');
    var urls = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var i = array_1[_i];
        urls.push(decodeURIComponent(i));
    }
    var path = './output.txt';
    try {
        fs.unlinkSync(path);
        //file removed
    }
    catch (err) {
        console.error(err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        var matching = exports.filterArray(file.toString(), urls);
        if (matching[0]) {
            fs.appendFile('output.txt', os_1.default.EOL + "![](" + matching[0] + ")", function (err) {
                if (err)
                    return console.log(err);
            });
        }
    });
});
exports.filterArray = function (searchString, array) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
        var txtValue = array[i];
        if (txtValue.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
};
