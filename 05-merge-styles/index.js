const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const newFile = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.WriteStream(newFile);
const mainFolder = path.join(__dirname, 'styles');

fs.readdir(mainFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err; 
    files.forEach(file => {
        const fileExt = path.extname(path.join(__dirname, file.name));
        if (fileExt === '.css') { 
            const inputStream = fs.ReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            inputStream.on('data', data => {
                output.write(data)
            });  
        } 
    })
})