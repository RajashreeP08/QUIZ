const questions = [
   {
       question: "Laws of physics can be articulated based on _____ according to Einstein’s special theory of relativity",
       answers: [
           { text: "Quantum state", correct: false },
           { text: "Inertial frame of reference", correct: true },
           { text: " Non-inertial frame of reference", correct: false },
           { text: "None of these", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: " Which among the following frame of reference has four coordinates: x, y, z, and t?",
       answers: [
           { text: " 4-dimensional plane", correct: false },
           { text: " Inertial frame of reference", correct: false },
           { text: "Space-time reference", correct: true },
           { text: "Quantum frame of reference", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
       question: "What is the time interval between the ejection of photoelectrons and the incidence of photons?",
       answers: [
           { text: "Greater than 10^-6 s", correct: false },
           { text: " Between 10^-6 s and 10^-10 s", correct: false },
           { text: "10 second", correct: false },
           { text: " Less than 10^-9 s", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "To obtain mass-energy relation, the basic theorem used was ",
       answers: [
           { text: " Work-energy theorem", correct: true },
           { text: "Energy conservation theorem", correct: false },
           { text: "Maxwell theorem", correct: false },
           { text: " Heisenberg’s principle", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "What changes are observed during Einstein’s photoelectric experiment, when we increase the frequency of the incident radiation?",
       answers: [
           { text: "Saturation current value increases", correct: false },
           { text: "Stopping potential value increases", correct: true },
           { text: "Stopping potential value decreases", correct: false },
           { text: "No effect", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "Which of the following nature of light can help to understand the photoelectric emission phenomenon?",
    answers: [
        { text: " Quantum nature", correct: false },
        { text: " Particle nature of light", correct: true },
        { text: "Dual nature of light", correct: false },
        { text: "Wave nature of light", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Inside the Photoelectric cells, which of the following gases are filled?",
    answers: [
        { text: "HYDROGEN", correct: false },
        { text: "NITROGEN", correct: false },
        { text: "NEON", correct: true },
        { text: "HELIUM", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "vjh",
    answers: [
        { text: "a", correct: false },
        { text: "b", correct: false },
        { text: "c", correct: false },
        { text: "d", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: " The radiation strikes on which part of the photoelectric cell?",
    answers: [
        { text: "Cathode", correct: true },
        { text: "Voltmeter", correct: false },
        { text: "Anode", correct: false },
        { text: "NOT", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: " When a photon collides with an electron, what happens to its wavelength?",
    answers: [
        { text: "Decreases", correct: false },
        { text: "Increases", correct: true },
        { text: "Infinite", correct: false },
        { text: "NOT", correct: false },
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

