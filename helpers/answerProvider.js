const waitingFunction = require('./asyncFunctions/waitingFunction');
const fs = require('fs');
const testData = './helpers/data/testData.txt';

exports.giveAnswer = async () => {
    let current = new Date();

    console.log("waiting function launched " + current.toString());

    // Following 3 actions are ran in parallel
    let result_part_1 = waitingFunction.giveTextAfterWaiting("hello");
    let result_part_2 = waitingFunction.giveTextAfterWaiting("world");
    let result_part_3 = waitingFunction.giveTextAfterWaiting("vincent");
    let values = await Promise.all([result_part_1, result_part_2, result_part_3]);

    // This action is launched only once the 3 previous actions are completed
    let result_part_4 = await waitingFunction.giveTextAfterWaiting("luciani");
    values.push(result_part_4);

    /* Calling a function that has callback */
    const dataFromFile = getDataFromFile((err, data) => {
        if (err) {
            console.log(err);
        } else {
            values.push(data);
        }
    })


    if (values.length > 0) {
        current = new Date();
        console.log(values.toString() + " " + current.toString());
        return values.toString();
    }
    /*else {
               reject('not working');
           }*/

    function getDataFromFile(callback) {
        /* read a file asynchronously */
        fs.readFile(testData, 'utf8', (err, data) => {
            if (err) {
                callback(err, null); /* null because no data to return */
            }
            else {
                callback(null, data); /* null because no error */
            }


        });
    }
}