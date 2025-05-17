const choices = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" }
];

let playerScore = 0;
let computerScore = 0;

const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const playerChoiceDiv = document.getElementById('player-choice');
const computerChoiceDiv = document.getElementById('computer-choice');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

document.querySelectorAll('.choice').forEach(btn => {
  btn.addEventListener('click', () => {
    const playerChoice = btn.dataset.choice;
    playRound(playerChoice);
  });
});

resetBtn.addEventListener('click', resetGame);

function getComputerChoice() {
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx].name;
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  // Show choices
  displayChoices(playerChoice, computerChoice);

  // Determine winner
  let resultMessage = "";
  if (playerChoice === computerChoice) {
    resultMessage = "It's a draw!";
    messageDiv.style.color = "#888";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    resultMessage = "You win! 🎉";
    messageDiv.style.color = "#2ecc40";
  } else {
    computerScore++;
    resultMessage = "Computer wins! 🤖";
    messageDiv.style.color = "#ff006e";
  }

  updateScores();
  messageDiv.textContent = resultMessage;
  animateResult();
}

function displayChoices(player, computer) {
  playerChoiceDiv.innerHTML = getEmoji(player);
  computerChoiceDiv.innerHTML = getEmoji(computer);
}

function getEmoji(choiceName) {
  const found = choices.find(c => c.name === choiceName);
  return found ? found.emoji : "";
}

function updateScores() {
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  playerChoiceDiv.innerHTML = "";
  computerChoiceDiv.innerHTML = "";
  messageDiv.textContent = "";
  messageDiv.style.color = "#3a86ff";
}

// Animate the result icons for feedback
function animateResult() {
  [playerChoiceDiv, computerChoiceDiv].forEach(div => {
    div.classList.remove('animate');
    void div.offsetWidth; // trigger reflow
    div.classList.add('animate');
  });
}

// Add animation via JS-injected CSS
const style = document.createElement('style');
style.innerHTML = `
.result-icon.animate {
  animation: pop 0.4s cubic-bezier(.36,1.6,.4,1.01);
}
@keyframes pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
`;
document.head.appendChild(style);