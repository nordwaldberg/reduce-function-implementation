const reduce = require('../src/solution');
const {
    numTestAsyncArr,
    strTestAsyncArr,
    initialValue
} = require('./tests-data');
const {
    numsAdditionCallback,
    numsSubtractionCallback,
    numsMultiplicationCallback,
    numsDivisionCallback,
    strsAdditionCallback
} = require('./callbacks');
const {
    additionReducer,
    subtractionReducer,
    multiplicationReducer,
    divisionReducer
} = require('./reducers');


describe('Base tests', () => {
    test('Addition and subtraction of array elements', () => {
        reduce(numTestAsyncArr, additionReducer, initialValue, numsAdditionCallback);
        reduce(numTestAsyncArr, subtractionReducer, initialValue, numsSubtractionCallback);
        reduce(strTestAsyncArr, additionReducer, initialValue, strsAdditionCallback);
    });

    test('Multiplication and division of array elements', () => {
        reduce(numTestAsyncArr, multiplicationReducer, initialValue, numsMultiplicationCallback);
        reduce(numTestAsyncArr, divisionReducer, initialValue, numsDivisionCallback);
    });
});