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
      540: {},
      370: {
        spaceBetween: 20
      }
    }
    // breakpoints: {
    //   1800: {
    //     slidesPerView: 2
    //   }
    // },
    // breakpoints: {
    //   540: {
    //     slidesPerView: 1,
    //     width: 335,
    //     height: 352,
    //     enabled: true
    //   }
    // }
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
