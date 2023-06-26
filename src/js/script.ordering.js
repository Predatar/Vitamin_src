Array.prototype.includesAll = function (props) {
  let validate = 0;

  this.forEach(elem => {
    if (elem == props) {
      ++validate;
    }
  });

  if (validate == this.length) {
    return true;
  } else {
    return false;
  }
};

const deliveryFirstName = document.querySelector('.delivery__first-name');
const deliveryLastName = document.querySelector('.delivery__last-name');
const deliveryFirstAddress = document.querySelector('.delivery__address1');
const deliverySecondAddress = document.querySelector('.delivery__address2');
const deliveryCity = document.querySelector('.delivery__city');
const deliveryZip = document.querySelector('.delivery__zip');
const deliveryEmail = document.querySelector('.delivery__email');
const deliveryPhone = document.querySelector('.delivery__phone');

const deliveryState = document.querySelector('.delivery__state-selected');
const deliveryStateSelected = document.querySelector('.delivery__state-selected');
const deliveryStateList = document.querySelector('.delivery__state-list');
const deliveryStateListItem = document.querySelectorAll('.delivery__state-list-item');

const cardNumber = document.querySelector('.biling__card-number');
const cardExpiration = document.querySelector('.biling__expiration');
const cardCVC = document.querySelector('.biling__cvc');

const warningDelivery = document.getElementsByClassName('warningDelivery');

let nextWarning = -1;
let warr = 1;

const validateInput = (event, index, regExp, text) => {
  if (event.target.value.match(regExp)) {
    event.target.classList.remove('form__input_invalid');
    warningDelivery[index].style.color = 'green';
    warningDelivery[index].innerHTML = 'Correctly';
  } else {
    if (event.target.value == '') {
      event.target.classList.remove('form__input_invalid');
      warningDelivery[index].innerHTML = '';
    } else {
      event.target.classList.add('form__input_invalid');
      warningDelivery[index].style.color = 'red';
      warningDelivery[index].innerHTML = text;
    }
  }
};

const activeBtn = () => {
  let warningValidate = [];
  const btn = document.querySelector('.bill__btn');

  for (let i = 0; i < warningDelivery.length; i++) {
    warningValidate.push(warningDelivery[i].innerHTML);
  }

  if (warningValidate.includesAll('Correctly')) {
    btn.classList.remove('bill__btn_disable');
    btn.removeAttribute('disabled');
  } else {
    btn.classList.add('bill__btn_disable');
    btn.setAttribute('disabled', '');
  }
};

const warningCorectly = index => {
  warningDelivery[index].style.color = 'green';
  warningDelivery[index].innerHTML = 'Correctly';
};

const getAccountInfo = async () => {
  await fetch(
    `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
      'userId'
    )}.json`
  ).then(response => {
    if (response.status == 200) {
      response.json().then(data => {
        if (data.firstName) {
          deliveryFirstName.value = data.firstName;
          warningCorectly(0);
        }
        if (data.lastName) {
          deliveryLastName.value = data.lastName;
          warningCorectly(1);
        }
        if (data.firstAddress) {
          deliveryFirstAddress.value = data.firstAddress;
          warningCorectly(2);
        }
        if (data.secocdAddress) {
          deliverySecondAddress.value = data.secocdAddress;
          if (nextWarning == -1) {
            const div = document.createElement('div');
            div.classList.add('warningDelivery');
            deliverySecondAddress.after(div);
            nextWarning = 0;
          }
          warningCorectly(3);
        }
        if (data.city) {
          deliveryCity.value = data.city;
          warningCorectly(4 + nextWarning);
        }
        if (data.state) {
          deliveryStateSelected.childNodes[0].textContent = data.state;
          warningCorectly(5 + nextWarning);
        }
        if (data.zip) {
          deliveryZip.value = data.zip;
          warningCorectly(6 + nextWarning);
        }
        if (data.email) {
          deliveryEmail.value = data.email;
          warningCorectly(7 + nextWarning);
        }
        if (data.phone) {
          deliveryPhone.value = data.phone;
          warningCorectly(8 + nextWarning);
        }
        if (data.cardNumber) {
          cardNumber.value = data.cardNumber;
          warningCorectly(9 + nextWarning);
        }
        if (data.cardExpiration) {
          cardExpiration.value = data.cardExpiration;
          warningCorectly(10 + nextWarning);
        }
        if (data.cardCVC) {
          cardCVC.value = data.cardCVC;
          warningCorectly(11 + nextWarning);
        }
        activeBtn();
      });
    } else {
      console.log(response.status);
    }
  });
};

