document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    'What’s your first name?',
    'Do you smoke?',
    'What is your eating habits?',
    'How frequently do you consume alcoholic beverages?',
    'How frequently do you have cold/flu symptoms?',
    'Describe your stress level',
    'Have you ever been diagnosted with high blood glucose level?',
    'Tell us what you want to focus on',
    'What’s your email address?'
  ];

  let currentQuestionIndex = 0;

  function showNextQuestion() {
    const answerInput = document.getElementById('answer');
    const currentQuestion = questions[currentQuestionIndex];

    // Обработка ответа пользователя

    answerInput.value = ''; // Очистить поле ввода

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      document.querySelector('.quiz__left-questions').textContent = questions[currentQuestionIndex];
    } else {
      // Достигнут последний вопрос, выполните действия, которые вам нужны
      // после того, как пользователь ответит на все вопросы
    }
  }
});
