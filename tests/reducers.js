const {add, subtract, multiply, divide} = require('../src/playground');


const additionReducer = (acc, curr, i, src, cb) => add(acc, curr, cb);
const subtractionReducer = (acc, curr, i, src, cb) => subtract(acc, curr, cb);
const multiplicationReducer = (acc, curr, i, src, cb) => multiply(acc, curr, cb);
const divisionReducer = (acc, curr, i, src, cb) => divide(acc, curr, cb);

module.exports = {
    additionReducer,
    subtractionReducer,
    multiplicationReducer,
    divisionReducer
};