const headerCart = document.querySelector('.header__cart');
const cartBackDoor = document.querySelector('.backdoor');
const cart = document.querySelector('.cart');
const cartCloseBtn = document.querySelector('.cart__heading svg');

const cartFooter = document.querySelector('.cart__footer');
const cartBtn = document.querySelector('.cart__btn');
const cartEmpty = document.querySelector('.cart__empty');
const cartInfo = document.querySelector('.cart__info');

const addActiveClassForCartBackDoor = () => {
  document.body.style.overflow = 'hidden';
  cartBackDoor.classList.add('backdoor_show');
  setTimeout(() => {
    cart.classList.add('cart_show');
  }, 100);
};
const removeActiveClassForCartBackDoor = () => {
  document.body.style.overflow = 'auto';
  cart.classList.remove('cart_show');
  setTimeout(() => {
    cartBackDoor.classList.remove('backdoor_show');
  }, 100);
};

headerCart.addEventListener('click', e => {
  addActiveClassForCartBackDoor();
});
cartCloseBtn.addEventListener('click', e => {
  removeActiveClassForCartBackDoor();
});
cartBackDoor.addEventListener('click', e => {
  if (e.target.classList.contains('backdoor')) {
    removeActiveClassForCartBackDoor();
  }
});

// * Refresh cart__list

const cartList = document.querySelector('.cart__list');
const cartListItem = document.getElementsByClassName('cart__item');

const disableMinus = count => (count == 1 ? 'cart__minus_disable' : null);
const setDelivery = delivery => {
  switch (delivery) {
    case '30':
      return `<div class="cart__select">
      <div class="cart__selected">${delivery} <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 0.975838L9.02886 5.59011e-07L5 4.04832L0.971145 4.34387e-07L-2.19613e-07 0.975838L5 6L10 0.975838Z"
            fill="black" />
        </svg>
      </div>
      <div class="cart__select-list">
        <div class="cart__select-item cart__select-item_active">30</div>
        <div class="cart__select-item">40</div>
        <div class="cart__select-item">60</div>
      </div>
    </div>`;

    case '40':
      return `<div class="cart__select">
      <div class="cart__selected">${delivery} <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 0.975838L9.02886 5.59011e-07L5 4.04832L0.971145 4.34387e-07L-2.19613e-07 0.975838L5 6L10 0.975838Z"
            fill="black" />
        </svg>
      </div>
      <div class="cart__select-list">
      <div class="cart__select-item">30</div>
      <div class="cart__select-item cart__select-item_active">40</div>
        <div class="cart__select-item">60</div>
      </div>
    </div>`;

    case '60':
      return `<div class="cart__select">
      <div class="cart__selected">${delivery} <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 0.975838L9.02886 5.59011e-07L5 4.04832L0.971145 4.34387e-07L-2.19613e-07 0.975838L5 6L10 0.975838Z"
            fill="black" />
        </svg>
      </div>
      <div class="cart__select-list">
        <div class="cart__select-item">30</div>
        <div class="cart__select-item">40</div>
        <div class="cart__select-item cart__select-item_active">60</div>
      </div>
    </div>`;

    default:
      return `<div class="cart__select">
      <div class="cart__selected">30 <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 0.975838L9.02886 5.59011e-07L5 4.04832L0.971145 4.34387e-07L-2.19613e-07 0.975838L5 6L10 0.975838Z"
            fill="black" />
        </svg>
      </div>
      <div class="cart__select-list">
        <div class="cart__select-item cart__select-item_active">30</div>
        <div class="cart__select-item">40</div>
        <div class="cart__select-item">60</div>
      </div>
    </div>`;
  }
};
const setCheck = delivery => {
  if (delivery) {
    return `<label class="cart__check">
    <input type="checkbox" checked class="cart__checkbox">
    <span class="cart__checkmark"></span>
  </label>`;
  } else {
    return `<label class="cart__check">
    <input type="checkbox" class="cart__checkbox">
    <span class="cart__checkmark"></span>
  </label>`;
  }
};

