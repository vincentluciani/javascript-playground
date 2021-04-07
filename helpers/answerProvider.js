const waitingFunction = require('./asyncFunctions/waitingFunction')

exports.giveAnswer = async () => {
    let current = new Date();

    console.log("waiting function launched " + current.toString())

    // Following 3 actions are ran in parallel
    let result_part_1 = waitingFunction.giveTextAfterWaiting("hello");
    let result_part_2 = waitingFunction.giveTextAfterWaiting("world");
    let result_part_3 = waitingFunction.giveTextAfterWaiting("vincent");
    let values = await Promise.all([result_part_1, result_part_2, result_part_3]);

    // This action is launched only once the 3 previous actions are completed
    let result_part_4 = await waitingFunction.giveTextAfterWaiting("luciani");
    values.push(result_part_4)

    if (values.length > 0) {
        current = new Date();
        console.log(values.toString() + " " + current.toString())
        return values.toString()
    } /*else {
                reject('not working');
            }*/
}