const questions = [
   {
       question: "The name of the horizontal line in the cartesian plane which determines the position of a point is called:",
       answers: [
           { text: "origin", correct: false },
           { text: "X-axis", correct: true },
           { text: "Y-axis", correct: false },
           { text: "quadrant", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Direction ratio of line joining (2, 3, 4) and (−1, −2, 1), are:",
       answers: [
           { text: "(−3, 1, −3) ", correct: false },
           { text: "(−1, −5, −3)", correct: false },
           { text: " (−3, −5, −3)", correct: true },
           { text: " (−3, −5, 5)", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
       question: "The vector equation for the line passing through the points (–1, 0, 2) and (3, 4, 6) is:",
       answers: [
           { text: " i + 2k + λ(4i + 4j + 4k)", correct: false },
           { text: " i – 2k + λ(4i + 4j + 4k)", correct: false },
           { text: "-i+2k+ λ(4i – 4j – 4k) ", correct: false },
           { text: " -i+2k+ λ(4i + 4j + 4k)", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "If the coordinates of a point are (0, -4), then it lies in:",
       answers: [
           { text: " Y-axis", correct: true },
           { text: " X-axis", correct: false },
           { text: "At origin", correct: false },
           { text: "Between x-axis and y-axis", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "The direction cosines of the y-axis are",
       answers: [
           { text: " (9, 0, 0)", correct: false },
           { text: "(0, 1, 0)", correct: true },
           { text: "(1, 0, 0)", correct: false },
           { text: " (0, 0, 1)", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "Ordinate of all the points on the y-axis is",
    answers: [
        { text: "0", correct: false },
        { text: "Any number", correct: true },
        { text: "-1", correct: false },
        { text: "1", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "The lengthof a chord of a circle is 24cm.The diameter of the circle is 40cm.Find thr distance of chord from the center of the circle",
    answers: [
        { text: "12", correct: false },
        { text: "18", correct: false },
        { text: "16", correct: true },
        { text: "15", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "Find the equation of the plane passing through the points P(1, 1, 1), Q(3, -1, 2), R(-3, 5, -4).",
    answers: [
        { text: "x + 2y = 0", correct: false },
        { text: " x – y – 2 = 0", correct: false },
        { text: "-x + 2y – 2 = 0", correct: false },
        { text: " x + y – 2 = 0", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "Abscissa of a point is positive in",
    answers: [
        { text: " I and IV quadrants", correct: true },
        { text: "I quadrant", correct: false },
        { text: "I and II quadrant", correct: false },
        { text: " II quadrant only", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "The area of a regular polygon with a side 6 units is 96.If the perpendicular distance from the center to the side of the polygon is 4 units.Find the number of sides ",
    answers: [
        { text: "5", correct: false },
        { text: "8", correct: true },
        { text: "6", correct: false },
        { text: "7", correct: false },
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

