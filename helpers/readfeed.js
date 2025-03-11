import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const readJson = (filepath) => {
    try {
        const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
        const __dirname = path.dirname(__filename); // get the name of the directory
        
        let jsonFilepath = path.join(__dirname, '../feeds', filepath + '.json' );

        if (fs.existsSync(jsonFilepath)) {
            var file = fs.readFileSync(jsonFilepath, 'utf8');
            return JSON.parse(file);
        }
    } catch (error) {
        console.log(error)
        throw(error);    
    }
}