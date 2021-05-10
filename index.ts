import cloudinary from 'cloudinary';
require('dotenv').config();
import chokidar from 'chokidar';
import os from 'os';
import fs from 'fs';

const folder = 'test';
const subfolder = 'test';

const cloud = cloudinary.v2;
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = (path: string, filename: string) => {
  console.log();
  cloud.uploader.upload(
    path,
    { public_id: `${folder}/${subfolder}/${filename}` },
    function (error, result) {
      if (result) {
        fs.appendFile(
          'links.txt',
          `${os.EOL}![](${result.url})`,
          function (err) {
            if (err) return console.log(err);
          },
        );
      }
    },
  );
};

chokidar.watch('.').on('all', (event, path) => {
  if (event === 'add' && path.includes('screenshots')) {
    const filename = path.split('screenshots\\')[1];
    uploadImage(path, filename);
  }
});
