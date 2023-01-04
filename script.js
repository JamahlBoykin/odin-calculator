let firstNum = null;
let selectedOperator = null;

const calcScreen = document.querySelector('.calcDisplay');
const inputScreen = document.querySelector('.inputDisplay');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

numberButtons.forEach((number) => {
  number.addEventListener('click', displayInput);
});

operatorButtons.forEach((operator) => {
  operator.addEventListener('click', selectOperator);
});



function displayInput() {
  if (inputScreen.textContent === "") removeOperatorHighlighting();
  inputScreen.textContent += this.textContent;
}

function selectOperator() {
  if (inputScreen.textContent !== "") firstNum = inputScreen.textContent;

  selectedOperator = this.textContent;
  
  calcScreen.textContent = firstNum + " " + selectedOperator;
  inputScreen.textContent = "";

  removeOperatorHighlighting();
  this.classList.add("selectedOperator");
}

function removeOperatorHighlighting() {
  operatorButtons.forEach((operator) => {
    operator.classList.remove("selectedOperator");
  });
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