const createElement = (elem, index) => {
  const img = document.createElement('div');
  img.classList.add('cart__img', elem.tag);
  img.innerHTML = `<picture><source srcset="img/vitamins/${elem.imgName}.webp" type="image/webp"><img src="img/vitamins/${elem.imgName}.png" alt="vitamin"></picture>`;

  const container = document.createElement('div');
  container.classList.add('cart__item-container');

  const wrapper1 = document.createElement('div');
  wrapper1.classList.add('cart__item-wrapper1');

  const name = document.createElement('div');
  name.classList.add('cart__name');
  name.innerHTML = elem.name;

  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('cart__delete');
  deleteBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 13L13 0.999998" stroke="#C7C7C7" stroke-width="2" />
  <path d="M13 13L1 0.999999" stroke="#C7C7C7" stroke-width="2" />
  </svg>`;
  deleteBtn.addEventListener('click', () => {
    const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));
    vitamins.splice(deleteBtn.parentNode.parentNode.parentNode.getAttribute('data-id'), 1);
    sessionStorage.setItem('vitamins', JSON.stringify(vitamins));
    deleteBtn.parentNode.parentNode.parentNode.remove();
    refreshCartList();
  });

  const wrapper2 = document.createElement('div');
  wrapper2.classList.add('cart__item-wrapper2');

  const counter = document.createElement('div');
  counter.classList.add('cart__counter');

  const minus = document.createElement('div');
  minus.classList.add('cart__minus');
  minus.setAttribute('data-id', index);
  if (elem.count == 1) {
    minus.classList.add('cart__minus_disable');
  }
  minus.innerHTML = `<svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="8" height="2" fill="black" />
  </svg>`;
  minus.addEventListener('click', () => {
    if (minus.parentNode.childNodes[1].textContent > 1) {
      minus.parentNode.childNodes[1].textContent = -1 + +minus.parentNode.childNodes[1].textContent;
    }
    if (minus.parentNode.childNodes[1].textContent == 1) {
      minus.classList.add('cart__minus_disable');
    }
    const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));
    vitamins[minus.getAttribute('data-id')].count = minus.parentNode.childNodes[1].textContent;
    sessionStorage.setItem('vitamins', JSON.stringify(vitamins));
    refreshCartList();
  });

  const count = document.createElement('div');
  count.classList.add('cart__count');
  count.innerHTML = elem.count;

  const plus = document.createElement('div');
  plus.classList.add('cart__plus');
  plus.setAttribute('data-id', index);
  plus.innerHTML = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 0H3V3H0V5H3V8H5V5H8V3H5V0Z" fill="black" />
  </svg>`;
  plus.addEventListener('click', () => {
    plus.parentNode.childNodes[1].textContent = 1 + +plus.parentNode.childNodes[1].textContent;
    if (plus.parentNode.childNodes[1].textContent != 1) {
      minus.classList.remove('cart__minus_disable');
    }
    const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));
    vitamins[plus.getAttribute('data-id')].count = plus.parentNode.childNodes[1].textContent;
    sessionStorage.setItem('vitamins', JSON.stringify(vitamins));
    refreshCartList();
  });

  const price = document.createElement('div');
  price.classList.add('cart__price');
  if (elem.sale) {
    const oldPrice = document.createElement('div');
    oldPrice.classList.add('cart__price_old');
    oldPrice.innerHTML = '$' + elem.price;

    const newPrice = document.createElement('div');
    newPrice.classList.add('cart__price_new');
    const newPriceCount = elem.price * ((100 - elem.sale) / 100);
    newPrice.innerHTML = '$' + newPriceCount.toFixed(2);

    price.append(oldPrice);
    price.append(newPrice);
    wrapper2.classList.add('cart__item-wrapper2_mob');
  } else {
    price.innerHTML = '$' + elem.price;
  }

  const subscriptions = document.createElement('div');
  const subscriptionsText = document.createElement('div');

  if (sessionStorage.getItem('isLogined')) {
    subscriptions.classList.add('cart__subscriptions', 'cart__subscriptions_show');
    subscriptions.innerHTML = `${setCheck(elem.delivery)}`;

    subscriptionsText.classList.add('cart__subscriptions-text');
    subscriptionsText.innerHTML = `Autoship every
  ${setDelivery(elem.delivery)}
  days`;

    const select = subscriptionsText.querySelector('.cart__select');
    select.addEventListener('click', () => {
      select.childNodes[1].classList.toggle('cart__selected_active');
      select.childNodes[3].classList.toggle('cart__select-list_active');
    });

    for (let i = 0; i < select.childNodes[3].children.length; i++) {
      select.childNodes[3].children[i].addEventListener('click', () => {
        for (let j = 0; j < select.childNodes[3].children.length; j++) {
          select.childNodes[3].children[j].classList.contains('cart__select-item_active')
            ? select.childNodes[3].children[j].classList.remove('cart__select-item_active')
            : null;
        }
        select.childNodes[3].children[i].classList.add('cart__select-item_active');
        select.childNodes[1].childNodes[0].textContent = select.childNodes[3].children[i].innerHTML;

        subscriptions.querySelector('.cart__checkbox').setAttribute('checked', '');

        const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));
        vitamins[index].delivery = select.childNodes[3].children[i].innerHTML;
        sessionStorage.setItem('vitamins', JSON.stringify(vitamins));
      });
    }
  }

  const item = document.createElement('div');
  item.classList.add('cart__item');
  item.setAttribute('data-id', index);

  wrapper1.append(name);
  wrapper1.append(deleteBtn);

  counter.append(minus);
  counter.append(count);
  counter.append(plus);

  wrapper2.append(counter);
  wrapper2.append(price);

  container.append(wrapper1);
  container.append(wrapper2);

  if (sessionStorage.getItem('isLogined')) {
    subscriptions.append(subscriptionsText);
    container.append(subscriptions);
  }

  item.append(img);
  item.append(container);

  cartList.append(item);
};

