document.addEventListener('DOMContentLoaded', () => {
  // * Poster slider

  const posterSlider = new Swiper('.poster__slider', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 50,
    navigation: {
      nextEl: '.poster__slider-btn-next',
      prevEl: '.poster__slider-btn-prev'
    }
  });
});
