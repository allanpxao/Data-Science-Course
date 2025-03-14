let drawnNumberList = [];
let limitNumber = 1000;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextInScreen(tag, text) {
    let area = document.querySelector(tag);
    area.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function displayInitialMessage() {
    showTextInScreen('h1', 'Secret Number Game');
    showTextInScreen('p', 'Choose a number between 1 and 1000');
}

displayInitialMessage();

function checkGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        showTextInScreen('h1', 'You got it!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let attemptsMessage = `You found the secret number with ${attempts} ${attemptWord}!`;
        showTextInScreen('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            showTextInScreen('p', 'The secret number is less than');
        } else {
            showTextInScreen('p', 'The secret number is greater than');
        }
        attempts++;
        clearField();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let numberOfElementsInList = drawnNumberList.length;

    if (numberOfElementsInList == limitNumber) {
        drawnNumberList = [];
    }
    if (drawnNumberList.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        drawnNumberList.push(chosenNumber);
        console.log(drawnNumberList);
        return chosenNumber;
    }
}

function clearField() {
    let inputField = document.querySelector('input');
    inputField.value = ''; // Clears the input field
}

function restartGame() {
    secretNumber = generateRandomNumber();  // Generates a new secret number
    attempts = 1;  // Resets the attempts counter
    clearField();  // Clears the input field
    displayInitialMessage();  // Shows the initial message again
    document.getElementById('restart').setAttribute('disabled', true);  // Disables the restart button again
}