const refreshCartList = () => {
  const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));

  if (vitamins.length != 0) {
    cartList.innerHTML = '';
    cart.classList.remove('cart_empty');
    cartEmpty.classList.add('cart__empty_hide');
    cartFooter.classList.add('cart__footer_show');
  } else {
    cart.classList.add('cart_empty');
    cartEmpty.classList.remove('cart__empty_hide');
    cartFooter.classList.remove('cart__footer_show');
  }

  if (sessionStorage.getItem('customer') == 'wholesale') {
    cart.classList.add('cart_wholesale');
    cartInfo.classList.add('cart__info_show');
    cartBtn.classList.add('cart__btn_disable');
  }

  if (vitamins.length >= 3) {
    cartFooter.classList.add('cart__footer_border');
  } else {
    cartFooter.classList.remove('cart__footer_border');
  }

  try {
    vitamins.forEach((elem, index) => {
      createElement(elem, index);
    });
  } catch (error) {
    console.log(error);
  }

  calculationPrice();
};

refreshCartList();

// * Buy btn

function calculationPrice() {
  const price = [];
  const newPrice = [];

  for (let index = 0; index < cartListItem.length; index++) {
    for (let j = 0; j < +cartListItem[index].childNodes[1].childNodes[1].childNodes[0].childNodes[1].textContent; j++) {
      if (cartListItem[index].childNodes[1].childNodes[1].childNodes[1].childNodes.length == 2) {
        price.push(cartListItem[index].childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent);
      } else {
        price.push(cartListItem[index].childNodes[1].childNodes[1].childNodes[1].textContent);
      }
    }
  }

  price.forEach(elem => {
    let element = elem.split('');
    element.shift();
    newPrice.push(+element.join('') * 100);
  });

  const allPrice = newPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 100;

  cartBtn.childNodes[2].textContent = '$' + allPrice;

  if (sessionStorage.getItem('customer') == 'wholesale') {
    if (allPrice >= 700) {
      cartBtn.classList.remove('cart__btn_disable');
      cartInfo.classList.remove('cart__info_show');
      cartBtn.setAttribute('href', 'ordering.html');
    } else {
      cartBtn.classList.add('cart__btn_disable');
      cartInfo.classList.add('cart__info_show');
      cartBtn.setAttribute('href', '#');
    }
  } else {
    cartBtn.setAttribute('href', 'ordering.html');
  }
}

// * Check

const cartSubscriptionsText = document.getElementsByClassName('cart__subscriptions-text');

window.addEventListener('resize', ({ target }) => {
  if (target.innerWidth <= 500) {
    for (let i = 0; i < cartSubscriptionsText.length; i++) {
      cartSubscriptionsText[i].childNodes[0].textContent = 'Deliver every';
    }
  } else {
    for (let i = 0; i < cartSubscriptionsText.length; i++) {
      cartSubscriptionsText[i].childNodes[0].textContent = 'Autoship every';
    }
  }
});

if (window.innerWidth <= 500) {
  cart.style.height = window.innerHeight + 'px';
  for (let i = 0; i < cartSubscriptionsText.length; i++) {
    cartSubscriptionsText[i].childNodes[0].textContent = 'Deliver every';
  }
} else {
  cart.style.height = window.innerHeight + 'px';
  for (let i = 0; i < cartSubscriptionsText.length; i++) {
    cartSubscriptionsText[i].childNodes[0].textContent = 'Autoship every';
  }
}
