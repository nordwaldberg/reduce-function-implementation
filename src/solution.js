const {less} = require('./playground');
const {add} = require('./playground');


async function reduceLoop(array, fn, initialValue) {
    let accumulator = initialValue ? initialValue : 0;

    const asyncArrayLength = await new Promise(resolve => array.length(resolve));
    let index = 0;
    let condition = await new Promise(resolve => less(index, asyncArrayLength, resolve));

    while (condition) {
        let current = await new Promise(resolve => array.get(index, resolve));
        accumulator = await new Promise(resolve => {
            fn(accumulator, current, index, array, resolve);
        });
        index = await new Promise(resolve => add(index, 1, resolve));
        condition = await new Promise(resolve => less(index, asyncArrayLength, resolve));
    }

    return accumulator;
}

module.exports = function reduce(array, fn, initialValue, cb) {
    reduceLoop(array, fn, initialValue)
        .then(result => cb(result))
        .catch(error => console.log(error));
};