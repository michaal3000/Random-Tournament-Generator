const tournamentSett = document.getElementById("tournament-settings");

tournamentSett.addEventListener("submit", function (event) {
  event.preventDefault();
  const tournamentName = document.getElementById("tournament-name").value;
  const numPlayers = parseInt(document.getElementById("num-players").value);
  tournamentSett.classList.add("hidden");
  const tournament = document.getElementById("tournament");
  tournament.innerHTML = `<h2>${tournamentName}</h2>`;

  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    const playerInput = document.createElement("input");
    playerInput.setAttribute("type", "text");
    playerInput.setAttribute("id", `player-${i}`);
    playerInput.setAttribute("placeholder", `Player ${i + 1}`);
    players.push(playerInput);
    tournament.appendChild(playerInput);
  }

  const generateBracketBtn = document.createElement("button");
  generateBracketBtn.textContent = "Generate Bracket";
  generateBracketBtn.addEventListener("click", function () {
    const playerNames = players.map((input) => input.value);
    const randomizedBracket = createBracket(playerNames);
    displayBracket(tournament, randomizedBracket);
  });

  tournament.appendChild(generateBracketBtn);
});

function createBracket(playerNames) {
  const shuffledPlayers = shuffle(playerNames);
  const bracket = [];

  let i;
  for (i = 0; i < shuffledPlayers.length - 1; i += 2) {
    const match = {
      player1: shuffledPlayers[i],
      player2: shuffledPlayers[i + 1],
    };
    bracket.push(match);
  }

  if (shuffledPlayers.length % 2 !== 0) {
    bracket.push({ player1: shuffledPlayers[i], player2: "Nobody" });
  }

  return bracket;
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayBracket(container, bracket) {
  const bracketElement = document.createElement("div");
  bracketElement.setAttribute("id", "bracket");

  const tournamentName = document.getElementById("tournament-name").value;
  const tournamentTitle = document.createElement("h2");
  tournamentTitle.innerHTML = `${tournamentName}`;
  bracketElement.appendChild(tournamentTitle);

  bracket.forEach((match, i) => {
    const matchElement = document.createElement("div");
    matchElement.setAttribute("class", "match");
    matchElement.innerHTML = `<p class="match-title">Match ${i + 1}: ${
      match.player1
    } vs ${match.player2}</p>`;

    if (match.player1 !== "Nobody") {
      matchElement.innerHTML += `
        <label for="winner-${i}">${match.player1}</label>
        <input type="checkbox" id="winner-${i}" class="winner" data-match="${i}" data-player="${match.player1}">
      `;
    }

    if (match.player2 !== "Nobody") {
      matchElement.innerHTML += `
        <label for="winner-${i}-2">${match.player2}</label>
        <input type="checkbox" id="winner-${i}-2" class="winner" data-match="${i}" data-player="${match.player2}">
      `;
    }

    bracketElement.appendChild(matchElement);
  });

  function showWinnerModal(winner) {
    const winnerModal = document.createElement("div");
    winnerModal.classList.add("winner-modal");

    const winnerText = document.createElement("p");
    winnerText.textContent = `Winner: ${winner}`;
    winnerModal.appendChild(winnerText);

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = `<i class="fa fa-undo" aria-hidden="true"></i>`;
    closeButton.addEventListener("click", function () {
      document.body.removeChild(winnerModal);
      tournamentSett.classList.remove("hidden");
      container.innerHTML = "";
      startApp();
    });
    winnerModal.appendChild(closeButton);

    document.body.appendChild(winnerModal);
  }

  const nextRoundBtn = document.createElement("button");
  nextRoundBtn.textContent = "Generate Next Round";
  nextRoundBtn.addEventListener("click", function () {
    const winnerCheckboxes = Array.from(
      bracketElement.getElementsByClassName("winner")
    );
    const winners = [];

    winnerCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        winners.push(checkbox.dataset.player);
      }
    });

    if (winners.length > 1) {
      const nextRoundBracket = createBracket(winners);
      displayBracket(container, nextRoundBracket);
    } else if (winners.length === 1) {
      showWinnerModal(winners[0]);
    } else {
      alert("Please select at least one winner to proceed.");
    }
  });

  container.innerHTML = "";
  container.appendChild(bracketElement);
  container.appendChild(nextRoundBtn);
}

function startApp() {
  const container = document.getElementById("tournament-container");
  const startBtn = document.getElementById("start-tournament");
  startBtn.addEventListener("click", startApp());
}

startApp();

//Document
// This code listens for the submission of the form with the id "tournament-settings". When submitted, the function creates a tournament bracket based on the name of the tournament, the number of players, and the list of player names entered into the form. The code then generates a random bracket and displays it in the DOM. The user can then select winners for each match and generate the next round of the bracket or declare a winner if there is only one remaining.

// The code uses three functions: createBracket(), shuffle(), and displayBracket(). The createBracket() function takes an array of player names and returns an array of matches. The shuffle() function takes an array and returns the same array with the elements shuffled randomly. The displayBracket() function takes a container element and a bracket object and displays the bracket in the container element along with checkboxes for selecting winners.

// The startApp() function initializes the application by setting event listeners and starting the app. It gets the DOM elements needed and sets an event listener on the "start-tournament" button that when clicked, calls the startApp() function.
