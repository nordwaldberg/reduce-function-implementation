module.exports = function (Homework) {
    async function reduceLoop (array, fn, initialValue) {
        let accumulator = initialValue ? initialValue : 0;

        const arrayLength = await new Promise(resolve => array.length(resolve));
        let index = 0;
        let condition = await new Promise(resolve => Homework.less(index, arrayLength, resolve));

        while (condition) {
            let current = await new Promise(resolve => array.get(index, resolve));
            accumulator = await new Promise(resolve => {
                fn(accumulator, current, index, array, resolve);
            });
            index = await new Promise(resolve => Homework.add(index, 1, resolve));
            condition = await new Promise(resolve =>  Homework.less(index, arrayLength, resolve));
        }

        return accumulator;
    }

    return (array, fn, initialValue, cb) => {
        reduceLoop(array, fn, initialValue).then(result => cb(result));
    }
}