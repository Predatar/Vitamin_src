фArray.prototype.includesAll = function (props) {
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

document.addEventListener('DOMContentLoaded', () => {
  // * Switch tabs

  {
    const mainContainer = document.querySelector('.main__container');
    const tabs = document.querySelectorAll('.tabs__tab');
    const list = document.querySelectorAll('.aside__list-item');
    const listItem = [];

    for (let i = 0; i < list.length - 1; i++) {
      listItem.push(list[i]);
    }

    const switchTab = index => {
      tabs.forEach(elem => {
        elem.classList.contains('tabs__tab_active')
          ? elem.classList.remove('tabs__tab_active', 'animate__animated', 'animate__fadeInRight')
          : null;
      });
      tabs[index].classList.add('tabs__tab_active', 'animate__animated', 'animate__fadeInRight');
      mainContainer.classList.remove(
        'main__container_subscriptions',
        'main__container_orders',
        'main__container_account',
        'main__container_payment',
        'main__container_password'
      );
      if (tabs[index].childNodes[0].classList.contains('subscriptions')) {
        mainContainer.classList.add('main__container_subscriptions');
      } else if (tabs[index].childNodes[0].classList.contains('orders')) {
        mainContainer.classList.add('main__container_orders');
      } else if (tabs[index].childNodes[0].classList.contains('account')) {
        mainContainer.classList.add('main__container_account');
      } else if (tabs[index].childNodes[0].classList.contains('payment')) {
        mainContainer.classList.add('main__container_payment');
      } else {
        mainContainer.classList.add('main__container_password');
      }
      listItem.forEach(elem => {
        elem.classList.contains('aside__list-item_active') ? elem.classList.remove('aside__list-item_active') : null;
      });
      listItem[index].classList.add('aside__list-item_active');
    };

    listItem.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        switchTab(index);
      });
    });
  }

  // * Toast script

  const showToast = () => {
    const toast = document.querySelector('.toast');

    const show = () => {
      toast.classList.add('toast_show', 'animate__animated', 'animate__fadeInDown');
    };

    const hide = () => {
      toast.classList.remove('animate__fadeInDown');
      toast.classList.add('animate__fadeOutUp');
    };

    const deleteClass = () => {
      toast.classList.remove('toast_show', 'animate__animated', 'animate__fadeOutUp');
    };

    show();
    setTimeout(() => {
      hide();
      setTimeout(deleteClass, 500);
    }, 3000);
  };

  // * Subscriptions

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

  const setPrice = elem => {
    const price = elem.price * elem.count;
    return price;
  };

  const setNextDelivery = date => {
    const nextDelivery = new Date(new Date().getTime() + date * 86_400_000);

    const setDay = () => {
      switch (nextDelivery.getDate()) {
        case 1:
          return '1st';
        case 2:
          return '2nd';
        case 3:
          return '3rd';
        case 31:
          return '31st';

        default:
          return `${nextDelivery.getDate()}th`;
      }
    };

    const getMonth = () => {
      switch (nextDelivery.getMonth()) {
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

    return `${setDay()} ${getMonth()} ${nextDelivery.getFullYear()}`;
  };

  const subsList = document.querySelector('.subscriptions__list');

  const getSubs = async () => {
    await fetch(
      `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
        'userId'
      )}/subscriptions.json`
    ).then(response => {
      if ((response.status = 200)) {
        response.json().then(data => {
          subsList.innerHTML = '';
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const img = document.createElement('div');
              img.classList.add('subscriptions__img', data[key].tag);
              img.innerHTML = `<picture><source srcset="img/vitamins/${data[key].imgName}.webp" type="image/webp"><img src="img/vitamins/${data[key].imgName}.png" alt="vitamin"></picture>`;

              const container = document.createElement('div');
              container.classList.add('subscriptions__container');

              const tag = document.createElement('div');
              tag.classList.add('subscriptions__tag', data[key].tag);
              tag.innerHTML = getTag(data[key].tag);

              const case1 = document.createElement('div');
              case1.classList.add('subscriptions__case1');

              const name = document.createElement('div');
              name.classList.add('subscriptions__name');
              name.innerHTML = data[key].count + ' x ' + data[key].name;

              const price = document.createElement('div');
              price.classList.add('subscriptions__price');
              price.innerHTML = '$' + setPrice(data[key]);

              const divider = document.createElement('div');
              divider.classList.add('subscriptions__divider');

              const case2 = document.createElement('div');
              case2.classList.add('subscriptions__case2');

              const delivery = document.createElement('div');
              delivery.classList.add('subscriptions__delivery');

              const frequency = document.createElement('div');
              frequency.classList.add('subscriptions__frequency');
              frequency.innerHTML = `Shipment every ${data[key].delivery} days`;

              const next = document.createElement('div');
              next.classList.add('subscriptions__next');
              next.innerHTML = `Next delivery: ${setNextDelivery(data[key].delivery)}`;

              const deleteBtn = document.createElement('div');
              deleteBtn.classList.add('subscriptions__btn');
              deleteBtn.setAttribute('data-id', key);
              deleteBtn.innerHTML = 'Unsubscribe';
              deleteBtn.addEventListener('click', async () => {
                await fetch(
                  `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
                    'userId'
                  )}/subscriptions/${key}.json`,
                  { method: 'DELETE' }
                ).then(response => {
                  if (response.status == 200) {
                    getSubs();
                  } else {
                    console.log(response.status);
                  }
                });
              });

              const item = document.createElement('div');
              item.classList.add('subscriptions__list-item');

              case1.append(name);
              case1.append(price);

              delivery.append(frequency);
              delivery.append(next);

              case2.append(delivery);
              case2.append(deleteBtn);

              container.append(tag);
              container.append(case1);
              container.append(divider);
              container.append(case2);

              item.append(img);
              item.append(container);

              subsList.append(item);
            }
          }
        });
      } else {
        console.log(response.status);
      }
    });
  };

  getSubs();

  // * Orders

  const ordersDropDownBtn = document.getElementsByClassName('orders__drop-down');
  const ordersListItem = document.getElementsByClassName('orders__list-item');

  const initialHeight = '110px';
  let ordersListItemIterator = 1;

  const handleClick = () => {
    ordersDropDownBtn.classList.toggle('orders__drop-down_active');
    if (ordersListItemIterator) {
      ordersListItem.style.height = ordersListItem.scrollHeight + 'px';
      ordersListItemIterator = 0;
    } else {
      ordersListItem.style.height = initialHeight;
      ordersListItemIterator = 1;
    }
  };

  const ordersList = document.querySelector('.orders__list');

  const getOrders = async () => {
    await fetch(
      `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
        'userId'
      )}/orders.json`
    ).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const case1 = document.createElement('div');
              case1.classList.add('orders__case1');

              const info = document.createElement('div');
              info.classList.add('orders__info');

              const date = document.createElement('div');
              date.classList.add('orders__date');
              date.innerHTML = data[key].date;
              date.innerHTML += `<span>Shipping</span>`;

              const number = document.createElement('div');
              number.classList.add('orders__number');
              number.innerHTML = 'No 67824-6786';

              const delivery = document.createElement('div');
              delivery.classList.add('orders__delivery');
              delivery.innerHTML = 'Shipping';

              const dropDown = document.createElement('div');
              dropDown.classList.add('orders__drop-down');
              dropDown.innerHTML = `<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd"
								d="M14.8788 1.46376L13.4339 3.6646e-07L7.43942 6.07249L1.44495 -6.31608e-08L-3.2942e-07 1.46376L7.43942 9L14.8788 1.46376Z"
								fill="black" />
						</svg>`;

              const container = document.createElement('div');
              container.classList.add('orders__container');

              data[key].vitamins.forEach(elem => {
                const item = document.createElement('div');
                item.classList.add('orders__item');

                const img = document.createElement('div');
                img.classList.add('orders__img', elem.tag);
                img.innerHTML = `<picture><source srcset="img/vitamins/${elem.imgName}.webp" type="image/webp"><img src="img/vitamins/${elem.imgName}.png" alt="vitamin"></picture>`;

                const itemConteiner = document.createElement('div');
                itemConteiner.classList.add('orders__item-container');

                const tag = document.createElement('div');
                tag.classList.add('orders__tag', elem.tag);
                tag.innerHTML = getTag(elem.tag);

                const name = document.createElement('div');
                name.classList.add('orders__name');
                name.innerHTML = `${elem.count} x ${elem.name}`;

                const price = document.createElement('div');
                price.classList.add('orders__price');
                price.innerHTML = `$${elem.price}`;

                itemConteiner.append(tag);
                itemConteiner.append(name);
                itemConteiner.append(price);

                item.append(img);
                item.append(itemConteiner);

                container.append(item);
              });

              const divider = document.createElement('div');
              divider.classList.add('orders__divider');

              const case2 = document.createElement('div');
              case2.classList.add('orders__case2');

              const amount = document.createElement('div');
              amount.classList.add('orders__amount');
              amount.innerHTML = `<span>Order amount:</span> ${data[key].price}`;

              const btn = document.createElement('div');
              btn.classList.add('orders__btn');
              btn.innerHTML = 'Add to cart';

              const listItem = document.createElement('div');
              listItem.classList.add('orders__list-item');

              info.append(date);
              info.append(number);

              case1.append(info);
              case1.append(delivery);
              case1.append(dropDown);

              case2.append(amount);
              case2.append(btn);

              listItem.append(case1);
              listItem.append(container);
              listItem.append(divider);
              listItem.append(case2);

              ordersList.append(listItem);
            }
          }
        });
      } else {
        console.log(response.status);
      }
    });
  };

  getOrders();

  for (let i = 0; i < ordersDropDownBtn.length; i++) {
    ordersDropDownBtn[i].addEventListener('click', handleClick);
  }

  // * Account

  {
    const accountFirstName = document.querySelector('.account__first-name');
    const accountLastName = document.querySelector('.account__last-name');
    const accountAddress1 = document.querySelector('.account__address1');
    const accountAddress2 = document.querySelector('.account__address2');
    const accountCity = document.querySelector('.account__city');
    const accountZip = document.querySelector('.account__zip');
    const accountEmail = document.querySelector('.account__email');
    const accountPhone = document.querySelector('.account__phone');

    const accountState = document.querySelector('.account__state-selected');
    const accountStateSelected = document.querySelector('.account__state-selected');
    const accountStateList = document.querySelector('.account__state-list');
    const accountStateListItem = document.querySelectorAll('.account__state-list-item');

    const accountFile = document.querySelector('.account__input-file');
    const accountFileInput = document.querySelector('.account__file');
    const accountFileLabel = accountFile.querySelector('label');
    const accountFileText = [
      accountFile.querySelector('.account__input-file-text1'),
      accountFile.querySelector('.account__input-file-text2')
    ];

    const warningAccount = document.getElementsByClassName('warningAccount');

    const userInfo = {
      firstName: '',
      lastName: '',
      firstAddress: '',
      secocdAddress: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      permission: ''
    };

    let nextWarning = -1;
    let warr = 1;

    const validateInput = (event, index, regExp, text) => {
      if (event.target.value.match(regExp)) {
        event.target.classList.remove('form__input_invalid');
        warningAccount[index].style.color = 'green';
        warningAccount[index].innerHTML = 'Correctly';
      } else {
        if (event.target.value == '') {
          event.target.classList.remove('form__input_invalid');
          warningAccount[index].innerHTML = '';
        } else {
          event.target.classList.add('form__input_invalid');
          warningAccount[index].style.color = 'red';
          warningAccount[index].innerHTML = text;
        }
      }
    };

    const activeBtn = () => {
      let warningValidate = [];
      const btn = document.querySelector('.account__btn');

      for (let i = 0; i < warningAccount.length; i++) {
        warningValidate.push(warningAccount[i].innerHTML);
      }

      if (warningValidate.includesAll('Correctly')) {
        btn.classList.remove('account__btn_disable');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('account__btn_disable');
        btn.setAttribute('disabled', '');
      }
    };

    const warningCorectly = index => {
      warningAccount[index].style.color = 'green';
      warningAccount[index].innerHTML = 'Correctly';
    };

    const getAccountInfo = async () => {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`
      ).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            if (data.customer == 'wholesale') {
              document.querySelector('.account__customer').innerHTML = 'Wholesale customer';
              document.querySelector('.account__wholesale').classList.add('account__wholesale_active');
            }
            if (data.firstName) {
              accountFirstName.value = data.firstName;
              warningCorectly(0);
            }
            if (data.lastName) {
              accountLastName.value = data.lastName;
              warningCorectly(1);
            }
            if (data.firstAddress) {
              accountAddress1.value = data.firstAddress;
              warningCorectly(2);
            }
            if (data.secocdAddress) {
              accountAddress2.value = data.secocdAddress;
              if (nextWarning == -1) {
                const div = document.createElement('div');
                div.classList.add('warningAccount');
                accountAddress2.after(div);
                nextWarning = 0;
              }
              warningCorectly(3);
            }
            if (data.city) {
              accountCity.value = data.city;
              warningCorectly(4 + nextWarning);
            }
            if (data.state) {
              accountStateSelected.childNodes[0].textContent = data.state;
              warningCorectly(5 + nextWarning);
            }
            if (data.zip) {
              accountZip.value = data.zip;
              warningCorectly(6 + nextWarning);
            }
            if (data.email) {
              accountEmail.value = data.email;
              warningCorectly(7 + nextWarning);
            }
            if (data.phone) {
              accountPhone.value = data.phone;
              warningCorectly(8 + nextWarning);
            }
            if (data.permission) {
              accountFileText.forEach(elem => {
                elem.innerHTML = data.permission;
                elem.classList.add('account__input-file-text_active');
              });
              if (warr) {
                const div = document.createElement('div');
                div.classList.add('warningAccount');
                accountFile.after(div);
                warr = 0;
              }
              warningCorectly(9 + nextWarning);
            }
            activeBtn();
          });
        } else {
          console.log(response.status);
        }
      });
    };

    getAccountInfo();

    const updateAccountInfo = async () => {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json: charset=UTF-8' },
          body: JSON.stringify(userInfo)
        }
      ).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            showToast();
            getAccountInfo();
          });
        } else {
          console.log(response.status);
        }
      });
    };

    accountFirstName.addEventListener('change', e => {
      validateInput(e, 0, /^[a-zA-Z ]+$/, 'Only letters can be entered');
      activeBtn();
    });
    accountLastName.addEventListener('input', e => {
      validateInput(e, 1, /^[a-zA-Z ]+$/, 'Only letters can be entered');
      activeBtn();
    });
    accountAddress1.addEventListener('input', e => {
      validateInput(e, 2, /(\b\w*\b\s){1,2}\w*.\s\d{1,5}/, 'The shipping address should be at least 5 characters long');
      activeBtn();
    });
    accountAddress2.addEventListener('input', e => {
      if (nextWarning == -1) {
        const div = document.createElement('div');
        div.classList.add('warningAccount');
        accountAddress2.after(div);
        nextWarning = 0;
      } else {
        validateInput(
          e,
          3,
          /(\b\w*\b\s){1,2}\w*.\s\d{1,5}/,
          'The shipping address should be at least 5 characters long'
        );
        activeBtn();
      }
    });
    accountCity.addEventListener('input', e => {
      validateInput(e, 4 + nextWarning, /\D/, 'Please enter a valid city name');
      activeBtn();
    });
    accountZip.addEventListener('input', e => {
      validateInput(e, 6 + nextWarning, /[0-9]{3}\s[0-9]{3}/, 'You can write a maximum of 6 characters');
      activeBtn();
    });
    accountEmail.addEventListener('input', e => {
      validateInput(e, 7 + nextWarning, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please enter a valid email address');
      activeBtn();
    });
    accountPhone.addEventListener('input', e => {
      validateInput(e, 8 + nextWarning, /[0-9]{3}\s[0-9]{3}\s[0-9]{4}/, 'Please input numbers');
      activeBtn();
    });

    const accountZipInput = new Cleave(accountZip, {
      numericOnly: true,
      blocks: [3, 3]
    });

    const accountPhoneInput = new Cleave(accountPhone, {
      phone: true,
      phoneRegionCode: 'US'
    });

    accountStateSelected.addEventListener('change', e => {
      validateInput(e, 5 + nextWarning, /[A-Z]{2}/, 'Please select State/Province');
      activeBtn();
    });

    accountState.addEventListener('click', e => {
      accountStateList.classList.toggle('account__state-list_active');
      accountStateSelected.classList.toggle('account__state-selected_active');
    });

    accountStateListItem.forEach((elem, index) => {
      elem.addEventListener('click', e => {
        accountStateListItem.forEach(elem => {
          elem.classList.contains('account__state-list-item_active')
            ? elem.classList.remove('account__state-list-item_active')
            : null;
        });
        accountStateListItem[index].classList.add('account__state-list-item_active');

        accountStateSelected.childNodes[0].textContent = elem.innerHTML;
        userInfo.state = elem.innerHTML;
        warningAccount[5 + nextWarning].style.color = 'green';
        warningAccount[5 + nextWarning].innerHTML = 'Correctly';
        accountStateList.classList.toggle('account__state-list_active');
        accountStateSelected.classList.toggle('account__state-selected_active');
      });
    });

    accountFileLabel.addEventListener('click', () => {
      if (warr) {
        const div = document.createElement('div');
        div.classList.add('warningAccount');
        accountFile.after(div);
        warr = 0;
      }
    });

    accountFileInput.addEventListener('change', ({ target }) => {
      accountFileText.forEach(elem => {
        elem.innerHTML = target.files[0].name;
        elem.classList.add('account__input-file-text_active');
      });

      if (target.files[0].name.match(/^.+\.pdf$/)) {
        target.classList.remove('form__input_invalid');
        warningAccount[9 + nextWarning].style.color = 'green';
        warningAccount[9 + nextWarning].innerHTML = 'Correctly';
      } else {
        if (target.value == '') {
          target.classList.remove('form__input_invalid');
          warningAccount[9 + nextWarning].innerHTML = '';
        } else {
          target.classList.add('form__input_invalid');
          warningAccount[9 + nextWarning].style.color = 'red';
          warningAccount[9 + nextWarning].innerHTML = 'Download a pdf file';
        }
      }
      activeBtn();
    });

    const accountForm = document.querySelector('.account__form');

    accountForm.addEventListener('submit', e => {
      e.preventDefault();

      const warningValidate = [];

      for (let i = 0; i < warningAccount.length; i++) {
        warningValidate.push(warningAccount[i].innerHTML);
      }

      if (warningValidate.includesAll('Correctly')) {
        userInfo.firstName = accountFirstName.value;
        userInfo.lastName = accountLastName.value;
        userInfo.firstAddress = accountAddress1.value;
        userInfo.secondAddress = accountAddress2.value;
        userInfo.city = accountCity.value;
        userInfo.state = accountStateSelected.childNodes[0].textContent;
        userInfo.zip = accountZip.value;
        userInfo.email = accountEmail.value;
        userInfo.phone = accountPhone.value;
        userInfo.permission = accountFileInput.files.length
          ? accountFileInput.files[0].name
          : accountFileText[0].innerHTML;

        updateAccountInfo();
      } else {
        Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
      }
    });
  }

  // * Payment

  {
    const cardNumber = document.querySelector('.payment__card');
    const expiration = document.querySelector('.payment__expiration');
    const cvc = document.querySelector('.payment__cvc');
    const btn = document.querySelector('.payment__btn');

    const cardNumberInput = new Cleave(cardNumber, {
      creditCard: true
    });

    const expirationInput = new Cleave(expiration, {
      date: true,
      datePattern: ['m', 'y']
    });

    const cvcInput = new Cleave(cvc, {
      numericOnly: true,
      blocks: [3]
    });

    const activeBtn = () => {
      if (cardNumber.value.length >= 16 && expiration.value.length == 5 && cvc.value.length == 3) {
        btn.classList.remove('payment__btn_disable');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('payment__btn_disable');
        btn.setAttribute('disabled', '');
      }
    };

    const getPaymentInfo = async () => {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`
      ).then(response => {
        if ((response.status = 200)) {
          response.json().then(data => {
            if (data.cardNumber) {
              cardNumber.value = data.cardNumber;
            }
            if (data.cardExpiration) {
              expiration.value = data.cardExpiration;
            }
            if (data.cardCVC) {
              cvc.value = data.cardCVC;
            }
            activeBtn();
          });
        } else {
          console.log(response.status);
        }
      });
    };

    getPaymentInfo();

    const addPayment = async () => {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({
            cardNumber: cardNumber.value,
            cardExpiration: expiration.value,
            cardCVC: cvc.value
          })
        }
      ).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            showToast();
            getPaymentInfo();
          });
        } else {
          console.log(response.status);
        }
      });
    };

    cardNumber.addEventListener('change', activeBtn);
    expiration.addEventListener('change', activeBtn);
    cvc.addEventListener('change', activeBtn);

    const paymentForm = document.querySelector('.payment__form');

    paymentForm.addEventListener('submit', e => {
      e.preventDefault();

      addPayment();
    });
  }

  // * Change password

  {
    const warningChange = document.querySelectorAll('.warningChange');

    const password = {
      oldPass: '',
      newPass: '',
      confirmPass: ''
    };

    const validateChange = (event, index, property) => {
      if (event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
        event.target.classList.remove('form__input_invalid');
        password[property] = event.target.value;
        warningChange[index].style.color = 'green';
        warningChange[index].innerHTML = 'Correctly';
      } else {
        if (event.target.value == '') {
          event.target.classList.remove('form__input_invalid');
          warningChange[index].innerHTML = '';
        } else {
          event.target.classList.add('form__input_invalid');
          warningChange[index].style.color = 'red';
          warningChange[index].innerHTML = 'The password must be longer than 8 characters';
        }
      }
    };

    const avoidWarning = () => {
      warningChange.forEach(elem => {
        elem.innerHTML = '';
        elem.style.color = 'red';
      });
    };

    const activeBtn = () => {
      let warningValidate = [];
      const btn = document.querySelector('.change-pass__btn');

      for (let i = 0; i < warningChange.length; i++) {
        warningValidate.push(warningChange[i].innerHTML);
      }

      if (warningValidate.includesAll('Correctly')) {
        btn.classList.remove('change-pass__btn_disable');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('change-pass__btn_disable');
        btn.setAttribute('disabled', '');
      }
    };

    const changePass = async () => {
      if (password.newPass == password.confirmPass) {
        await fetch(
          `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
            'userId'
          )}.json`
        ).then(response => {
          if (response.status == 200) {
            response.json().then(data => {
              if (data.password == password.oldPass) {
                fetch(
                  `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
                    'userId'
                  )}.json`,
                  {
                    method: 'PATCH',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({
                      password: password.newPass
                    })
                  }
                ).then(response => {
                  if (response.status == 200) {
                    response.json().then(data => {
                      showToast();
                    });
                  } else {
                    console.log(response.status);
                  }
                });
              } else {
                Swal.fire({ title: "The old password doesn't match", icon: 'warning', confirmButtonColor: '#FF7D4E' });
              }
            });
          } else {
            console.log(response.status);
          }
        });
      } else {
        Swal.fire({ title: "The new password doesn't match", icon: 'warning', confirmButtonColor: '#FF7D4E' });
      }
    };

    const inputChangeOld = document.querySelector('.change-pass__old');
    const inputChangeNew = document.querySelector('.change-pass__new');
    const inputChangeConfirm = document.querySelector('.change-pass__confirm');
    const changeForm = document.querySelector('.change-pass__form');

    /* #uUXXU4D9ew#gfR */
    /* 123Max123 */

    inputChangeOld.addEventListener('input', e => {
      validateChange(e, 0, 'oldPass');
      activeBtn();
    });
    inputChangeNew.addEventListener('input', e => {
      validateChange(e, 1, 'newPass');
      activeBtn();
    });
    inputChangeConfirm.addEventListener('input', e => {
      validateChange(e, 2, 'confirmPass');
      activeBtn();
    });

    changeForm.addEventListener('submit', async e => {
      e.preventDefault();

      const warningValidate = [];

      warningChange.forEach(elem => {
        warningValidate.push(elem.innerHTML);
      });

      if (warningValidate.includesAll('Correctly')) {
        await changePass().then(() => {
          avoidWarning();
          changeForm.reset();
        });
      } else {
        Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
      }
    });
  }

  //* Sign out

  {
    const signOut = document.querySelector('.aside__list-item_sign-out');

    signOut.addEventListener('click', () => {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('isLogined');
      document.location.href = 'signIn.html';
    });
  }
});