const updateAccountInfo = async () => {
  await fetch(
    `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
      'userId'
    )}.json`,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: deliveryLastName.value,
        city: deliveryCity.value,
        firstAddress: deliveryFirstAddress.value,
        phone: deliveryPhone.value,
        secondAddress: deliverySecondAddress.value,
        state: deliveryStateSelected.childNodes[0].textContent,
        zip: deliveryZip.value,
        cardNumber: cardNumber.value,
        cardExpiration: cardExpiration.value,
        cardCVC: cardCVC.value
      })
    }
  );
};

if (sessionStorage.getItem('isLogined')) {
  getAccountInfo();
}

deliveryFirstName.addEventListener('change', e => {
  validateInput(e, 0, /^[a-zA-Z ]+$/, 'Only letters can be entered');
  activeBtn();
});
deliveryLastName.addEventListener('input', e => {
  validateInput(e, 1, /^[a-zA-Z ]+$/, 'Only letters can be entered');
  activeBtn();
});
deliveryFirstAddress.addEventListener('input', e => {
  validateInput(e, 2, /(\b\w*\b\s){1,2}\w*.\s\d{1,5}/, 'The shipping address should be at least 5 characters long');
  activeBtn();
});
deliverySecondAddress.addEventListener('input', e => {
  if (nextWarning == -1) {
    const div = document.createElement('div');
    div.classList.add('warningDelivery');
    deliverySecondAddress.after(div);
    nextWarning = 0;
  } else {
    validateInput(e, 3, /(\b\w*\b\s){1,2}\w*.\s\d{1,5}/, 'The shipping address should be at least 5 characters long');
    activeBtn();
  }
});
deliveryCity.addEventListener('input', e => {
  validateInput(e, 4 + nextWarning, /\D/, 'Please enter a valid city name');
  activeBtn();
});
deliveryZip.addEventListener('input', e => {
  validateInput(e, 6 + nextWarning, /[0-9]{3}\s[0-9]{3}/, 'You can write a maximum of 6 characters');
  activeBtn();
});
deliveryEmail.addEventListener('input', e => {
  validateInput(e, 7 + nextWarning, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please enter a valid email address');
  activeBtn();
});
deliveryPhone.addEventListener('input', e => {
  validateInput(e, 8 + nextWarning, /[0-9]{3}\s[0-9]{3}\s[0-9]{4}/, 'Please input numbers');
  activeBtn();
});

const deliveryZipInput = new Cleave(deliveryZip, {
  numericOnly: true,
  blocks: [3, 3]
});

const deliveryPhoneInput = new Cleave(deliveryPhone, {
  phone: true,
  phoneRegionCode: 'US'
});

deliveryStateSelected.addEventListener('change', e => {
  validateInput(e, 5 + nextWarning, /[A-Z]{2}/, 'Please select State/Province');
  activeBtn();
});

deliveryState.addEventListener('click', e => {
  deliveryStateList.classList.toggle('delivery__state-list_active');
  deliveryStateSelected.classList.toggle('delivery__state-selected_active');
});

deliveryStateListItem.forEach((elem, index) => {
  elem.addEventListener('click', e => {
    deliveryStateListItem.forEach(elem => {
      elem.classList.contains('delivery__state-list-item_active')
        ? elem.classList.remove('delivery__state-list-item_active')
        : null;
    });
    deliveryStateListItem[index].classList.add('delivery__state-list-item_active');

    deliveryStateSelected.childNodes[0].textContent = elem.innerHTML;
    warningDelivery[5 + nextWarning].style.color = 'green';
    warningDelivery[5 + nextWarning].innerHTML = 'Correctly';
    deliveryStateList.classList.toggle('delivery__state-list_active');
    deliveryStateSelected.classList.toggle('delivery__state-selected_active');
  });
});

const cardNumberInput = new Cleave(cardNumber, {
  creditCard: true
});

const expirationInput = new Cleave(cardExpiration, {
  date: true,
  datePattern: ['m', 'y']
});

const cvcInput = new Cleave(cardCVC, {
  numericOnly: true,
  blocks: [3]
});

cardNumber.addEventListener('input', e => {
  validateInput(e, 9 + nextWarning, /\d/, 'Card numbers must contain between 12 and 20 numerical characters.');
  activeBtn();
});

cardExpiration.addEventListener('input', e => {
  validateInput(e, 10 + nextWarning, /\d/, 'Required');
  activeBtn();
});

cardCVC.addEventListener('input', e => {
  validateInput(e, 11 + nextWarning, /\d/, 'Please enter numbers only');
  activeBtn();
});

const billList = document.querySelector('.bill__list');
const priceSubtotal = document.querySelector('.bill__subtotal-price');
const priceTotal = document.querySelector('.bill__total-price');
const priceShipping = 9.2;
let priceSale = 0;

const billDiscount = document.querySelector('.bill__discount');

const vitamins = JSON.parse(sessionStorage.getItem('vitamins'));

const setTotalPrice = price => {
  const totalPrice = price + priceShipping;
  priceTotal.innerHTML = '$' + totalPrice.toFixed(2);
};

const setPrice = elem => {
  if (elem.sale) {
    billDiscount.classList.add('bill__discount_show');
    const newPrice = elem.price * ((100 - elem.sale) / 100);

    priceSale += (elem.count * (elem.price * elem.sale)) / 100;

    billDiscount.childNodes[1].textContent = '-$' + priceSale.toFixed(2);
    return `<div class="bill__price">
      <div class="bill__price_old">
        $${elem.price}
      </div>
      <div class="bill__price_new">
        $${newPrice.toFixed(2)}
      </div>
    </div>`;
  } else {
    return `<div class="bill__price">
          $${elem.price}
				</div>`;
  }
};

const setItems = () => {
  let price = 0;

  vitamins.forEach(elem => {
    billList.innerHTML += `
	<div class="bill__list-item">
				<div class="bill__img ${elem.tag}">
				<picture><source srcset="img/vitamins/${elem.imgName}.webp" type="image/webp"><img src="img/vitamins/${
      elem.imgName
    }.png" alt="vitamins"></picture>
				</div>
				<div class="bill__name">
					${elem.count} x ${elem.name}
				</div>
        ${setPrice(elem)}
			</div>
	`;
    if (elem.sale) {
      price += elem.price * ((100 - elem.sale) / 100) * +elem.count;
    } else {
      price += +elem.price * +elem.count;
    }
  });

  priceSubtotal.innerHTML = '$' + price.toFixed(2);

  setTotalPrice(price);
};

setItems();

const getMonth = month => {
  switch (month) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      break;
  }
};

