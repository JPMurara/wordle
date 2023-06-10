# Wordle Game

_Wordle_ is a game created by Welsh software engineer **Josh Wardle** released on October 2021. It was bought by the **New York Times Company** in 2022.

Try my Wordle Game <a href="https://jpmurara.github.io/wordle/" target="_blank">here</a>

_Hint: if you get stuck, check the console for the answer_

## Rules

- Player has six attempts to guess a five-letter word correctly
- Feedback is given by changing the letter background color:
  - Green: letter is in the correct position
  - Yellow: letter is correct but in the wrong position
  - Grey: wrong letter

## Description

This is the first project I did during my bootcamp at General Assembly. It is a simple Wordle Game where I used HTML, CSS and vanilla JS.

- The game starts when the player enter their guess and do their first attempt by clicking the submit button.
- isValidGuess function performs a check to see if the input matches some rules such as the number of characters and if the guess contains space or number before letting the player submit their guess by calling submitGuess function
- The guess string is converted into an array so it is possible to use a for in loop to iterate over the guess characters/elements and compares each of them to the answer characters.
- submitGuess function sets the text content of each `<div>` accordingly to the guess array elements and calls other functions to check if the player still has attempts to go. It also calls the styleLetters functions that add styles to the `<div>` elements so the player has feedback on whether or not the letter is correct.
  ![wordle](https://github.com/JPMurara/wordle/blob/main/images/Screenshot%202023-06-10%20110841.png)
- If the player had already 6 attempts and still couldn't get the word correctly, the function gameOver() shows a HTML `<dialog>` with a game over message.
- Otherwise, the isWin function displays a message saying to the player that they won the game!
- On both scenarios the text input and submit button are disabled and the player has to click on the reset button to play again.

## Next steps and refactoring

I want to apply extra features to this project such as:

- Tracking game rounds
- Add time limit
- Set a theme for this Wordle game
- Use API to add sound effect to the game
- CSS effects and animations
