const questions = [
   {
       question: "Which of the following is the simplest member of organic compounds?",
       answers: [
           { text: " Formic acid", correct: false },
           { text: " Methane", correct: true },
           { text: "Formaldehyde", correct: false },
           { text: "Methanol", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Hydrocarbons are organic compounds with element __________",
       answers: [
           { text: " Carbon", correct: false },
           { text: "Hydrogen", correct: false },
           { text: "Both hydrogen and carbon", correct: true },
           { text: "Oxygen", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
       question: "Which of the following is yielded when Ethylene glycol is treated with phosphorus tri-iodide?",
       answers: [
           { text: "ethylene", correct: false },
           { text: "ethane", correct: false },
           { text: "ethyl iodide", correct: false },
           { text: "ethylene di-iodide", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "Which of the following bond is made up of a large number of organic compounds?",
       answers: [
           { text: "Covalent bond", correct: true },
           { text: "Ionic bond", correct: false },
           { text: "Dipolar bond", correct: false },
           { text: "Metallic bond", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which of the following is a classification of Organic compounds?",
       answers: [
           { text: "Cyclic compounds and alicyclic compounds", correct: false },
           { text: "alicyclic compounds and acyclic compounds", correct: true },
           { text: "Open chain compounds and acyclic compounds", correct: false },
           { text: "Open chain compounds and linear chain compounds", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "Which of the following is not a class of organic compounds?",
    answers: [
        { text: "Amides", correct: false },
        { text: "Electro compounds", correct: true },
        { text: "Nitro compound", correct: false },
        { text: "Carbonyl compound", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Organic compounds can be classified even based upon the function groups. Which of the following is not a functional group?",
    answers: [
        { text: "Isocyano", correct: false },
        { text: "Carbonyl", correct: false },
        { text: "Isocyanide", correct: true },
        { text: "Carboxyl", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: " Which of the following does not come under the organic addition reaction?",
    answers: [
        { text: "Halogenation", correct: false },
        { text: "Hydrohalogenation", correct: false },
        { text: "Hydration", correct: false },
        { text: "Dehydration", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "Which of the following statement is not true about ethers?",
    answers: [
        { text: "Ethers are not organic solvents", correct: true },
        { text: "Lower ethers also act as anaesthetics", correct: false },
        { text: "Simple ethers (such as diethyl ether) are tasteless", correct: false },
        { text: "The lower ethers are highly volatile and flammable", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Which of the following is true about transesterification?",
    answers: [
        { text: "exchanging the organic alkyl group of alcohol with the organic group alkyl of an ester", correct: false },
        { text: "exchanging the organic alkyl group of an ester with the organic group alkyl of an alcohol", correct: true },
        { text: "exchanging the organic alkyl group of an ester with the organic group alkyl of an ether", correct: false },
        { text: "exchanging the organic alkyl group of an ester with the organic group alkyl of an alkane", correct: false },
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

