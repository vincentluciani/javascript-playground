function* generatorFunction() {
    console.log('generator function running');

    let x = 1;
    yield x; /*pauses here until next is called*/
    /* resume here when next is called */

    x++;
    let y = yield x /*pauses here until another next is called*/
    return x + y;
}

let iterator = generatorFunction();
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next(4))
console.log(iterator.next(2))
console.log('done')