document.addEventListener('DOMContentLoaded', function () {
  const productsSwiper = new Swiper('.products__swiper', {
    slidesPerView: 2,
    enabled: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  const reviewsSwiper = new Swiper('.reviews__swiper', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1450: {
        enabled: false
      }
    }
  });
});
