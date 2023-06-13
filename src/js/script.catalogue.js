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

  if (sale) {
    vitaminsItem.setAttribute('data-sale', 'sale');
  }

  vitaminsItem.href = '#';
  vitaminsItem.addEventListener('click', () => {
    localStorage.setItem('item-id', dataId);
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

// * Filter

const filterList = document.querySelectorAll('.filter__list-item');

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
  filterList.forEach(elem => {
    elem.classList.contains('filter__list-item_active') ? elem.classList.remove('filter__list-item_active') : null;
    filterList[index].classList.add('filter__list-item_active');
  });
  filterList[index].classList.add('filter__list-item_active');
  addFilter(filterList[index].getAttribute('data-filter'));
};

filterList.forEach((elem, index) => {
  elem.addEventListener('click', e => {
    toggleActiveClassForFilterList(index);
  });
});
