
const { Worker, parentPort } = require('worker_threads');

const delay = 2

const end = Date.now() + delay * 1000

/* cpu intensive task */
console.log("Worker starting working");

parentPort.postMessage("starting");

while (Date.now() < end) { }
console.log("Worker finished working");
parentPort.postMessage("finished");

