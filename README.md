# Wordle Game

_Wordle_ is a game created by Welsh software engineer **Josh Wardle** released on October 2021. It was bought by the **New York Times Company** in 2022.

## Rules

- Player has six attempts to guess a five-letter word correctly
- Feedback is given by changing the letter background color:
- - Green: letter is in the correct position
- - Yellow: letter is correct but in the wrong position
- - Grey: wrong letter

## Description

This is the first project I did during my bootcamp at General Assembly. It is a simple Wordle Game where I used HTML, CSS and vanilla JS.

- The game starts when the player enter their guess and do their first attempt.
- A functions perform a check to see if the input matches some rules such as number of characters, spaces or numbers before letting the player submit their guess
- A for in loop iterates over the guess characters and compares each of them to the answer characters. It sets the text content and the guess appears on the browser individually inside each div
- The background color is added to each html element by comparing each index of the guess against the characters of the answer
![wordle](https://github.com/JPMurara/wordle/blob/main/images/Screenshot%202023-06-10%20110841.png)
- A win or game over message is displayed
-
