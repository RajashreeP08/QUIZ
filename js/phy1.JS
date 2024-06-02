const questions = [
   {
       question: "What is Mechanics?",
       answers: [
           { text: "Branch of science which deals with failure analysis", correct: false },
           { text: "Branch of science which deals with conditions of rest or motion of bodies", correct: true },
           { text: "Branch of science which deals with the study of bodies only under rest", correct: false },
           { text: "Branch of science which deals with the study of bodies only under motion", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "What is the net force of a kite that is held stationary in the sky?",
       answers: [
           { text: "1", correct: false },
           { text: "0", correct: false },
           { text: "Increasing", correct: true },
           { text: "Decreasing", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
       question: "Which is the type of inertia?",
       answers: [
           { text: "Inertia of rest", correct: false },
           { text: "Inertia of motion", correct: false },
           { text: "Inertia of direction", correct: false },
           { text: "All", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "What is the formula to find linear velocity?",
       answers: [
           { text: "Linear velocity = Mass * Velocity", correct: true },
           { text: "Linear velocity = 2(Mass + Velocity)", correct: false },
           { text: "Linear velocity = Mass / Velocity", correct: false },
           { text: "Linear velocity = Mass – Velocity", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which is the branch of physics that deals with the motion of a body by considering the cause?",
       answers: [
           { text: "Statics", correct: false },
           { text: "Dynamics", correct: true },
           { text: "Thermodynamics", correct: false },
           { text: "Astronomy", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "When an external force is not applied to the system, its total momentum___",
    answers: [
        { text: "Becomes zero", correct: false },
        { text: "Remains constant", correct: true },
        { text: "Increases gradually", correct: false },
        { text: "Decreases gradually", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Forces acting for a short duration are called ",
    answers: [
        { text: "Short force", correct: false },
        { text: "Interval force", correct: false },
        { text: "Impulsive forces", correct: true },
        { text: "Interrupting force", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "Apparent weight of a body = actual weight of the body, if the body",
    answers: [
        { text: "Moves with increasing velocity", correct: false },
        { text: "Remains at rest", correct: false },
        { text: "Remains in a state of uniform motion", correct: false },
        { text: "Option (b) and (c)", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "The inherent property, with which a body resists any change in its state of motion is known as",
    answers: [
        { text: "Inertia", correct: true },
        { text: "Force", correct: false },
        { text: "Momentum", correct: false },
        { text: "Acceleration", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "An aircraft executes a horizontal loop at a speed of 720 km/h with its wings banked at 15°. What is the radius of the loop?",
    answers: [
        { text: "23.567", correct: false },
        { text: "15", correct: true },
        { text: "12.781", correct: false },
        { text: "14", correct: false },
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

