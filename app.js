const wishToPlay = document.querySelector(".wish-to-play");
const gameSection = document.querySelector("#game");
const gameLevelButtons = document.querySelector("#game_levels");
const numInput = document.querySelector("#numInput");
const feedback = document.querySelector("#feedback");
const turns = document.querySelector("#turns");
const resultIcon = document.querySelector("#resultIcon");
const resultText = document.querySelector("#resultText");
const resultBanner = document.querySelector("#result");
const title = document.querySelector("#title");

const gameVariables = {
	level: null,
	randomNum: null,
	turns: 5,
};
function gameOver(winOrLose) {
	if (winOrLose) {
		resultIcon.innerText = "👌👏";
		resultText.innerHTML = `Congrats! You guessed right. The number was ${gameVariables.randomNum}`;
	} else {
		resultIcon.innerText = "🤦‍♂️";
		resultText.innerHTML = `No Luck Today! You Lose. The number was ${gameVariables.randomNum}`;
	}
	turns.classList.add("hidden");
	resultBanner.classList.remove("hidden");
	feedback.classList.add("hidden");

	gameVariables.level = null;
	gameVariables.turns = 5;
	gameVariables.randomNum = null;
	setTimeout(switchSections, 2000);
	setTimeout(() => {
		resultBanner.classList.add("hidden");
	}, 2000);
	setTimeout(() => {
		feedback.classList.remove("hidden");
	}, 2000);
	setTimeout(() => {
		turns.classList.remove("hidden");
	}, 2000);
}

gameLevelButtons.addEventListener("click", (e) => {
	if (e.path[0].id) {
		gameVariables.level = e.path[0].id;
	}
	switchSections();
	startTheGame();
	console.log(setRandNumber());
});
function setRandNumber() {
	switch (gameVariables.level) {
		case "level_easy":
			return (gameVariables.randomNum = Math.floor(Math.random() * 20) + 1);
		case "level_medium":
			return (gameVariables.randomNum = Math.floor(Math.random() * 30) + 1);
		case "level_hard":
			return (gameVariables.randomNum = Math.floor(Math.random() * 50) + 1);
	}
}
function switchSections() {
	if (gameVariables.level) {
		wishToPlay.classList = "hidden";
		gameSection.classList.remove("hidden");
	} else {
		wishToPlay.classList.remove("hidden");
		gameSection.classList = "hidden";
	}
	feedback.innerText = "";
}

function showGameLevel() {
	switch (gameVariables.level) {
		case "level_easy":
			return (title.innerText = "Guess a number between 1-20");
		case "level_medium":
			return (title.innerText = "Guess a number between 1-30");
		case "level_hard":
			return (title.innerText = "Guess a number between 1-50");
	}
}

numInput.addEventListener("change", (e) => {
	const guess = +e.target.value;

	if (guess === gameVariables.randomNum) {
		gameOver(true);
	} else {
		if (guess > gameVariables.randomNum) {
			feedback.innerText = "Oops!The number is lower";
		} else {
			feedback.innerText = "Oops!The number is higher";
		}
		gameVariables.turns = gameVariables.turns - 1;

		if (gameVariables.turns === 0) {
			gameOver(false);
		}
	}

	turns.innerHTML = `Remaining turns is <span> ${gameVariables.turns} </span>`;
	e.target.value = "";
});

function startTheGame() {
	showGameLevel();
	numInput.focus();
	turns.innerHTML = "You have 5 turns";
}
