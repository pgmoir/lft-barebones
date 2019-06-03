const fs = require("fs");
const path = require('path');

function read(filepath) {
    let jsonFilepath = path.join(__dirname, '../feeds', filepath + '.json' );
    console.log(jsonFilepath);
    try {
        if (fs.existsSync(jsonFilepath)) {
            var file = fs.readFileSync(jsonFilepath, 'utf8');
            return JSON.parse(file);
        }
    } catch (error) {
        throw(error);    
    }
}

module.exports.read = read;