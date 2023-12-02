// Wait for DOM content to load before starting the game

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if(this.getAttribute("data-type") === "submit" ) {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

})

/**
 * The main game loop, called when the script is first loaded
 * and after the user selects a play mode
 */
function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    switch (gameType) {
        case "addition":
            displayAdditionQuestion(num1, num2);
            break;
        case "subtract":
            displaySubtractQuestion(num1, num2);
            break;
        case "multiply":
            displayMultiplyQuestion(num1, num2);
            break;
        default:
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting.`;
    }


    // if (gameType === "addition") {
    //     displayAdditionQuestion(num1, num2);
    // } else {
    //     alert(`Unknown game type: ${gameType}`);
    //     throw `Unknown game type: ${gameType}. Aborting.`;
    // }

}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Right!");
        incrementScore();
    } else {
        alert(`Wrong... It's ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    switch (operator) {
        case "+":
            return [operand1 + operand2, "addition"];
            break;
        case "-":
            return [operand1 - operand2, "subtract"];
            break;
        case "x":
            return [operand1 * operand2, "multiply"];
            break;
        default:
            alert('unimplemented operator');
            throw 'Unimplemented operator';

    }

    // if (operator === "+") {
    //     return [operand1 + operand2, "addition"];
    // } else {
    //     alert('unimplemented operator');
    //     throw 'Unimplemented operator';
    // }
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
   // ++ before the variable to make sure it is first calculated, then the inner text is updated !!!
    document.getElementById('score').innerText = ++oldScore;

}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
     document.getElementById('incorrect').innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

