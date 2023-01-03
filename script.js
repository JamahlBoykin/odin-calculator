let storedNumber1 = null;
let storedNumber2 = null;
let storedOperator = null;
let firstEquals = true;
let firstOperator = true;
let switchingNumbers = false;
let waitForNum = false;
let chaining = false;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelector('.button-equals');
const backspace = document.querySelector('.button-backspace');
const clear = document.querySelector('.button-clear');
const buttons = document.querySelectorAll('.calculator > button, * > button');

buttons.forEach((button) => {
  button.setAttribute("tabIndex", -1);
  button.setAttribute("onclick", "blur()");
  button.setAttribute("onmouseleave", "blur()");
});

window.addEventListener('keydown', detectButtonPress);

clear.addEventListener('click', () => {
  reset();
});

backspace.addEventListener('click', () => {
  if (display.textContent !== "" && display.textContent !== "+" && display.textContent !== "-" && display.textContent !== "x" && display.textContent !== "÷") {
    display.textContent = display.textContent.slice(0,-1);
  }
});

equals.addEventListener('click', () => {
  if (storedNumber1 != null && display.textContent !== "" && display.textContent !== "+" && display.textContent !== "-" && display.textContent !== "x" && display.textContent !== "÷") {
    calc();
  }
});

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    displayInput(number);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    selectOperator(operator);
  });
});





function detectButtonPress(e) {
  if (e.key === "Enter" || e.key === "/") {
    e.preventDefault();
  }

  if (display.textContent === "Infinity" || display.textContent === "NaN") {
    reset();
    return;
  }

  const btn = document.querySelector(`button.key-${e.keyCode}-shift`);
  
  if (btn) {
    if (e.shiftKey) {
      btn.click();
      return;
    }
  }

  if (e.shiftKey) {
    return;
  } else {
    const btn2 = document.querySelector(`button.key-${e.keyCode}`);
    if (btn2) {
      btn2.click();
    }
  }
}

function displayInput(number) {
  if (display.textContent === "Infinity" || display.textContent === "NaN" || display.textContent === "Cannot divide by zero.") {
    reset();
    display.textContent = number.textContent;
    return;
  }

  if (number.textContent === ".") {
    if (display.textContent.includes(".")) {
      return;
    }
  }

  if (display.textContent === "+" || display.textContent === "-" || display.textContent === "x" || display.textContent === "÷") {
    display.textContent = "";
  }

  if (waitForNum) {
    display.textContent = number.textContent;
    waitForNum = false;
  } else if (display.textContent === "0") {
    if (number.textContent === ".") {
      display.textContent += number.textContent;
    } else {
      display.textContent = number.textContent;
    }
  } else {
    display.textContent += number.textContent;
  }
}

function selectOperator(operator) {
  if (display.textContent === "Infinity" || display.textContent === "NaN" || display.textContent === "Cannot divide by zero.") {
    reset();
    return;
  }

  if (firstOperator) {
    storedNumber1 = display.textContent;
    storedOperator = operator.textContent;
    display.textContent = storedOperator;
    firstOperator = false;
    firstEquals = true;
  } else {
    if (storedNumber1 !== null && waitForNum === false && display.textContent !== "" && display.textContent !== "+" && display.textContent !== "-" && display.textContent !== "x" && display.textContent !== "÷") {
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