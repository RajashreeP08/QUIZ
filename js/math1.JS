
const questions = [
   {
      question: " Michael scores a 95, 87, 85, 93, and a 94 on his first 5 math tests. If he wants a 90 average, what must he score on the final math test?",
      answers: [
          { text: "84", correct: false },
          { text: "86", correct: true },
          { text: "90", correct: false },
          { text: "88", correct: false },
      ],
      difficulty: "Easy"
  },
  {
      question: "Beth and Sam are 500 miles apart. If Beth travels at 60mph and leaves her house at 1pm, what time will she arrive at Sam's house? ",
      answers: [
          { text: "9.30pm", correct: false },
          { text: "9.33pm", correct: false },
          { text: "9.20pm", correct: true },
          { text: "9.25pm", correct: false },
      ],
      difficulty: "Moderate"
  },
  {
      question: "Greg is trying to fill a 16 oz. bottle with water. If Greg fills the bottle at 1 oz per second and the bottle leaks .2 oz per second, how long would it take for Greg to fill the bottle?",
      answers: [
          { text: "24 s", correct: false },
          { text: "16 s", correct: false },
          { text: "22 s", correct: false },
          { text: "20 s", correct: true },
      ],
      difficulty: "Hard"
  },
  {
      question: "If David wants to drive to his friend's house, which is 450 miles away, in 6 hours, what is the average speed David has to drive at?",
      answers: [
          { text: "75mph", correct: true },
          { text: "80mph", correct: false },
          { text: "65mph", correct: false },
          { text: "60mph", correct: false },
      ],
      difficulty: "Easy"
  },
  {
      question: "If the sum of the smallest and largest of three consecutive even numbers is 28, what is the value of the second largest number in the series?",

      
      answers: [
          { text: "13", correct: false },
          { text: "14", correct: true },
          { text: "16", correct: false },
          { text: "12", correct: false },
      ],
      difficulty: "Moderate"
  }, 
  {
   question: "Barbara went to the store and bought a shirt for $88 dollars. It had been discounted by 20%. What is the original price of the shirt?",
   answers: [
       { text: "$100", correct: false },
       { text: "$110", correct: true },
       { text: "$108", correct: false },
       { text: "$70.40", correct: false },
   ],
   difficulty: "Easy"
},
{
   question: "The inlet pipe to a large water tank can fill the tank in 25 minutes; the drain of the tank can empty it in 55 minutes.Once, the drain was left open by mistake when the tank was being filled. The mistake was not caught until the tank was full. To the nearest tenth of a minute, how long did it take to fill the tank?",
   answers: [
       { text: "54.2 min", correct: false },
       { text: "34.2 min", correct: false },
       { text: "45.8 min", correct: true },
       { text: "75.8 min", correct: false },
   ],
   difficulty: "Moderate"
},
{
   question: "Two inlet pipes lead into a large water tank. One pipe can fill the tank in 45 minutes; the other can fill it in 40 minutes. To the nearest tenth of a minute, how long would it take the two pipes together to fill the tank if both were opened at the same time?",

   
   answers: [
       { text: "23.8 min", correct: false },
       { text: "25.0 min", correct: false },
       { text: "18.8 min", correct: false },
       { text: "21.2 min", correct: true },
   ],
   difficulty: "Hard"
},
{
   question: "450/15x(28-12)+32",
   answers: [
       { text: "512", correct: true },
       { text: "480", correct: false },
       { text: "492", correct: false },
       { text: "534", correct: false },
   ],
   difficulty: "Easy"
},
{
   question: "John and Julie represented West High in a math contest. John outscored Julie by 16 points; as a team, they scored 80 points.David and Dana represented East High in the same contest. Dana outscored David by 10 points; as a team, they scored 60 points.Arrange the four students from highest score to lowest score.",
   answers: [
       { text: "John, Julie, Dana, David", correct: false },
       { text: "John, Dana, Julie, David", correct: true },
       { text: "Dana, John, Julie, David", correct: false },
       { text: "Dana, John, David, Julie", correct: false },
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