const deliveryForm = document.querySelector('.main__form');
const orders = {
  date: `${new Date().getDate()} ${getMonth(new Date().getMonth())} ${new Date().getFullYear()}`,
  shippig: 'Shipping',
  vitamins: [...vitamins],
  price: priceTotal.innerHTML
};
const subscriptions = [];

const setOrders = async () => {
  await fetch(
    `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
      'userId'
    )}/orders.json`,
    { method: 'POST', headers: { 'Content-type': 'application/json; charset=UTF-8' }, body: JSON.stringify(orders) }
  ).then(response => {
    if (response.status == 200) {
    } else {
      console.log(response.status);
    }
  });
};

const setSubscriptions = () => {
  vitamins.forEach(elem => {
    if (elem.delivery) {
      subscriptions.push(elem);
    }
  });

  if (subscriptions.length) {
    subscriptions.forEach(async elem => {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}/subscriptions.json`,
        { method: 'POST', headers: { 'Content-type': 'application/json; charset=UTF-8' }, body: JSON.stringify(elem) }
      ).then(response => {
        if ((response.status = 200)) {
          response.json();
        } else {
          console.log(response.status);
        }
      });
    });
  }
};

deliveryForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (sessionStorage.getItem('isLogined')) {
    updateAccountInfo();
    await setOrders()
      .then(setSubscriptions())
      .then(() => {
        document.location.href = 'order-placed.html';
      });
  }
  sessionStorage.removeItem('vitamins');
});
