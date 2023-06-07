//https://gist.github.com/katharosada/ebb779cf90f26774e6ecf3f8eef4c317

const btnSubmit = document.getElementById("btn-submit");
const btnReset = document.getElementById("btn-reset");
const input = document.getElementById("input");
const row = document.querySelectorAll(".word");
const divs = document.querySelectorAll(".letter");
// let answer = validWords[Math.floor(Math.random() * validWords.length) + 1];
// console.log(answer);
let rowIndex = 0;
let attempsCount = 0;

function randomAnswer(validWords) {
  let answer = validWords[Math.floor(Math.random() * validWords.length) + 1];
  console.log(answer);
  return answer; //sends the answer value back to the caller
}
let answer = randomAnswer(validWords); //capture the return value (answer) when the fucntion is called and assings it to a variable, so we can use it thourghout the code

btnSubmit.addEventListener("click", isValidGuess);
btnReset.addEventListener("click", resetGame);

function isValidGuess() {
  if (input.value.includes(" ")) {
    //donest accept spaces in the input value
    console.log("Invalid entry. Can't include spaces");
  } else if (/\d/.test(input.value)) {
    //doesnt accept numbers in the input value
    console.log("Invalid entry. Can't include numbers");
  } else {
    submitGuess();
  }
}

function submitGuess() {
  const guess = Array.from(input.value.toUpperCase()); //upper case the guess to make the comparsion with the answer possible, creates an array with each of the guess variable letters
  if (guess.length === 5) {
    //check the min length. Doesn't let the player input less than 5 letters word
    //console.log(guess); //consoles an array with all the letter from the input
    for (const letterIndex in guess) {
      //iterates over the indexes of the guess array. The index is used to iterate over the children/divs and the guess array elements
      //console.log(letterIndex); //consoles the children(div) index from 0 to 4
      row[rowIndex].children[letterIndex].textContent = guess[letterIndex]; //each div text content is assigned to each of the guess array element(letter)
    }
    isValidAttempt(); //checks if the player still have attempts to go
    checkWord(guess); //calls the function to check each of the letters againts the answer array
  } else {
    console.log("The word has to have 5 letters"); //doesnt accepts words less than 5 letters
  }
  input.value = "";
  isWin(guess); //pass the input.value to the isWin function
}

function checkWord(array) {
  //the guess array is passed into this function as an argument
  const answerArr = Array.from(answer); //upper case the answer to make the comparsion with the guess possible, creates an array with each of the answer variable letters
  for (const letterIndex in answerArr) {
    if (answerArr[letterIndex] === array[letterIndex]) {
      //compares if the guess letters are in the correct position and applies the green class
      row[rowIndex].children[letterIndex].classList.add("green");
      answerArr[letterIndex] = " "; //replaces the matching letter with empty space so in the next loop, the yellow isn't applied to the same div letter as well
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

function isValidAttempt() {
  //checks if the player still have a valid attempt to play and calls the gameOver function
  attempsCount++;
  if (attempsCount === 6) {
    gameOver();
  }
}

function gameOver() {
  //display the game over message and disable the input and submit button
  console.log(`Game Over! Better luck next time, the word is: ${answer}`);
  input.disabled = true;
  btnSubmit.disabled = true;
}

function isWin(guess) {
  //checks if the guess matches with the answer, display a message and disable the input and button
  if (answer === guess.join("")) {
    console.log("Congratulations! You win the game!");
    input.disabled = true;
    btnSubmit.disabled = true;
  }
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
  location.reload(); //js method to reload the current URL(location)
}
