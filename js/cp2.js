const questions = [
   {
       question: " Who invented Java Programming?",
       answers: [
           { text: "Guido van Rossum", correct: false },
           { text: "James Gosling", correct: true },
           { text: "Dennis Ritchie", correct: false },
           { text: "Bjarne Stroustrup", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which statement is true about Java?",
       answers: [
           { text: "Java is a sequence-dependent programming language", correct: false },
           { text: "Java is a code dependent programming language", correct: false },
           { text: "Java is a platform-independent programming language", correct: true },
           { text: "Java is a platform-dependent programming language", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
       question: "Which component is used to compile, debug and execute the java programs?",
       answers: [
           { text: "JRE", correct: false },
           { text: "JIT", correct: false },
           { text: "JVM", correct: false },
           { text: "JDK", correct: true },
       ],
       difficulty: "Hard"
   },
   {
       question: "Which one of the following is not a Java feature?",
       answers: [
           { text: "Use of pointers", correct: true },
           { text: "Object-oriented", correct: false },
           { text: "Portable", correct: false },
           { text: "Dynamic and Extensible", correct: false },
       ],
       difficulty: "Easy"
   },
   {
       question: "Which of these cannot be used for a variable name in Java?",
       answers: [
           { text: "identifier & keyword", correct: false },
           { text: "keyword", correct: true },
           { text: "identifier", correct: false },
           { text: "NOT", correct: false },
       ],
       difficulty: "Moderate"
   },
   {
    question: "What is the extension of java code files?",
    answers: [
        { text: ".js", correct: false },
        { text: ".java", correct: true },
        { text: ".class", correct: false },
        { text: ".txt", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: " Which environment variable is used to set the java path?",
    answers: [
        { text: "MAVEN_Path", correct: false },
        { text: "JavaPATH", correct: false },
        { text: "JAVA_HOME", correct: true },
        { text: "JAVA", correct: false },
    ],
    difficulty: "Moderate"
},
{
    question: "Which of the following is not an OOPS concept in Java?",
    answers: [
        { text: "Polymorphism", correct: false },
        { text: "Inheritance", correct: false },
        { text: "Encapsulation", correct: false },
        { text: "Compilation", correct: true },
    ],
    difficulty: "Hard"
},
{
    question: "What is not the use of “this” keyword in Java?",
    answers: [
        { text: "Passing itself to the method of the same class", correct: true },
        { text: "Referring to the instance variable when a local variable has the same name", correct: false },
        { text: "Passing itself to another method", correct: false },
        { text: "Calling another constructor in constructor chaining", correct: false },
    ],
    difficulty: "Easy"
},
{
    question: "Which of the following is a type of polymorphism in Java Programming?",
    answers: [
        { text: "Multiple polymorphism", correct: false },
        { text: "Compile time polymorphism", correct: true },
        { text: "Multilevel polymorphism", correct: false },
        { text: "Execution time polymorphism", correct: false },
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


 