let currentNumber = ''; // current number button pressed
let previousNumber = ''; // previous operation result
let operator = ''; // operators
let shouldReset = false; 

const currentNumberDisplay = document.querySelector('.current-number');

const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const decimalButton = document.querySelector('.decimal-button');
const equalsButton = document.querySelector('.equals-button');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumber(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.value);
    })
})

clearButton.addEventListener('click', () => {
    clear();
})

deleteButton.addEventListener('click', () => {
    del(currentNumber);
})

equalsButton.addEventListener('click', () => {
    handleEqual();
})

function clear() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    shouldReset = false;
    currentNumberDisplay.textContent = '0';
}

function del(number) {
    currentNumber = number.slice(0, -1);
    currentNumberDisplay.textContent = currentNumber;
}

function handleNumber(number) {
    currentNumber += number;
    currentNumberDisplay.textContent = currentNumber;
}

function handleOperator(op) {
    previousNumber = currentNumber;
    operator = op;
    shouldReset = true;
}

function operate() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if (operator === "+") {
        return add(previousNumber, currentNumber);
    } else if (operator === "-") {
        return subtract(previousNumber, currentNumber);
    } else if (operator === "*") {
        return multiply(previousNumber, currentNumber);
    } else if (operator === "/") {
        return divide(previousNumber, currentNumber);
    }
}

function handleEqual() {
    currentNumberDisplay.textContent = operate();
    previousNumber = currentNumberDisplay.textContent;
}

function handleDisplay() {
    currentNumberDisplay.textContent = previousNumber;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

