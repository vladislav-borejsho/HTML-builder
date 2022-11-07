const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const inputStream = fs.ReadStream(path.join(__dirname, 'text.txt'),'utf-8');
inputStream.on('data', data => stdout.write(data))