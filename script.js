let firstOperand = ''; // current number button pressed
let secondOperand = ''; // previous operation result
let operator = null; // operators
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

window.addEventListener('keydown', handleKeyboardInput);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
decimalButton.addEventListener('click', handleDecimal)
equalsButton.addEventListener('click', handleEqual);

function handleNumber(number) {
    if (currentNumberDisplay.textContent === '0' || shouldReset) {
        resetScreen();
    }
    currentNumberDisplay.textContent += number;
}

function handleOperator(op) {
    if (operator !== null) {
        handleEqual();
    }
    firstOperand = currentNumberDisplay.textContent;
    operator = op;
    shouldReset = true;
}

function handleDecimal () {
    if (shouldReset) { resetScreen(); }
    if (currentNumberDisplay === '') { currentNumberDisplay.textContent = '0'}
    if (currentNumberDisplay.textContent.includes('.')) { return }

    currentNumberDisplay.textContent += '.';
}

function clear() {
    currentNumberDisplay.textContent = 0;
    firstOperand = '';
    secondOperand = '';
    operator = null;
}

function del() {
    currentNumberDisplay.textContent = currentNumberDisplay.textContent
                                        .toString()
                                        .slice(0, -1);
}

function resetScreen() {
    currentNumberDisplay.textContent = '';
    shouldReset = false;
}

function handleEqual() {
    if (operator === '/' && currentNumberDisplay.textContent === '0') {
        alert("You can't divide by zero!");
        return;
    }
    secondOperand = currentNumberDisplay.textContent;
    currentNumberDisplay.textContent = roundResult(operate(operator, firstOperand, secondOperand));
    operator = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) { handleNumber(e.key) }
    if (e.key === '.') { handleDecimal()} 
    if (e.key === '=' || e.key === 'Enter') { handleEqual() }
    if (e.key === 'Backspace') { del() }
    if (e.key === 'Escape') { clear() }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key)
    }
}

function operate(operator, firstOperand, secondOperand) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);

    if (operator === "+") {
        return add(firstOperand, secondOperand);
    } else if (operator === "-") {
        return subtract(firstOperand, secondOperand);
    } else if (operator === "*") {
        return multiply(firstOperand, secondOperand);
    } else if (operator === "/") {
        return divide(firstOperand, secondOperand);
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

