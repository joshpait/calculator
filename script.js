let firstOperand = ''; // current number button pressed
let secondOperand = ''; // previous operation result
let currentOperator = null; // operators
let decimalCount = 0;
let shouldResetScreen = false;

const currentNumberDisplay = document.querySelector('.current-number');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const decimalButton = document.querySelector('.decimal-button');
const equalsButton = document.querySelector('.equals-button');

window.addEventListener('keydown', handleKeyboardInput);
numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
decimalButton.addEventListener('click', () => appendDecimal());
operatorButtons.forEach(button => button.addEventListener('click', () => setOperation(button.value)));
clearButton.addEventListener('click', () => clear());
deleteButton.addEventListener('click', () => del());
equalsButton.addEventListener('click', () => evaluate());

function resetScreen() {
    currentNumberDisplay.textContent = '';
    shouldResetScreen = false;
}

function appendNumber(number) {
    if (shouldResetScreen) resetScreen();
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

function setOperation(operator) {
    if (currentOperator !== null) operate();
    firstOperand = currentNumberDisplay.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentNumberDisplay.textContent === '0' && currentOperator === '/') {
        alert("Can't divide by zero!");
        currentNumberDisplay.textContent = '';
        return;
    }
    secondOperand = currentNumberDisplay.textContent;
    currentNumberDisplay.textContent = roundResult(operate(firstOperand, secondOperand, currentOperator));
    currentOperator = null;
}

function del() {
    currentNumberDisplay.textContent = currentNumberDisplay.textContent.toString().slice(0, -1);
}

function clear() {
    resetScreen();
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    decimalCount = 0;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') del()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(e.key)
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

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) return null;
            else return divide(a, b);
    }
}