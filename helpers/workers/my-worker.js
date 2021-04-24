
const { Worker, parentPort, workerData } = require('worker_threads');

const delay = 2

const end = Date.now() + delay * 1000

/* cpu intensive task */
parentPort.on('message', (msg) => parentPort.postMessage("message received from the parent port:" + msg));

console.log("Worker starting working");

parentPort.postMessage("starting");

while (Date.now() < end) { }
console.log("Worker finished working. Message processed is:" + workerData.worker_input);
parentPort.postMessage("finished");

