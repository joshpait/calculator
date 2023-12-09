let firstOp = ''; // current number button pressed
let secondOp= ''; // previous operation result
let operator = null; // operators
let decimalCount = 0;

const currentNumberDisplay = document.querySelector('.current-number');

const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const decimalButton = document.querySelector('.decimal-button');
const equalsButton = document.querySelector('.equals-button');

window.addEventListener('keydown', handleKeyboardInput);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

decimalButton.addEventListener('click', () => {
    appendDecimal();
})

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

function appendNumber(number) {
    currentNumberDisplay.textContent += number;
}

function appendDecimal() {
    if (decimalCount >= 1) {
        return;
    } else {
        currentNumberDisplay.textContent += '.'
        decimalCount++;
    }
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