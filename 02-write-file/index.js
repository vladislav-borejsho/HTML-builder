const { stdin, stdout, exit } = require('process');
const fs = require('fs');
const path = require('path');
const newFolder = path.join(__dirname, 'file.txt');
const output = fs.WriteStream(newFolder);

stdout.write('Введите ваш текст\n');

stdin.on('data', data => {  
    if (data.toString().trim() === 'exit') {
        goodBye();
    }  
    output.write(data);
});

process.on('SIGINT', goodBye);

function goodBye() {
    console.log('GoodBye!');
    exit();
}