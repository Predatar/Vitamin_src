document.addEventListener('DOMContentLoaded', () => {
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
  var currentQuestion = 1;
  var totalQuestions = 9;

  function showNextQuestion() {
    var answer = '';

    // Проверяем, является ли текущий вопрос первым или последним
    if (currentQuestion === 1 || currentQuestion === totalQuestions) {
      answer = document.getElementById('answer').value;
      // Обработка ответа пользователя (вы можете сохранить ответ или выполнить нужные действия)
    }

    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      document.getElementById('question' + currentQuestion).style.display = 'block';

      // Проверяем, является ли текущий вопрос первым или последним
      if (currentQuestion === 1) {
        // Показываем поле для ввода текста только в первом вопросе
        document.getElementById('answer').style.display = 'block';
      } else if (currentQuestion === totalQuestions) {
        // Показываем поле для ввода текста только в последнем вопросе
        document.getElementById('answer').style.display = 'block';
      } else {
        // Скрываем поле для ввода текста в остальных вопросах
        document.getElementById('answer').style.display = 'none';
      }
    } else {
      // Все вопросы отображены, выполните нужные действия (например, отправьте данные формы)
      // и перенаправьте пользователя на другую страницу или выведите сообщение об успешном завершении
    }

    // Очищаем поле ввода
    document.getElementById('answer').value = '';
  }
});
