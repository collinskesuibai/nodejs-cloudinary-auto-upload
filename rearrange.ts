//requiring path and fs modules
const path = require('path');
const fs = require('fs');
import os from 'os';
//joining path of directory
const directoryPath = path.join(__dirname, 'screenshots');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err: Error, files: String[]) {
  //handling error
  console.log(files);
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  const array = fs.readFileSync('links.txt').toString().split('\n');
  const urls: String[] = [];
  for (const i of array) {
    urls.push(decodeURIComponent(i));
  }
  const path = './output.txt';

  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }

  //listing all files using forEach
  files.forEach(function (file) {
    const matching: String[] = filterArray(file.toString(), urls);
    if (matching[0]) {
      fs.appendFile(
        'output.txt',
        `${os.EOL}![](${matching[0]})`,
        function (err: Error) {
          if (err) return console.log(err);
        },
      );
    }
  });
});

export const filterArray = (searchString: string, array: String[]) => {
  let filteredArray: String[] = [];

  for (let i = 0; i < array.length; i++) {
    let txtValue = array[i];
    if (txtValue.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};
