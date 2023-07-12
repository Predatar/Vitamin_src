document.addEventListener('DOMContentLoaded', function () {
  const productsSwiper = new Swiper('.products__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1800: {
        spaceBetween: 32
      },
      1024: {
        grabCursor: true
      },

      375: {
        spaceBetween: 10
      },
      370: {
        spaceBetween: 10
      },
      375: {
        spaceBetween: 10
      }
    }
  });

  const reviewsSlider = new Swiper('.reviews__slider', {
    slidesPerView: 'auto',
    spaceBetween: 32,
    breakpoints: {
      1024: {
        grabCursor: true,
        spaceBetween: 32
      },
      1440: {
        grabCursor: false
      }
    }
  });
});
