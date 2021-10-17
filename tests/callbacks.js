const {expectedResultsNums,  expectedResultsStrs } = require('./tests-data');


const numsAdditionCallback = (result) => expect(result).toBe(expectedResultsNums[0]);
const numsSubtractionCallback = (result) => expect(result).toBe(expectedResultsNums[1]);
const numsMultiplicationCallback = (result) => expect(result).toBe(expectedResultsNums[2]);
const numsDivisionCallback = (result) => expect(result).toBe(expectedResultsNums[3]);

const strsAdditionCallback = (result) => expect(result).toBe(expectedResultsStrs[0]);

module.exports = {
    numsAdditionCallback,
    numsSubtractionCallback,
    numsMultiplicationCallback,
    numsDivisionCallback,
    strsAdditionCallback
};