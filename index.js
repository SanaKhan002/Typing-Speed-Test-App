const passages = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "Every cloud has a silver lining.",
        "An apple a day keeps the doctor away.",
        "Actions speak louder than words.",
        "A picture is worth a thousand words.",
        "Beauty is in the eye of the beholder.",
        "Don't count your chickens before they hatch.",
        "The early bird catches the worm."
    ],
    medium: [
        "In the middle of every difficulty lies opportunity.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "You miss 100% of the shots you don’t take.",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "Believe you can and you’re halfway there.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Do not wait to strike till the iron is hot, but make it hot by striking.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Your time is limited, so don’t waste it living someone else’s life."
    ],
    hard: [
        "Life is either a daring adventure or nothing at all.",
        "What we fear doing most is usually what we most need to do.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "In three words I can sum up everything I've learned about life: it goes on.",
        "You cannot swim for new horizons until you have courage to lose sight of the shore.",
        "The only impossible journey is the one you never begin.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Opportunities don't happen, you create them.",
        "Life is really simple, but we insist on making it complicated.",
        "The purpose of our lives is to be happy."
    ]
};

let selectedPassage = "";
let startTime, endTime;

const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const difficultySelect = document.getElementById("difficulty");
const passageDisplay = document.getElementById("passage");
const userInput = document.getElementById("user-input");
const resultsSection = document.getElementById("results");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

startButton.addEventListener("click", () => {
    const difficulty = difficultySelect.value;
    const passagesList = passages[difficulty];
    const randomIndex = Math.floor(Math.random() * passagesList.length);
    selectedPassage = passagesList[randomIndex];

    passageDisplay.textContent = selectedPassage;
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();
    submitButton.disabled = false;
    resultsSection.style.display = "none";

    startTime = new Date();
});

submitButton.addEventListener("click", () => {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const typedText = userInput.value;

    const wordsTyped = typedText.split(" ").length;
    const speed = Math.round((wordsTyped / timeTaken) * 60);
    
    let correctCount = 0;
    let mistakes = [];
    const passageWords = selectedPassage.split(" ");

    typedText.split(" ").forEach((word, index) => {
        if (word === passageWords[index]) {
            correctCount++;
        } else {
            mistakes.push(`"${word}" (should be "${passageWords[index]}")`);
        }
    });

    const accuracy = Math.round((correctCount / passageWords.length) * 100);

    speedDisplay.textContent = `Speed: ${speed} WPM`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    
    if (mistakes.length > 0) {
        mistakesDisplay.innerHTML = `Mistakes: <span class="red">${mistakes.join(", ")}</span>`;
    } else {
        mistakesDisplay.innerHTML = `Mistakes: <span class="green">None!</span>`;
    }
    
    mistakesDisplay.classList.remove("hidden");
    resultsSection.style.display = "block";
    userInput.disabled = true;
    submitButton.disabled = true;
});
