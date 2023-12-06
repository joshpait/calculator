let currentNumber = ''; // current number button pressed
let previousNumber = ''; // previous operation result
let operator = null; // operators
let shouldReset = false; 
let shouldOperate = false;
let maxDecimal = false;

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

decimalButton.addEventListener('click', () => {
    handleDecimal();
})

function clear() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    shouldReset = false;
    shouldOperate = false;
    maxDecimal = false;
    currentNumberDisplay.textContent = '';
}

function del(number) {
    currentNumber = number.slice(0, -1);
    currentNumberDisplay.textContent = currentNumber;
}

function handleNumber(number) {
    if (shouldReset) {
        currentNumber = '';
        shouldReset = false;
        shouldOperate = true;
    }
    currentNumber += number;
    currentNumberDisplay.textContent = currentNumber;
}

function handleOperator(op) {
    if (shouldOperate) {
        previousNumber = operate();
        currentNumberDisplay.textContent = previousNumber;
        operator = op;
        maxDecimal = false;
    } else {
        previousNumber = currentNumber;
        operator = op;
        maxDecimal = false;
        shouldReset = true;
    }
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
        if (currentNumber === 0) {
            alert("Can't divide by zero! Please try again.");
            return;
        } else {
            return divide(previousNumber, currentNumber);
        }
    }
}

function handleDecimal() {
    if (!maxDecimal) {
        currentNumber += '.';
        currentNumberDisplay.textContent = currentNumber;
        maxDecimal = true;
    }
}

function handleEqual() {
    currentNumber = operate();
    currentNumberDisplay.textContent = currentNumber;
    shouldOperate = false;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) handleNumber(e.key);
    if (e.key === '.') handleDecimal();
    if (e.key === '=' || e.key === 'Enter') handleEqual();
    if (e.key === 'Backspace') del();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      handleOperator(e.key);
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
