const questions = [
   {
       question: " Which of the mentioned is the formula of Oleum?",
       answers: [
           { text: "H2S2O8", correct: false },
           { text: " H2S2O7", correct: true },
           { text: "H2S2O6", correct: false },
           { text: "H2S2O5", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which of the mentioned can be used as raw material to manufacture sulphuric acid?",
       answers: [
           { text: "Iron pyrites", correct: false },
           { text: "Elemental Sulphur", correct: false },
           { text: "Hydrogen Sulphide", correct: false },
           { text: "ALL", correct: true },
       ],
       difficulty: "Moderate"
   },
   {
       question: "Which of the mentioned are constituents of producer gas?",
       answers: [
           { text: "LPG", correct: false },
           { text: "H2, CH4, CO", correct: false },
           { text: "CO, H2", correct: false },
           { text: "CO, N2, H2", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "High purity oxygen in used in which of the mentioned cases?",
       answers: [
           { text: "Medical purposes", correct: true },
           { text: "Combustion", correct: false },
           { text: "Chemical reactions", correct: false },
           { text: "Oxidation processes", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "In the manufacture of Acetylene (C2H2) by Wulff Process, Which of the following methods is involved?",
       answers: [
           { text: "Heating of copper tube", correct: false },
           { text: "Pyrolsis of hydrocarbons", correct: true },
           { text: "Use of Calcium Carbide", correct: false },
           { text: "Reforming", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "Cryogenics deal with which of the following mentioned?",
    answers: [
        { text: "Production and utilization of low temperatures from 0 K to 273.15 K", correct: false },
        { text: "Production and utilization of low temperatures from 0 K to 123K", correct: true },
        { text: "Production and utilization of high temperatures from 273.15Kto 1000K", correct: false },
        { text: "Production and utilization of high temperatures from 273.15K to 500K", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Linde’s cycle uses which of the following effects?",
    answers: [
        { text: "Newton’s law of cooling", correct: false },
        { text: "Fouriers law", correct: false },
        { text: "Joule Thomson cooling", correct: true },
        { text: "Fick’s law", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "Ammonia manufactured by Haber’s process uses which of the mentioned as catalyst?",
    answers: [
        { text: "Zinc", correct: false },
        { text: "Titanium", correct: false },
        { text: "Molybdenum", correct: false },
        { text: "Iron", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "The three major components that are necessary in a fertilizer are?",
    answers: [
        { text: "N, P, K", correct: true },
        { text: "Na, K, S", correct: false },
        { text: "N, P, S", correct: false },
        { text: "N, Cl, K", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Which of the mentioned can be used as an explosive and a fertilizer?",
    answers: [
        { text: "Ammonium Carbamate", correct: false },
        { text: "Ammonium Nitrate", correct: true },
        { text: "Urea", correct: false },
        { text: "Ammonium Chloride", correct: false },
    ],
    difficulty: "Moderate"
},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeLeftElement = document.querySelector(".time-left");
const easyQuestionsElement = document.getElementById("easy-questions");
const moderateQuestionsElement = document.getElementById("moderate-questions");
const difficultQuestionsElement = document.getElementById("Hard-questions");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let selectedQuestions = [];

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   selectedQuestions = shuffle(questions).slice(0, 5);
   updateSidebar();
   showQuestion();
}

function showQuestion() {
   resetState();
   startTimer();
   let currentQuestion = selectedQuestions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = `${questionNo}. ${currentQuestion.question} <br> <small>Difficulty: ${currentQuestion.difficulty}</small>`;
   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if (answer.correct) {
           button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
   });
}

function resetState() {
   nextButton.style.display = "none";
   while (answerButtons.firstChild) {
       answerButtons.removeChild(answerButtons.firstChild);
   }
   stopTimer();
   timeLeft = 60;
   timeLeftElement.innerHTML = `Time Left: ${timeLeft}s`;
}

function selectAnswer(e) {
   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if (isCorrect) {
       selectedBtn.classList.add("correct");
       score++;
   } else {
       selectedBtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button => {
       if (button.dataset.correct === "true") {
           button.classList.add("correct");
       }
       button.disabled = true;
   });
   nextButton.style.display = "block";
   stopTimer();
}

function showScore() {
   resetState();
   questionElement.innerHTML = `You scored ${score} out of ${selectedQuestions.length}!`;
   nextButton.innerHTML = "Play Again";
   nextButton.style.display = "block";
}

function handleNextButton() {
   currentQuestionIndex++;
   if (currentQuestionIndex < selectedQuestions.length) {
       showQuestion();
   } else {
       showScore();
   }
}

nextButton.addEventListener("click", () => {
   if (currentQuestionIndex < selectedQuestions.length) {
       handleNextButton();
   } else {
       startQuiz();
   }
});

function startTimer() {
   timeLeftElement.innerHTML = `Time Left: ${timeLeft}s`;
   timer = setInterval(() => {
       timeLeft--;
       timeLeftElement.innerHTML = `Time Left: ${timeLeft}s`;
       if (timeLeft <= 0) {
           clearInterval(timer);
           handleNextButton();
       }
   }, 1000);
}

function stopTimer() {
   clearInterval(timer);
}

function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function updateSidebar() {
   easyQuestionsElement.innerHTML = "";
   moderateQuestionsElement.innerHTML = "";
   difficultQuestionsElement.innerHTML = "";

   selectedQuestions.forEach((question, index) => {
       const listItem = document.createElement("li");
       listItem.textContent = `Question ${index + 1}`;
       if (question.difficulty === "Easy") {
           easyQuestionsElement.appendChild(listItem);
       } else if (question.difficulty === "Moderate") {
           moderateQuestionsElement.appendChild(listItem);
       } else if (question.difficulty === "Hard") {
           difficultQuestionsElement.appendChild(listItem);
       }
   });
}

function openTab(evt, tabName) {
   const tabcontent = document.getElementsByClassName("tabcontent");
   for (let i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
   }

   const tablinks = document.getElementsByClassName("tablinks");
   for (let i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   document.getElementById(tabName).style.display = "block";
   evt.currentTarget.className += " active";
}

// Open the first tab by default
document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".tablinks").click();
});

startQuiz();

