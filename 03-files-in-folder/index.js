const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const secretDir = path.join(__dirname, 'secret-folder');
fs.readdir(secretDir, {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    let arr = [];
     for (let i=0; i<files.length; i++) {
        if (!files[i].isFile()) {} else {arr.push(files[i])}
     }
     arr.forEach(file => {
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath);
        fs.stat(filePath, (err, stats) => {
            console.log(fileName.replace(fileExt, '') + ' - ' + fileExt.replace('.', '') + ' - ' + stats.size + ' bytes');
        })
        
     })
    });
