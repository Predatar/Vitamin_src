document.addEventListener('DOMContentLoaded', function () {
  const productsSwiper = new Swiper('.products__swiper', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
  productsSwiper.init();
  reviewsSwiper.init();
});
