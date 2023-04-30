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
    let invalidMatch = false;

    for (let i = 0; i < winnerCheckboxes.length; i += 2) {
      const checkbox1 = winnerCheckboxes[i];
      const checkbox2 = winnerCheckboxes[i + 1];

      if (checkbox1 && checkbox2) {
        if (
          (checkbox1.checked && checkbox2.checked) ||
          (!checkbox1.checked && !checkbox2.checked)
        ) {
          invalidMatch = true;
          break;
        } else {
          winners.push(
            checkbox1.checked
              ? checkbox1.dataset.player
              : checkbox2.dataset.player
          );
        }
      } else if (checkbox1 && checkbox1.checked) {
        winners.push(checkbox1.dataset.player);
      } else if (checkbox2 && checkbox2.checked) {
        winners.push(checkbox2.dataset.player);
      } else {
        invalidMatch = true;
        break;
      }
    }

    if (invalidMatch) {
      alert("Please select exactly one winner for each match.");
    } else if (winners.length > 1) {
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
}

startApp();
