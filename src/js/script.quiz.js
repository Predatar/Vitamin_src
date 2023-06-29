let currentQuestion = 1;

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

function showNextQuestion() {
  let currentAnswer = document.getElementById('answer' + currentQuestion);
  currentAnswer.style.display = 'none';

  let currentQuestionElement = document.getElementById('question' + currentQuestion);
  currentQuestionElement.classList.remove('active');

  currentQuestion++;
  if (currentQuestion > 9) {
    // Redirect user or perform other actions when all questions are answered
    window.location.href = 'catalogue.html';
    return;
  }

  let nextQuestion = document.getElementById('question' + currentQuestion);
  nextQuestion.classList.add('active');
  let nextAnswer = document.getElementById('answer' + currentQuestion);
  nextAnswer.style.display = 'flex';
  nextAnswer.style.flexDirection = 'column';

  nextQuestionCounter();
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

  nextQuestionCounter();
}

let backButton = document.querySelector('.quiz__left-back');
backButton.addEventListener('click', showPreviousQuestion);

const questions = document.querySelectorAll('.question');

const totalQuestions = questions.length;

const questionCounter = document.querySelector('.question-counter');

function nextQuestionCounter() {
  questionCounter.textContent = `${currentQuestion}/${totalQuestions}`;

  if (currentQuestion > totalQuestions) {
    questionCounter.style.display = 'none';
  }
}

nextQuestionCounter();
/////////////
