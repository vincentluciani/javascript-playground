const fs = require('fs');
const testData = './helpers/data/testData.txt';

exports.getDataFromFile = () => {
    return new Promise(
        (resolve, reject) => {
            /* read a file asynchronously */
            fs.readFile(testData, 'utf8', (err, data) => {
                if (err) {
                    reject("error reading the file");
                }
                else {
                    resolve(data);
                }
            });

        }
    )
}