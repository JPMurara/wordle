//https://gist.github.com/katharosada/ebb779cf90f26774e6ecf3f8eef4c317

//getting HTML elements
const btnSubmit = document.getElementById("btn-submit");
const btnReset = document.getElementById("btn-reset");
const input = document.getElementById("input");
const row = document.querySelectorAll(".word");
const divs = document.querySelectorAll(".letter");
const messageInvalidEntry = document.querySelector("#message-invalid-entry");
const btnHideMessage = document.querySelectorAll(".btn-hide-message");
const messageGameOver = document.querySelector("#message-game-over");
const paragraphGameOverMessage = document.querySelector("#p-game-over");
const messageWin = document.querySelector("#message-win");

//variables that are used in functions
let rowIndex = 0;
let attempsCount = 0;

//generates a random answer: chooses a word from the validWords array by creating a random index
function randomAnswer(validWords) {
  let answer = validWords[Math.floor(Math.random() * validWords.length) + 1];
  console.log(answer); //consoles the answer so we can cheat!
  return answer; //sends the answer value back to the caller
}
let answer = randomAnswer(validWords); //capture the return value (answer) when the fucntion is called and assings it to a variable, so it can be used thourghout the code

//event listeners
btnSubmit.addEventListener("click", isValidGuess);
btnReset.addEventListener("click", resetGame);

for (const btn of btnHideMessage) {
  //adds the event listener to all the buttons
  btn.addEventListener("click", (e) => {
    //hides the dialog html tag by removing the attribute from the parent element of the button clicked using the close() function
    e.target.parentElement.close();
  });
}

function isValidGuess() {
  //checks if the guess is valid against some rules
  if (
    input.value.includes(" ") || //checks spaces
    /\d/.test(input.value) || //checks if input includes numbers
    input.value.length !== 5 //checks char numbers
  ) {
    messageInvalidEntry.show(); //set the open attribute to the dialog html element. Show message if criteria is not met
    input.value = "";
  } else {
    submitGuess(); //otherwise calls the submits the guess function
  }
}

function submitGuess() {
  const guess = Array.from(input.value.toUpperCase()); //upper case the guess to make the comparsion with the answer possible, creates an array with each of the guess variable letters
  for (const letterIndex in guess) {
    //iterates over the indexes of the guess array. The index is used to iterate over the children/divs and the guess array elements
    row[rowIndex].children[letterIndex].textContent = guess[letterIndex]; //each div text content is assigned to each of the guess array element(letter)
  }
  isValidAttempt(guess); //checks if the player still have attempts to go
  styleLetters(guess); //calls the function to check each of the letters againts the answer array
  input.value = "";
  isWin(guess); //pass the input.value to the isWin function
}

function isValidAttempt(guess) {
  //checks if the player still have a valid attempt to play and calls the gameOver function
  attempsCount++;
  if (attempsCount === 6 && answer !== guess.join("")) {
    //if the second condition isnt checked, both game over and win message are displayed if the player inputs a correct guess at the very last attempt
    gameOver();
  }
}

function styleLetters(array) {
  //the guess array is passed into this function as an argument. The function checks each of the letter and apply styles if condition is met
  const answerArr = Array.from(answer); //upper case the answer to make the comparsion with the guess possible, creates an array with each of the answer variable letters
  for (const letterIndex in answerArr) {
    if (answerArr[letterIndex] === array[letterIndex]) {
      //compares if the guess letter is in the correct position and applies the style class green
      row[rowIndex].children[letterIndex].classList.add("green");
      answerArr[letterIndex] = " "; //replaces the matching letter with empty space so in the next loop, the yellow class isn't applied to the same div
    }
  }
  for (const letterIndex in answerArr) {
    if (answerArr.includes(array[letterIndex])) {
      //if the guess includes any of the correct letters but not in the correct position, applies the class yellow.
      row[rowIndex].children[letterIndex].classList.add("yellow");
    }
  }
  rowIndex++; //increments the row number so we can jump into the new row after the loop for the letter is over in a specific row. Works the same as using the attemptCount but I want to create another variable just to make the code more clear
}

function isWin(guess) {
  //checks if the guess matches with the answer, display the wining message and disable the input and button
  if (answer === guess.join("")) {
    //concatenates the guess array and turns it into a string so it can be compared to the answer string. Since there is no separator in the join method, the guess array is cocatenated all together
    messageWin.show();
    input.disabled = true;
    btnSubmit.disabled = true;
  }
}

function gameOver() {
  //display the game over message and disable the input and submit button if the player exceeded the number of attempts
  paragraphGameOverMessage.innerHTML = `Better luck next time, the word is: ${answer}`;
  messageGameOver.show();
  input.disabled = true;
  btnSubmit.disabled = true;
}

function resetGame() {
  //reset the game, set variables back to its initial values, anable button and input, clear divs text content
  attempsCount = 0;
  rowIndex = 0;
  for (let div of divs) {
    div.classList.remove("green", "yellow");
    div.textContent = "";
  }
  input.disabled = false;
  btnSubmit.disabled = false;
  location.reload(); //method to reload the current URL(location), so js can run the random answer function. Otherwise the answer is the same as the previous game
}
