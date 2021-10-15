((global) => {
    const _wrap = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * 20);
    };

    const AsyncArray = function (initial) {
        if (initial && !(initial instanceof Array)) {
            throw new Error('initial value is not an array');
        }

        const a = initial ? Array.from(initial) : [];

        this.set = (index, value, cb) => _wrap(() => {
            a[index] = value
        }, cb);

        this.push = (value, cb) => _wrap(() => {
            a.push(value)
        }, cb);

        this.get = (index, cb) => _wrap(() => a[index], cb);
        this.pop = (cb) => _wrap(() => a.pop(), cb);
        this.length = (cb) => _wrap(() => a.length, cb);

        this.print = () => {
            console.log(a.toString());
        };
    }

    const add = (a, b, cb) => _wrap(() => a + b, cb);
    const subtract = (a, b, cb) => _wrap(() => a - b, cb);
    const multiply = (a, b, cb) => _wrap(() => a * b, cb);
    const divide = (a, b, cb) => _wrap(() => a / b, cb);

    const less = (a, b, cb) => _wrap(() => a < b, cb);
    const equal = (a, b, cb) => _wrap(() => a == b, cb);
    const lessOrEqual = (a, b, cb) => _wrap(() => a <= b, cb);

    global.Homework = {
        AsyncArray,
        add,
        subtract,
        multiply,
        divide,
        less,
        equal,
        lessOrEqual,
    };

    Object.freeze(global.Homework);
})(typeof window === 'undefined' ? global : window);

const {AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual} = Homework;

// const a = new AsyncArray([1, 2, 3]);
//
// a.push(4, () => {
//     console.log('добавление элемента выполнено');
//     a.print();
//
//     a.set(2, 999, () => {
//         console.log('присваивание элемента по индексу выполнено');
//         a.print();
//
//         a.get(0, (result) => {
//             console.log('получение элемента по индексу выполнено, результат', result);
//             a.print();
//
//             a.pop((result) => {
//                 console.log('получение последнего элемента выполнено, результат', result);
//                 a.print();
//
//                 a.length((result) => {
//                     console.log('получение длины массива выполнено, результат', result);
//                     a.print();
//                 });
//             });
//         });
//     });
// });
//
// add(5, 2, (result) => console.log('результат сложения', result));
//
// subtract(11, 7, (result) => console.log('результат вычитания', result));
//
// multiply(6, 7, (result) => console.log('результат умножения', result));
//
// divide(13, 7, (result) => console.log('результат деления', result));
//
// less(5, 3, (result) => console.log('результат операции МЕНЬШЕ', result));
//
// equal(1, 1, (result) => console.log('результат операции РАВНО', result));
//
// lessOrEqual(12, 19, (result) => console.log('результат операции МЕНЬШЕ ИЛИ РАВНО', result));
//
// const asyncArray = new Homework.AsyncArray([1, 2, 3, 4]);
// const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
//
// reduce(asyncArray, reducerSum, 0, (res) => {
//     console.log(res); // 10
// });


//функция принимает асинхронный массив, выполняет для всех элементов функцию fn, записывая результат в acc,
//передает окончательное значение в коллбэк, а колбэк с ним что-то делает. initialValue записывается в
//acc функции fn дефолт инишла 0.

//ВСЕ ФУНКЦИИ НИЧЕГО НЕ ВОЗВРАЩАЮТ

//cb(fn());

// type reduce = (
//     array: AsyncArray
// fn: (
//     acc: any,
//     cur: any,
//     i: number,
//     src: AsyncArray,
//     cb: (result: any) => void
// ) => void
//     initialValue: any
// cb: (result: any) => void
// ) => void

const test = new AsyncArray([1, 2, 3, 4]);

async function reduceLoop (asyncArray, fn, initialValue) {
    let accumulator = initialValue ? initialValue : 0;

    const asyncArrayLength = await new Promise(resolve => asyncArray.length(resolve));
    let index = 0;
    let condition = await new Promise(resolve => less(index, asyncArrayLength, resolve));

    while (condition) {
        let current = await new Promise(resolve => asyncArray.get(index, resolve));
        accumulator = await new Promise(resolve => {
            fn(accumulator, current, index, asyncArray, resolve);
        });
        index = await new Promise(resolve => add(index, 1, resolve));
        condition = await new Promise(resolve => less(index, asyncArrayLength, resolve));
    }

    return accumulator;
}

function reduce(asyncArray, fn, initialValue, cb) {
    reduceLoop(asyncArray, fn, initialValue).then(result => cb(result));
};

const testFn = (acc, curr, i, src, cb) => add(acc, curr, cb);

reduce(test, testFn, null, (res) => {
    console.log(res);
});
