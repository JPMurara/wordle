//https://gist.github.com/katharosada/ebb779cf90f26774e6ecf3f8eef4c317
//Rules
// 6 attemps to guess a 5-letter word
// at each guess, a feedback is given by highlighting the letter
// green means the letter is correct and in the correct position
// yellow means the letter is correct but in the wrong position
// grey means the answer is wrong
const btnSubmit = document.getElementById("btn-submit");
const btnReset = document.getElementById("btn-reset");
const input = document.getElementById("input");
const row = document.querySelectorAll(".word");
const divs = document.querySelectorAll(".letter");

let rowIndex = 0;
let attempsCount = 0;

let answer = "WORDS";

btnSubmit.addEventListener("click", isValidGuess);
btnReset.addEventListener("click", resetGame);

function isValidGuess() {
  if (input.value.includes(" ")) {
    console.log("Invalid entry. Can't include spaces");
  } else if (/\d/.test(input.value)) {
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
      input.value = ""; //remove from here, put outside of the loop
    }
    isValidAttempt(); //checks if the player still have attempts to go
    checkWord(guess); //calls the function to check each of the letters againts the answer array
  } else {
    console.log("The word has to have 5 letters"); //doesnt accepts words less than 5 letters
  }
  isWin(guess); //pass the input.value here
}

function isValidAttempt() {
  attempsCount++; //increments the attemps
  if (attempsCount > 5) {
    gameOver();
  }
}

function gameOver() {
  console.log(`Game Over! Better luck next time, the word is: ${answer}`);
  input.disabled = true;
  btnSubmit.disabled = true;
}

function isWin(guess) {
  if (answer === guess.join("")) {
    console.log("Congratulations! You win the game!");
    input.disabled = true;
    btnSubmit.disabled = true;
    input.value = "";
  }
}

function checkWord(array) {
  //the guess array is passed into this function as an argument
  const answerArr = Array.from(answer); //upper case the answer to make the comparsion with the guess possible, creates an array with each of the answer variable letters
  for (let i = 0; i < answerArr.length; i++) {
    //can use in here as well
    //this loop increments the i variable so we can compare elements on both array at the same index
    if (answerArr[i] === array[i]) {
      //compares if the guess letters are in the correct position and applies the green class
      row[rowIndex].children[i].classList.add("green");
      answerArr[i] = " "; //explain this
    }
  }
  for (let i = 0; i < answerArr.length; i++) {
    //can use in here as well
    if (answerArr.includes(array[i])) {
      //if the guess includes any of the correct letters but not in the correct position, applies the class yellow. The previous condition doesnt affect this one. Once the previous condition is met, the code goes back into the begining of the loop to check the next index, so this else if is skipped
      row[rowIndex].children[i].classList.add("yellow");
    }
  }
  rowIndex++; //increments the row number so we can jump into the new row after the loop for the letter is over in a specific row. Works the same as using the attemptCount but I want to create another variable just to make the code more clear
  return answerArr;
}

function resetGame() {
  attempsCount = 0;
  rowIndex = 0;
  for (let div of divs) {
    div.classList.remove("green", "yellow");
    div.textContent = "";
  }
  input.disabled = false;
  btnSubmit.disabled = false;
  input.value = "";
  //resert the rowindex
}
