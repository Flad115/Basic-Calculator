const opButton = document.querySelector(".math");
const numpad = document.querySelector(".numpad");
const display = document.querySelector(".displayText");

const equation = {
  firstNum: 0,
  secondNum: 0,
  operation: null,
};

// this checks to make sure the entire button container
// for the numpad and the operation area isn't clicked
function isButton(event) {
  if (event.target.nodeName == "BUTTON") {
    return true;
  } else {
    return false;
  }
};

// function for when any number on the numpad is clicked
numpad.addEventListener("click", function (event) {
  if (isButton(event)) {

    // sets display to pressed number if display is currently 0
    // otherwise, add pressed number to display string
    if (display.innerText === "0") {
      display.innerText = event.target.innerText;
    } else {
      display.innerText += event.target.innerText;
    }
    // console.log(`pressed number ${event.target.innerText}`);
  }
});

// add event to all operations buttons including equals
opButton.addEventListener("click", function (event) {
  if (isButton(event)) {

    // check if button was equals button and if operation is set
    if (event.target.innerText === "=") {
      if (equation.operation != null) {
        equal();
      }
    } else {
      // if not equals operation, make the first number equal to the current display
      // then call clear function to reset for the second number
      equation.firstNum = parseInt(display.innerText);
      clear();
      equation.operation = event.target.innerText;
    }
    // console.log(`operation is ${equation.operation}`);
  }
});

function equal() {
  let result;
  equation.secondNum = parseInt(display.innerText);

  // check which operation is being used then do the math
  if (equation.operation === "+") {
    result = equation.firstNum + equation.secondNum;
  } else if (equation.operation === "-") {
    result = equation.firstNum - equation.secondNum;
  } else if (equation.operation === "*") {
    result = equation.firstNum * equation.secondNum;
  } else if (equation.operation === "/") {
    result = equation.firstNum / equation.secondNum;
  } else {
    console.log("something is wrong with operation function or button");
  }
  // set display to the equations result
  display.innerText = result;

  // reset equation object for new equation
  equationComplete();
};

function equationComplete() {
  equation.operation = null;
  equation.firstNum = 0;
  equation.secondNum = 0;
};

// clear button
document.querySelector(".clear").addEventListener("click", clear);
// reusable clear function
function clear() {
  display.innerText = "0";
};

// delete button
document.querySelector(".back").addEventListener("click", function () {
  const text = display.innerText;
  display.innerText = display.innerText.substring(0, text.length - 1);

  // makes sure the display shows 0 if last number is deleted
  if (display.innerText === "") {
    display.innerText = "0";
  }
});
