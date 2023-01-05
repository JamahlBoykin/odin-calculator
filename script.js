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
const allButtons = document.querySelectorAll('.calculator > button');

numberButtons.forEach((button) => {
  button.setAttribute("tabIndex", -1);
  button.setAttribute("onclick", "blur()");
  button.setAttribute("onmouseleave", "blur()");
});

numberButtons.forEach((number) => {
  number.addEventListener('click', displayInput);
});

operatorButtons.forEach((operator) => {
  operator.addEventListener('click', selectOperator);
});

clearButton.addEventListener('click', reset);
equalsButton.addEventListener('click', calcAnswer);
backspaceButton.addEventListener('click', backspace);
window.addEventListener('keydown', processKeyboardInput);



function processKeyboardInput(e) {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      for (const number of numberButtons.values()) {
        if (e.key === number.textContent) {
          pressKey(number);
          return;
        }
      }
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      let key = e.key;
      if (e.key === "/") {
        key = "÷";
      } else if (e.key === "*") {
        key = "×";
      }
      for (const operator of operatorButtons.values()) {
        if (key === operator.textContent) {
          operator.click();
        }
      }
      break;
    case "Escape":
      pressKey(clearButton);
      break;
    case "Enter":
      pressKey(equalsButton);
      break;
    case "Delete":
    case "Backspace":
      pressKey(backspaceButton);
      break;
  }
}

function pressKey(key) {
  key.click();
  key.classList.add('active');
  setTimeout(() => {
    key.classList.remove('active');
  }, 100);
}

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
  } else if (canRepeatEquals()) {
      secondNum = repeatNum;
      selectedOperator = repeatOperator;
  } else {
    return;
  }
  if (selectedOperator === "÷" && secondNum === "0") {
    inputScreen.textContent = "Can't divide by 0.";
    return;
  }
  removeOperatorHighlighting();
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

function canRepeatEquals() {
  return (repeatNum !== null && repeatOperator !== null);
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