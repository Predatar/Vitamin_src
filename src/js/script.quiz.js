// const answerElements = document.querySelectorAll('.answer');
// function handleAnswerClick(event) {
//   const answers = document.querySelectorAll('.answer');
//   answers.forEach(answer => answer.classList.remove('active'));

//   const selectedAnswer = event.target.closest('.answer');
//   selectedAnswer.classList.add('active');
// }

// answerElements.forEach(answer => {
//   answer.addEventListener('click', handleAnswerClick);
// });

// let currentQuestion = 1;

// function showNextQuestion() {
//   let currentAnswer = document.getElementById('answer' + currentQuestion);
//   currentAnswer.style.display = 'none';

//   let currentQuestionElement = document.getElementById('question' + currentQuestion);
//   currentQuestionElement.classList.remove('active');

//   currentQuestion++;
//   if (currentQuestion > 9) {
//     // Redirect user or perform other actions when all questions are answered
//     window.location.href = 'result.html';
//     return;
//   }

//   let nextQuestion = document.getElementById('question' + currentQuestion);
//   nextQuestion.classList.add('active');
//   let nextAnswer = document.getElementById('answer' + currentQuestion);
//   nextAnswer.style.display = 'block';
// }

// function showPreviousQuestion() {
//   if (currentQuestion <= 1) {
//     return;
//   }

//   let currentAnswer = document.getElementById('answer' + currentQuestion);
//   currentAnswer.style.display = 'none';

//   let currentQuestionElement = document.getElementById('question' + currentQuestion);
//   currentQuestionElement.classList.remove('active');

//   currentQuestion--;

//   let previousQuestion = document.getElementById('question' + currentQuestion);
//   previousQuestion.classList.add('active');
//   let previousAnswer = document.getElementById('answer' + currentQuestion);
//   previousAnswer.style.display = 'block';
// }

// let backButton = document.querySelector('.quiz__left-back');
// backButton.addEventListener('click', showPreviousQuestion);

const answerElements = document.querySelectorAll('.answer');
function handleAnswerClick(event) {
  const answers = document.querySelectorAll('.answer');
  answers.forEach(answer => answer.classList.remove('active'));

  const selectedAnswer = event.target.closest('.answer');
  selectedAnswer.classList.add('active');
}

answerElements.forEach(answer => {
  answer.addEventListener('click', handleAnswerClick);
});

let currentQuestion = 1;

function showNextQuestion() {
  let currentAnswer = document.getElementById('answer' + currentQuestion);
  currentAnswer.style.display = 'none';

  let currentQuestionElement = document.getElementById('question' + currentQuestion);
  currentQuestionElement.classList.remove('active');

  currentQuestion++;
  if (currentQuestion > 9) {
    // Redirect user or perform other actions when all questions are answered
    window.location.href = 'result.html';
    return;
  }

  let nextQuestion = document.getElementById('question' + currentQuestion);
  nextQuestion.classList.add('active');
  let nextAnswer = document.getElementById('answer' + currentQuestion);
  nextAnswer.style.display = 'block';
}

function showPreviousQuestion() {
  if (currentQuestion <= 1) {
    return;
  }

  let currentAnswer = document.getElementById('answer' + currentQuestion);
  currentAnswer.style.display = 'none';

  let currentQuestionElement = document.getElementById('question' + currentQuestion);
  currentQuestionElement.classList.remove('active');

  currentQuestion--;

  let previousQuestion = document.getElementById('question' + currentQuestion);
  previousQuestion.classList.add('active');
  let previousAnswer = document.getElementById('answer' + currentQuestion);
  previousAnswer.style.display = 'block';
}

let backButton = document.querySelector('.quiz__left-back');
backButton.addEventListener('click', showPreviousQuestion);

// New code for mobile view
let quizMobContainer = document.createElement('div');
quizMobContainer.className = 'quiz-mob';
quizMobContainer.innerHTML = `
  <div class="question-counter">1/9</div>
  <form class="quiz__right-form">
    ${document.getElementById('answer1').outerHTML}
    ${document.getElementById('answer2').outerHTML}
    ${document.getElementById('answer3').outerHTML}
    ${document.getElementById('answer4').outerHTML}
    ${document.getElementById('answer5').outerHTML}
    ${document.getElementById('answer6').outerHTML}
    ${document.getElementById('answer7').outerHTML}
    ${document.getElementById('answer8').outerHTML}
    ${document.getElementById('answer9').outerHTML}
  </form>
`;

let quizContainer = document.querySelector('.quiz');
quizContainer.style.display = 'none';

let mainContainer = document.querySelector('.main__container');
mainContainer.appendChild(quizMobContainer);
