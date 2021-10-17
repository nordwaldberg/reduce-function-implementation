const {AsyncArray} = require('../src/playground');


const numTestArr = [100, 25, 1];
const strTestArr = ['e', 'l', 'e', 'c', 't', 'r', 'o', 'n', '-', 'v', 'o', 'l', 't'];

const expectedResultsNums = [126, -126, 0, 0];
const expectedResultsStrs = ['0electron-volt'];

const initialValue = 0;

const numTestAsyncArr = new AsyncArray(numTestArr);
const strTestAsyncArr = new AsyncArray(strTestArr);

module.exports = {
    expectedResultsNums,
    expectedResultsStrs,
    numTestAsyncArr,
    strTestAsyncArr,
    initialValue
};