let firstNum = null;
let secondNum = null;
let repeatNum = null;
let repeatOperator = null;
let selectedOperator = null;
let waitingForNum = false;

const calcScreen = document.querySelector('.calcDisplay');
const inputScreen = document.querySelector('.inputDisplay');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.button-clear');
const equalsButton = document.querySelector('.button-equals');
const backspaceButton = document.querySelector('.button-backspace');

numberButtons.forEach((number) => {
  number.addEventListener('click', displayInput);
});

operatorButtons.forEach((operator) => {
  operator.addEventListener('click', selectOperator);
});

clearButton.addEventListener('click', reset);
equalsButton.addEventListener('click', calcAnswer);
backspaceButton.addEventListener('click', backspace);



function displayInput() {
  if (needsReset()) reset();
  if (waitingForNum) {
    removeOperatorHighlighting();
    waitingForNum = false;
    inputScreen.textContent = "";
  }
  if (this.textContent === ".") {
    if (!inputScreen.textContent.includes(".")) {
      if (inputScreen.textContent === "") inputScreen.textContent += "0";
      inputScreen.textContent += this.textContent;
    }
  } else if (inputScreen.textContent === "0") {
    inputScreen.textContent = this.textContent;
  } else {
    inputScreen.textContent += this.textContent;
  }
}

function selectOperator() {
  if (needsReset()) {
    reset();
    return;
  }
  if (checkForEquation()) {
    calcAnswer();
    if (inputScreen.textContent === "Can't divide by 0.") {
      return;
    }
  }
  if (inputScreen.textContent.slice(-1) === ".") backspace();
  if (inputScreen.textContent !== "") firstNum = inputScreen.textContent;
  selectedOperator = this.textContent;
  calcScreen.textContent = firstNum + " " + selectedOperator;
  waitingForNum = true;
  removeOperatorHighlighting();
  this.classList.add("selectedOperator");
}

function removeOperatorHighlighting() {
  operatorButtons.forEach((operator) => {
    operator.classList.remove("selectedOperator");
  });
}

function calcAnswer() {
  if (needsReset()) {
    reset();
    return;
  }
  if (checkForEquation()) {
    secondNum = inputScreen.textContent;
  } else if (repeatNum !== null && repeatOperator !== null) {
      secondNum = repeatNum;
      selectedOperator = repeatOperator;
  } else {
    return;
  }
  if (selectedOperator === "÷" && secondNum === "0") {
    inputScreen.textContent = "Can't divide by 0.";
    return;
  }
  calcScreen.textContent = firstNum + " " + selectedOperator + " " + secondNum + " =";
  inputScreen.textContent = operate(selectedOperator, Number(firstNum), Number(secondNum));
  firstNum = inputScreen.textContent;
  repeatNum = secondNum;
  repeatOperator = selectedOperator;
  secondNum = null;
  selectedOperator = null;
}

function checkForEquation() {
  return (firstNum !== null && selectedOperator !== null && !waitingForNum);
}

function backspace() {
  if (needsReset()) {
    reset();
    return;
  }
  inputScreen.textContent = inputScreen.textContent.slice(0,-1);
}

function reset() {
  firstNum = null;
  secondNum = null;
  repeatNum = null;
  repeatOperator = null;
  selectedOperator = null;
  calcScreen.textContent = "";
  inputScreen.textContent = "0";
  removeOperatorHighlighting();
}

function needsReset() {
  return ((inputScreen.textContent === "Infinity" || inputScreen.textContent === "NaN" || inputScreen.textContent === "Can't divide by 0.") ? true : false);
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
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}