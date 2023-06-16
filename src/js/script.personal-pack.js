window.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.product__button');
  var container = document.querySelector('.product__group');
  var footer = document.querySelector('.footer');

  var containerRect = container.getBoundingClientRect();
  var buttonRect = button.getBoundingClientRect();

  var containerBottom = containerRect.top + containerRect.height;
  var buttonOffset = 20; // Отступ от нижней границы контейнера

  function adjustButtonPosition() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var windowBottom = scrollPosition + window.innerHeight;
    var footerRect = footer.getBoundingClientRect();
    var footerTop = footerRect.top;

    if (windowBottom >= containerBottom && windowBottom < footerTop) {
      button.style.position = 'absolute';
      button.style.bottom = buttonOffset + 'px';
    } else if (windowBottom >= footerTop) {
      button.style.position = 'absolute';
      button.style.bottom = footerTop - buttonRect.height - buttonOffset + 'px';
    } else {
      button.style.position = 'fixed';
      button.style.bottom = '20px'; // Задайте желаемое значение для отступа снизу
    }
  }

  window.addEventListener('load', adjustButtonPosition);
  window.addEventListener('resize', adjustButtonPosition);
  window.addEventListener('scroll', adjustButtonPosition);
});
