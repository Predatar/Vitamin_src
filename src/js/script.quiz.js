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
  nextAnswer.style.display = 'flex';
  nextAnswer.style.flexDirection = 'column';
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
//////////////////////////
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

// // New code for mobile view
// let quizMobContainer = document.createElement('div');
// quizMobContainer.className = 'quiz-mob';
// quizMobContainer.innerHTML = `
//   <div class="question-counter">1/9</div>
//   <form class="quiz__right-form">
//     ${document.getElementById('answer1').outerHTML}
//     ${document.getElementById('answer2').outerHTML}
//     ${document.getElementById('answer3').outerHTML}
//     ${document.getElementById('answer4').outerHTML}
//     ${document.getElementById('answer5').outerHTML}
//     ${document.getElementById('answer6').outerHTML}
//     ${document.getElementById('answer7').outerHTML}
//     ${document.getElementById('answer8').outerHTML}
//     ${document.getElementById('answer9').outerHTML}
//   </form>
// `;

// let quizContainer = document.querySelector('.quiz');
// quizContainer.style.display = 'none';

// let mainContainer = document.querySelector('.main__container');
// mainContainer.appendChild(quizMobContainer);
/////////////////////////

// const answerElementsMob = document.querySelectorAll('.answer-mob');
// function handleAnswerClickMob(event) {
//   const answersMob = document.querySelectorAll('.answer-mob');
//   answersMob.forEach(answer => answer.classList.remove('active'));

//   const selectedAnswerMob = event.target.closest('.answer-mob');
//   selectedAnswerMob.classList.add('active');
// }

// answerElementsMob.forEach(answer => {
//   answer.addEventListener('click', handleAnswerClickMob);
// });

// let currentQuestionMob = 1;

// function showNextQuestion() {
//   let currentAnswerMob = document.getElementById('answers' + currentQuestionMob);
//   currentAnswerMob.style.display = 'none';

//   let currentQuestionElementMob = document.getElementById('question' + currentQuestionMob);
//   currentQuestionElementMob.classList.remove('active');

//   currentQuestionMob++;
//   if (currentQuestionMob > 9) {
//     // Redirect user or perform other actions when all questions are answered
//     window.location.href = 'result.html';
//     return;
//   }

//   let nextQuestionMob = document.getElementById('question' + currentQuestionMob);
//   nextQuestionMob.classList.add('active');
//   let nextAnswerMob = document.getElementById('answers' + currentQuestionMob);
//   nextAnswerMob.style.display = 'block';
// }

// function showPreviousQuestion() {
//   if (currentQuestionMob <= 1) {
//     return;
//   }

//   let currentAnswerMob = document.getElementById('answers' + currentQuestionMob);
//   currentAnswerMob.style.display = 'none';

//   let currentQuestionElementMob = document.getElementById('question' + currentQuestionMob);
//   currentQuestionElementMob.classList.remove('active');

//   currentQuestionMob--;

//   let previousQuestionMob = document.getElementById('question' + currentQuestionMob);
//   previousQuestionMob.classList.add('active');
//   let previousAnswerMob = document.getElementById('answers' + currentQuestionMob);
//   previousAnswerMob.style.display = 'block';
// }

// let backButtonMob = document.querySelector('.quiz-mob__left-back');
// backButtonMob.addEventListener('click', showPreviousQuestion);
//////////////////////

// const questionElementsMob = document.querySelectorAll('.question-mob');

// function showNextQuestion(questionId) {
//   questionElementsMob.forEach(question => {
//     if (question.id === questionId) {
//       question.style.display = 'block';
//       question.classList.add('active');
//     } else {
//       question.style.display = 'none';
//       question.classList.remove('active');
//     }
//   });
// }

// function handleAnswerClickMob(event) {
//   const selectedAnswerMob = event.target.closest('.answer-mob');
//   const nextQuestionId = selectedAnswerMob.getAttribute('data-next-question');

//   const currentQuestion = selectedAnswerMob.closest('.question-mob');
//   currentQuestion.style.display = 'none';

//   showQuestion(nextQuestionId);
// }

// answerElementsMob.forEach(answer => {
//   answer.addEventListener('click', handleAnswerClickMob);
// });

// // Показываем первый вопрос при загрузке страницы
// showQuestion('mob-question1');
