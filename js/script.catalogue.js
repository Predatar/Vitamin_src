// * Poster slider

const posterSlider = new Swiper('.poster__slider', {
  slidesPerView: 'auto',
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: '.poster__slider-btn-next',
    prevEl: '.poster__slider-btn-prev'
  },
  pagination: {
    el: '.poster__slider-pagination'
  },
  breakpoints: {
    1024: {
      spaceBetween: 50,
      centeredSlides: true
    }
  }
});

// * Vitamins

const vitaminsGroup = document.querySelector('.vitamins__group');
const vitaminsItemCollection = document.getElementsByClassName('vitamins__item');

const getTag = tag => {
  switch (tag) {
    case 'dietary':
      return 'Vitamins & Dietary Supplements';
    case 'minerals':
      return 'Minerals';
    case 'prenatal':
      return 'Prenatal Vitamins';
    case 'relief':
      return 'Pain Relief';
    case 'antioxidants':
      return 'Antioxidants';
    case 'loss':
      return 'Weight Loss';
    case 'probiotics':
      return 'Probiotics';
    default:
      break;
  }
};

const appendVitamins = (dataId, tag, imgName, name, price, sale) => {
  const vitaminsItem = document.createElement('a');
  vitaminsItem.classList.add('vitamins__item');
  vitaminsItem.setAttribute('data-id', dataId);
  vitaminsItem.setAttribute('data-filter', tag);
  vitaminsItem.href = 'product-card.html';

  if (sale) {
    vitaminsItem.setAttribute('data-sale', 'sale');
  }
  vitaminsItem.addEventListener('click', () => {
    sessionStorage.setItem('itemId', dataId);
  });

  const vitaminsImg = document.createElement('div');
  vitaminsImg.classList.add('vitamins__img', tag);
  vitaminsImg.innerHTML = `<picture><source srcset="img/vitamins/${imgName}.webp" type="image/webp"><img src="img/vitamins/${imgName}.png" alt="vitamin"></picture>`;

  const vitaminsInfo = document.createElement('div');
  vitaminsInfo.classList.add('vitamins__info');

  const vitaminsTag = document.createElement('div');
  vitaminsTag.classList.add('vitamins__tag', tag);
  vitaminsTag.innerHTML = getTag(tag);

  const vitaminsName = document.createElement('div');
  vitaminsName.classList.add('vitamins__name');
  vitaminsName.innerHTML = name;

  const vitaminsPrice = document.createElement('div');
  vitaminsPrice.classList.add('vitamins__price');

  const vitaminsPriceSpan = document.createElement('span');
  vitaminsPriceSpan.innerHTML = '$' + price;

  if (sale) {
    const vitaminsSale = document.createElement('span');
    let newPrice = price * ((100 - sale) / 100);
    vitaminsSale.innerHTML = '$' + newPrice.toFixed(2);
    vitaminsSale.style.color = '#D32D2C';
    vitaminsSale.style.marginLeft = '12px';

    vitaminsPriceSpan.style.textDecorationLine = 'line-through';

    vitaminsPrice.append(vitaminsPriceSpan);
    vitaminsPrice.append(vitaminsSale);
  } else {
    vitaminsPrice.append(vitaminsPriceSpan);
  }

  vitaminsInfo.append(vitaminsTag);
  vitaminsInfo.append(vitaminsName);
  vitaminsInfo.append(vitaminsPrice);

  vitaminsItem.append(vitaminsImg);
  vitaminsItem.append(vitaminsInfo);

  if (sale) {
    const vitaminSale = document.createElement('div');
    vitaminSale.classList.add('vitamins__sale');
    vitaminSale.innerHTML = '-' + sale + '%';

    vitaminsItem.append(vitaminSale);
  }

  vitaminsGroup.append(vitaminsItem);
};

(async function () {
  await fetch('https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/vitamins.json').then(response => {
    if (response.status == 200) {
      response.json().then(data => {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            appendVitamins(key, data[key].tag, data[key].imgName, data[key].name, data[key].price, data[key].sale);
          }
        }
      });
    } else {
      console.log(response.status);
    }
  });
})();

window.addEventListener('resize', e => {
  if (e.target.innerWidth < 550) {
    vitaminsGroup.style.height = '880px';
  }
  if (e.target.innerWidth < 360) {
    vitaminsGroup.style.height = vitaminsItemCollection[0].clientHeight * 4 + 45 + 'px';
  }
});
if (window.innerWidth < 550) {
  vitaminsGroup.style.height = '880px';
}
if (window.innerWidth < 360) {
  setTimeout(() => {
    vitaminsGroup.style.height = vitaminsItemCollection[0].clientHeight * 4 + 45 + 'px';
  }, 200);
}

// * Filter

const filter = document.querySelector('.filter');
const filterSelected = document.querySelector('.filter__selected');
const filterList = document.querySelector('.filter__list');
const filterListItem = document.querySelectorAll('.filter__list-item');

const addFilter = filter => {
  if (filter == '*') {
    for (let i = 0; i < vitaminsItemCollection.length; i++) {
      vitaminsItemCollection[i].classList.remove('vitamins__item_hide');
    }
  } else if (filter == 'sale') {
    for (let i = 0; i < vitaminsItemCollection.length; i++) {
      if (vitaminsItemCollection[i].getAttribute('data-sale') != filter) {
        vitaminsItemCollection[i].classList.add('vitamins__item_hide');
      } else {
        vitaminsItemCollection[i].classList.remove('vitamins__item_hide');
      }
    }
  } else {
    for (let i = 0; i < vitaminsItemCollection.length; i++) {
      if (vitaminsItemCollection[i].getAttribute('data-filter') != filter) {
        vitaminsItemCollection[i].classList.add('vitamins__item_hide');
      } else {
        vitaminsItemCollection[i].classList.remove('vitamins__item_hide');
      }
    }
  }
};

const toggleActiveClassForFilterList = index => {
  filterListItem.forEach(elem => {
    elem.classList.contains('filter__list-item_active') ? elem.classList.remove('filter__list-item_active') : null;
    filterListItem[index].classList.add('filter__list-item_active');
  });
  filterListItem[index].classList.add('filter__list-item_active');
  addFilter(filterListItem[index].getAttribute('data-filter'));
};

const switchSelecter = index => {
  filterSelected.childNodes[0].textContent = filterListItem[index].textContent;
};

filter.addEventListener('click', e => {
  filterList.classList.toggle('filter__list_show');
});

filterListItem.forEach((elem, index) => {
  elem.addEventListener('click', e => {
    toggleActiveClassForFilterList(index);
    switchSelecter(index);
  });
});

// * View more

const viewMoreBtn = document.querySelector('.vitamins__btn');

let viewMoreBtnHeight;

const toggleActiveClassForViewMoreBtn = () => {
  viewMoreBtn.classList.toggle('vitamins__btn_active');
  viewMoreBtn.classList.contains('vitamins__btn_active')
    ? (viewMoreBtn.childNodes[0].textContent = 'View less')
    : (viewMoreBtn.childNodes[0].textContent = 'View more');

  if (viewMoreBtn.classList.contains('vitamins__btn_active')) {
    viewMoreBtnHeight = vitaminsGroup.style.height;
    vitaminsGroup.style.height = vitaminsGroup.scrollHeight + 'px';
  } else {
    vitaminsGroup.style.height = viewMoreBtnHeight;
  }
};

viewMoreBtn.addEventListener('click', e => {
  toggleActiveClassForViewMoreBtn();
});

// * Reviews

const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 'auto',
  spaceBetween: 10,
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
