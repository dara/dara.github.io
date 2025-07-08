#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
    const htmlFiles = [];
    
    function searchDir(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                searchDir(filePath);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(filePath);
            }
        }
    }
    
    searchDir(dir);
    return htmlFiles;
}

function cacheBustFiles() {
    const timestamp = Date.now();
    const projectRoot = process.cwd();
    const htmlFiles = findHtmlFiles(projectRoot);
    
    console.log(`Found ${htmlFiles.length} HTML files to update...`);
    
    htmlFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Update CSS file references
        content = content.replace(
            /(<link[^>]+href=["'])([^"'?]+\.css)(\?v=\d+)?(["'][^>]*>)/g,
            (match, prefix, cssPath, oldVersion, suffix) => {
                updated = true;
                return `${prefix}${cssPath}?v=${timestamp}${suffix}`;
            }
        );
        
        // Update JS file references
        content = content.replace(
            /(<script[^>]+src=["'])([^"'?]+\.js)(\?v=\d+)?(["'][^>]*>)/g,
            (match, prefix, jsPath, oldVersion, suffix) => {
                updated = true;
                return `${prefix}${jsPath}?v=${timestamp}${suffix}`;
            }
        );
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${path.relative(projectRoot, filePath)}`);
        }
    });
    
    console.log('Cache busting complete!');
}

cacheBustFiles(); 