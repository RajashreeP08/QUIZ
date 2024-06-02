const questions = [
   {
       question: "Who developed Python Programming Language?",
       answers: [
           { text: "Wick van Rossum", correct: false },
           { text: "Guido van Rossum", correct: true },
           { text: "Rasmus Lerdorf", correct: false },
           { text: "Niene Stom", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which type of Programming does Python support?",
       answers: [
           { text: "object-oriented programming", correct: false },
           { text: "structured programming", correct: false },
           { text: "functional programming", correct: false },
           { text: "ALL", correct: true },
       ],
       difficulty: "Moderate"
   },
   {
       question: "Is Python code compiled or interpreted?",
       answers: [
           { text: "Python code is neither compiled nor interpreted", correct: false },
           { text: "Python code is only compiled", correct: false },
           { text: "Python code is only interpreted", correct: false },
           { text: "Python code is both compiled and interpreted", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "Is Python case sensitive when dealing with identifiers?",
       answers: [
           { text: "yes", correct: true },
           { text: "no", correct: false },
           { text: "machine dependent", correct: false },
           { text: "none", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which of the following is the correct extension of the Python file?",
       answers: [
           { text: ".python", correct: false },
           { text: ".py", correct: true },
           { text: ".pl", correct: false },
           { text: ".p", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "All keywords in Python are in ___",
    answers: [
        { text: "Capitalized", correct: false },
        { text: "lower case", correct: false },
        { text: "UPPER CASE", correct: false },
        { text: "none", correct: true },
    ],
    difficulty: "Easy"
},
{
    question: " What will be the value of the following Python expression? 4 + 3 % 5",
    answers: [
        { text: "4", correct: false },
        { text: "2", correct: false },
        { text: "7", correct: true },
        { text: "1", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "Which of the following is used to define a block of code in Python language?",
    answers: [
        { text: "Key", correct: false },
        { text: "Brackets", correct: false },
        { text: "def", correct: false },
        { text: "Indentation", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "Which keyword is used for function in Python language?",
    answers: [
        { text: "def", correct: true },
        { text: "function", correct: false },
        { text: "fun", correct: false },
        { text: "Define", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Which of the following character is used to give single-line comments in Python?",
    answers: [
        { text: "//", correct: false },
        { text: "#", correct: true },
        { text: "!", correct: false },
        { text: "/*", correct: false },
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

