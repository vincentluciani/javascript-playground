const waitingFunction = require('./asyncFunctions/waitingFunction');
const dataFunction = require('./asyncFunctions/getDataFromFileAsync');
const fs = require('fs');
const fsPromises = require('fs').promises

const { Worker, parentPort, workerData } = require('worker_threads');

const testData = './helpers/data/testData.txt';
const dataHandler = require('./asyncFunctions/getDataFromFile');

exports.giveAnswer = async () => {
    let current = new Date();

    console.log("Instantiating a worker");
    const myWorker = new Worker('./helpers/workers/my-worker.js', {
        workerData: { "worker_input": "test-data-for-worker" }
    });

    console.log("waiting worker launched " + current.toString());

    myWorker.on('message', (msg) => console.log("message from worker:" + msg));

    myWorker.postMessage('message from the main thread');

    // Following 3 actions are ran in parallel
    let result_part_1 = waitingFunction.giveTextAfterWaiting("hello");
    let result_part_2 = waitingFunction.giveTextAfterWaiting("world");
    let result_part_3 = waitingFunction.giveTextAfterWaiting("vincent");
    let values = await Promise.all([result_part_1, result_part_2, result_part_3]);

    // This action is launched only once the 3 previous actions are completed
    let result_part_4 = await waitingFunction.giveTextAfterWaiting("luciani");
    values.push(result_part_4);

    try {
        const dataFromFile = await dataFunction.getDataFromFileAsync();
        values.push(dataFromFile);
    } catch (error) {
        values.push("error reading file")
    }

    if (values.length > 0) {
        current = new Date();
        console.log(values.toString() + " " + current.toString());
        return values.toString();
    }
    /*else {
               reject('not working');
           }*/

}