# Random-Tournament-Generator [Live Demo](https://tournament-generator-m3000.netlify.app/)

 This is a simple web application that allows you to generate brackets for any kind of tournament. It is written in HTML, CSS, and JavaScript.


Features

-Dynamic tournament settings

-Randomized player list

-Ability to generate multiple rounds

-Dynamic winner selection


Usage

1. Enter the tournament settings such as the tournament name and the number of players.

2. Input the names of the players.

3. Click "Generate Bracket" to generate the first round.

4. Check the winner checkbox for each match.

5. Click "Generate Next Round" to generate the next round.

6. Repeat steps 4 and 5 until there is only one winner.


Code
The application is written in JavaScript, using the DOM API to manipulate HTML elements.

The createBracket function shuffles the player list and creates an array of match objects, each containing two players.

The displayBracket function renders the bracket on the page, with checkboxes for selecting the winner of each match.

The showWinnerModal function creates a modal dialog to display the winner of the tournament.

The startApp function initializes the application by selecting the DOM elements and binding event listeners.

The main app logic is contained within the tournamentSett event listener, which listens for the form submission and generates the bracket when the "Generate Bracket" button is clicked, then generates the next round or displays the winner when subsequent rounds are generated.
