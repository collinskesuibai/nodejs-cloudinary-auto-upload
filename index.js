"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
var chokidar_1 = __importDefault(require("chokidar"));
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var folder = 'ai-udacity';
var subfolder = 'SVM';
var cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
var uploadImage = function (path, filename) {
    console.log();
    cloud.uploader.upload(path, { public_id: folder + "/" + subfolder + "/" + filename }, function (error, result) {
        if (result) {
            fs_1.default.appendFile('links.txt', "" + os_1.default.EOL + result.url, function (err) {
                if (err)
                    return console.log(err);
            });
        }
    });
};
chokidar_1.default.watch('.').on('all', function (event, path) {
    if (event === 'add' && path.includes('screenshots')) {
        var filename = path.split('screenshots\\')[1];
        uploadImage(path, filename);
    }
});
