const EventEmitter = require('events');
const dataFunction = require('./helpers/asyncFunctions/getDataFromFileAsync');

let myEmitter = new EventEmitter();


myEmitter.on('sayHello', (who) => {
    setImmediate(() => console.log('I registered first but I am called at the end (because I am asynchronous) !'))
})

/* use async keyword if you need to call an async function with await */
myEmitter.on('sayHello', async (who) => {

    const dataFromFile = await dataFunction.getDataFromFileAsync();
    console.log('I registered second and I called an asynchronous function. Here is the result:' + dataFromFile)
})

/* This emitter and the one below are executed synchronously */
myEmitter.on('sayHello', (who) => {
    console.log('somebody said hello: ' + who)
})

/* emitter registered after the emitter above, so will be called after when the event occurs */
myEmitter.on('sayHello', (who) => {
    console.log('I also want to tell that somebody said hello !')
})


console.log("declared the reaction to the event")

myEmitter.emit('sayHello', 'Bob')
