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

let letterIndex = 0;
let rowIndex = 0;
let attempsCount = 0;

let answer = "WORDS";

btnSubmit.addEventListener("click", isValidGuess);
btnReset.addEventListener("click", resetGame);

function isValidGuess() {
  if (attempsCount >= 5) {
    console.log(`Game Over! Better luck next time, the word is: ${answer}`);
    attempsCount = 0;
  } else if (input.value.includes(" ")) {
    console.log("Invalid entry. Can't include spaces");
  } else if (/\d/.test(input.value)) {
    console.log("Invalid entry. Can't include numbers");
  } else {
    submitGuess();
  }
}
//make a function to take 2 arrays as parameters, one array with divs and another array wiht letter
//assign the content of each div to each of the letters
function submitGuess() {
  // if (attempsCount <= 5) {
  //checks if the player still have any attemps to go, otherwise it alerts game over
  const guess = Array.from(input.value.toUpperCase()); //upper case the guess to make the comparsion with the answer possible, creates an array with each of the guess variable letters
  if (guess.length === 5) {
    //checks if the user inputs the correct number of letter
    //console.log(guess); //consoles an array with all the letter from the input
    for (const letter of guess) {
      row[rowIndex].children[letterIndex].textContent = letter; //for each children of each row, assign the text content to each of the guess elements. Maybe put this in a loop???
      letterIndex++; //increments the index to iterate over the guess array
      input.value = "";
    }
    letterIndex = 0; //resets the index so we can start over in the next row
    rowIndex++; //increments the row number so we can jump into the new row after the loop for the letter is over in a specific row
    //calls the function to check each of the letters againts the answer array
    checkWord(guess);
  } else {
    console.log("The word has to have 5 letters"); //doesnt accepts words less than 5 letters
  }
  isWin(guess);
}
// else {
//   console.log(`Game Over! Better luck next time, the word is: ${answer}`);
//   attempsCount = 0;
// }
//}

//the function below was refactored
// function checkWord(array) {
//   //the guess array is passed into this function as an argument
//   const answerArr = answer.toUpperCase().split(""); //upper case the answer to make the comparsion with the guess possible, creates an array with each of the answer variable letters
//   for (let i = 0; i < answerArr.length; i++) {
//     //this loop increments the i variable so we can compare elements on both array at the same index
//     if (answerArr[i] === array[i]) {
//       //compares if the guess letters are in the correct position and applies the green class
//       row[attempsCount].children[i].classList.add("green");
//     } else if (answerArr.includes(array[i])) {
//       //if the guess includes any of the correct letters but not in the correct position, applies the class yellow. The previous condition doesnt affect this one. Once the previous condition is met, the code goes back into the begining of the loop to check the next index, so this else if is skipped
//       row[attempsCount].children[i].classList.add("yellow");
//     }
//   }
//   attempsCount++; //increments the attemps so we can apply classes to other rows as well
// }

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
    //this loop increments the i variable so we can compare elements on both array at the same index
    if (answerArr[i] === array[i]) {
      //compares if the guess letters are in the correct position and applies the green class
      row[attempsCount].children[i].classList.add("green");
      answerArr[i] = " ";
    }
  }
  for (let i = 0; i < answerArr.length; i++) {
    if (answerArr.includes(array[i])) {
      //if the guess includes any of the correct letters but not in the correct position, applies the class yellow. The previous condition doesnt affect this one. Once the previous condition is met, the code goes back into the begining of the loop to check the next index, so this else if is skipped
      row[attempsCount].children[i].classList.add("yellow");
    }
  }
  attempsCount++; //increments the attemps so we can apply classes to other rows as well
  return answerArr;
}

function resetGame() {
  attempsCount = 0;
  for (let div of divs) {
    div.classList.remove("green", "yellow");
    div.textContent = "";
  }
  input.disabled = false;
  btnSubmit.disabled = false;
  input.value = "";
}
