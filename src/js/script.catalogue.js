// * Poster slider

const posterSlider = new Swiper('.poster__slider', {
  slidesPerView: 'auto',
  loop: true,
  spaceBetween: 50,
  centeredSlides: true,
  navigation: {
    nextEl: '.poster__slider-btn-next',
    prevEl: '.poster__slider-btn-prev'
  }
});

// * Aside

const filterList = document.querySelectorAll('.filter__list-item');

const toggleActiveClassForFilterList = index => {
  filterList.forEach(elem => {
    elem.classList.contains('filter__list-item_active') ? elem.classList.remove('filter__list-item_active') : null;
    filterList[index].classList.add('filter__list-item_active');
  });
  filterList[index].classList.add('filter__list-item_active');
};

filterList.forEach((elem, index) => {
  elem.addEventListener('click', e => {
    toggleActiveClassForFilterList(index);
  });
});
