const fs = require('fs');
const path = require('path');

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

fs.rm(newFolder, {recursive: true, force: true}, () => {
    fs.mkdir(newFolder, {recursive: true}, err => {
        if(err) throw err;
    })
    fs.readdir(oldFolder, {withFileTypes: true}, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            const filePath = path.join(__dirname, 'files', file.name);
            fs.copyFile(filePath, path.join(__dirname, 'files-copy', file.name), err => {
                if (err) throw err;
            });
        })
        console.log('Файлы успешно скопированы!');
    })
})


    






