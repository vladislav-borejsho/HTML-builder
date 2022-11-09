const path = require('path');
const fs = require('fs');

const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const projectFolder = path.join(__dirname, 'project-dist');
const newAssetsFolder = path.join(__dirname, 'project-dist', 'assets');
const htmlFile = path.join(__dirname, 'project-dist', 'index.html');
const cssFile = path.join(__dirname, 'project-dist', 'style.css');

// const outputHTML = fs.WriteStream(htmlFile);
const outputCSS = fs.WriteStream(cssFile);

// Create project-dist
fs.mkdir(projectFolder, {recursive: true}, err => {
    if(err) throw err;
})

// Merge styles 
fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err; 
    files.forEach(file => {
        const fileExt = path.extname(path.join(__dirname, file.name));
        if (fileExt === '.css') { 
            const inputStream = fs.ReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            inputStream.on('data', data => {
                outputCSS.write(data)
            });  
        } 
    })
})

//Create project-dist/assets & copy assets 
fs.rm(newAssetsFolder, {recursive:true, force:true}, () => {
    fs.mkdir(newAssetsFolder, {recursive: true}, err => {
        if(err) throw err;
    })
    fs.readdir(assetsFolder, {withFileTypes:true}, (err, files) => {
        if (err) throw err; 
        files.forEach(folder => {
            if (folder.isDirectory()) {
                fs.mkdir(path.join(projectFolder, 'assets', folder.name), {recursive:true}, err => {
                    if(err) throw err;})
    
                const assetsFolderPath = path.resolve(assetsFolder, folder.name);
    
                fs.readdir(assetsFolderPath, {withFileTypes:true}, (err, files) => {
                    if (err) throw err; 
                    files.forEach(file => {
                        const filePath = path.resolve(assetsFolderPath, file.name);
                        const copyPath = path.resolve(projectFolder, 'assets', folder.name, file.name);
                        fs.copyFile(filePath, copyPath, err => {
                            if(err) throw err;})
                    })
                })
            }
        })
    })
})


//Code for HTML
fs.readFile(templateFile, 'utf-8', (error, content) => {
    if (error) throw error;
    fs.readdir(componentsFolder, {withFileTypes:true}, (error, files) => {
        if (error) throw error;
        
        files.forEach(file => {
            const fileExtName = path.extname(file.name).trim();
            const filePath = path.resolve(componentsFolder, file.name);
            const fileName = file.name.slice(0, -fileExtName.length);

            if (file.isFile() && fileExtName === '.html') {
                fs.readFile(filePath, 'utf-8', (err, componentFile) => {
                    if (err) throw err;
                    const outputHTML = fs.WriteStream(htmlFile);
                    content = content.replace(`{{${fileName}}}`, componentFile);

                    outputHTML.write(content);
                })
            }
        })
    })
})