let storedNumber1 = null;
let storedNumber2 = null;
let storedOperator = null;
let firstEquals = true;
let firstOperator = true;
let switchingNumbers = false;
let waitForNum = false;
let chaining = false;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers > button');
const operators = document.querySelectorAll('.operators > button');
const equals = document.querySelector('.button-equals');
const clear = document.querySelector('.button-clear');

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    displayInput(number);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (display.textContent === "Cannot divide by zero.") {
      reset();
    } else {
      selectOperator(operator);
    }
  });
});

equals.addEventListener('click', () => {
  if (storedNumber1 != null && display.textContent != "") {
    calc();
  }
});

clear.addEventListener('click', () => {
  reset();
});



function displayInput(number) {
  if (waitForNum) {
    display.textContent = number.textContent;
    waitForNum = false;
  } else if (display.textContent === "0") {
    display.textContent = number.textContent;
  } else if (display.textContent === "Cannot divide by zero.") {
    reset();
    display.textContent = number.textContent;
  } else {
    display.textContent += number.textContent;
  }
}

function selectOperator(operator) {
  if (firstOperator) {
    storedNumber1 = display.textContent;
    storedOperator = operator.textContent;
    display.textContent = "";
    firstOperator = false;
    firstEquals = true;
  } else {
    if (storedNumber1 !== null && display.textContent !== "" && waitForNum === false) {
      chaining = true;
      calc();
    }
    storedOperator = operator.textContent;
  }
}

function calc() {
  if (chaining) {
    if (storedOperator === "÷" && Number(display.textContent) === 0) {
      display.textContent = "Cannot divide by zero."
    } else {
      display.textContent = operate(storedOperator, Number(storedNumber1), Number(display.textContent));
      storedNumber1 = display.textContent;
      waitForNum = true;
      chaining = false;
    }
  } else if (firstEquals) {
    firstOperator = true;
    storedNumber2 = display.textContent;
    if (storedOperator === "÷" && Number(storedNumber2) === 0) {
      display.textContent = "Cannot divide by zero."
    } else {
      display.textContent = operate(storedOperator, Number(storedNumber1), Number(storedNumber2));
    }
    firstEquals = false;
  } else {
    firstOperator = true;
    if (storedOperator === "÷" && Number(storedNumber2) === 0) {    
      display.textContent = "Cannot divide by zero."
    } else {
      display.textContent = operate(storedOperator, Number(display.textContent), Number(storedNumber2));
    }
  }
}

function reset() {
  display.textContent = "0";
  storedNumber1 = null;
  storedNumber2 = null;
  storedOperator = null;
  firstEquals = true;
  firstOperator = true;
  switchingNumbers = false;
  waitForNum = false;
  chaining = false;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}