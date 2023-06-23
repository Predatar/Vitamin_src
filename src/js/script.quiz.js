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

// document.addEventListener('DOMContentLoaded', () => {
//   let currentQuestion = 1;
//   const totalQuestions = 9;

//   function showNextQuestion() {
//     const currentQuestionElement = document.getElementById('question' + currentQuestion);
//     const currentAnswerElement = document.getElementById('answer' + currentQuestion);
//     currentQuestionElement.classList.remove('active');
//     currentAnswerElement.classList.remove('active');
//     currentQuestion++;

//     if (currentQuestion <= totalQuestions) {
//       const nextQuestionElement = document.getElementById('question' + currentQuestion);
//       const nextAnswerElement = document.getElementById('answer' + currentQuestion);
//       nextQuestionElement.classList.add('active');
//       nextAnswerElement.classList.add('active');
//       nextAnswerElement.style.display = 'block';
//       currentAnswerElement.style.display = 'none';
//     } else {
//       // Все вопросы отображены, выполните нужные действия
//     }
//   }

//   function showNextAnswer() {
//     const currentAnswerElement = document.getElementById('answer' + currentQuestion);
//     currentAnswerElement.classList.remove('active');
//     currentQuestion++;

//     if (currentQuestion <= totalQuestions) {
//       const nextAnswerElement = document.getElementById('answer' + currentQuestion);
//       nextAnswerElement.classList.add('active');
//     } else {
//       // Все варианты ответов отображены
//     }
//   }

//   function showPreviousQuestion() {
//     const currentQuestionElement = document.getElementById('question' + currentQuestion);
//     const currentAnswerElement = document.getElementById('answer' + currentQuestion);
//     currentQuestionElement.classList.remove('active');
//     currentAnswerElement.classList.remove('active');
//     currentQuestion--;

//     if (currentQuestion >= 1) {
//       const previousQuestionElement = document.getElementById('question' + currentQuestion);
//       const previousAnswerElement = document.getElementById('answer' + currentQuestion);
//       previousQuestionElement.classList.add('active');
//       previousAnswerElement.classList.add('active');
//       previousAnswerElement.style.display = 'block';
//       currentAnswerElement.style.display = 'none';
//     } else {
//       // Это первый вопрос
//     }
//   }

//   document.getElementById('btnNextQuestion').addEventListener('click', showNextQuestion);
//   document.getElementById('btnPrevQuestion').addEventListener('click', showPreviousQuestion);
//   document.getElementById('btnNextAnswer').addEventListener('click', showNextAnswer);
// });

// const questions = [
//   'What’s your first name?',
//   'Do you smoke?',
//   'What is your eating habits?',
//   'How frequently do you consume alcoholic beverages?',
//   'How frequently do you have cold/flu symptoms?',
//   'Describe your stress level',
//   'Have you ever been diagnosted with high blood glucose level?',
//   'Tell us what you want to focus on',
//   'What’s your email address?'
// ];

// let currentQuestionIndex = 0;

// function showNextQuestion() {
//   const answerInput = document.getElementById('answer');
//   const currentQuestion = questions[currentQuestionIndex];

//   // Обработка ответа пользователя

//   answerInput.value = ''; // Очистить поле ввода

//   if (currentQuestionIndex < questions.length - 1) {
//     currentQuestionIndex++;
//     document.querySelector('.quiz__left-questions').textContent = questions[currentQuestionIndex];
//   } else {
//     // Достигнут последний вопрос, выполните действия, которые вам нужны
//     // после того, как пользователь ответит на все вопросы
//   }
// }
