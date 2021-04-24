const fsPromises = require('fs').promises
const testData = './helpers/data/testData.txt';

exports.getDataFromFileAsync = async () => {

    // try {
    let rawData = await fsPromises.readFile(testData, 'utf-8');
    return rawData
    //} catch (error) {
    //     throw new Error(error);
    // }
}