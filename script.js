
const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resetScreen = false;

function updateDisplay() {
    display.value = currentInput;
}

function calculate() {
    if (previousInput === null || operator === null) {
        return;
    }

    const first = Number(previousInput);
    const second = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                currentInput = "Cannot divide by zero";
                previousInput = null;
                operator = null;
                resetScreen = true;
                updateDisplay();
                return;
            }
            result = first / second;
            break;
    }

    currentInput = String(
        Number(result.toPrecision(12))
    );

    previousInput = null;
    operator = null;
    resetScreen = true;

    updateDisplay();
}

buttons.addEventListener("click", function (event) {
    const button = event.target;

    if (button.tagName !== "BUTTON") {
        return;
    }

    // Number and decimal buttons
    if (button.dataset.number !== undefined) {
        const number = button.dataset.number;

        if (resetScreen) {
            currentInput = number === "." ? "0." : number;
            resetScreen = false;
        } else if (number === ".") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
        } else {
            if (currentInput === "0") {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }

        updateDisplay();
        return;
    }

    // Operator buttons
    if (button.dataset.operator !== undefined) {
        if (operator !== null && !resetScreen) {
            calculate();
        }

        previousInput = currentInput;
        operator = button.dataset.operator;
        resetScreen = true;
        return;
    }

    // Clear button
    if (button.dataset.action === "clear") {
        currentInput = "0";
        previousInput = null;
        operator = null;
        resetScreen = false;
        updateDisplay();
    }

    // Delete last digit
    if (button.dataset.action === "delete") {
        if (resetScreen) {
            currentInput = "0";
            resetScreen = false;
        } else if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = "0";
        }

        updateDisplay();
    }

    // Equals button
    if (button.dataset.action === "calculate") {
        calculate();
    }
});

updateDisplay();
