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

document.addEventListener('DOMContentLoaded', () => {
  // * Switch tabs

  {
    const tabs = document.querySelectorAll('.tabs__tab');
    const list = document.querySelectorAll('.aside__list-item');
    const listItem = [];

    for (let i = 0; i < list.length - 1; i++) {
      listItem.push(list[i]);
    }

    // todo переделать на свои классы где будет имя анимации чтобы потом правильно адаптировать

    const switchTab = index => {
      tabs.forEach(elem => {
        elem.classList.contains('tabs__tab_active')
          ? elem.classList.remove('tabs__tab_active', 'animate__animated', 'animate__fadeInRight')
          : null;
      });
      tabs[index].classList.add('tabs__tab_active', 'animate__animated', 'animate__fadeInRight');
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

  // * Orders

  const ordersDropDownBtn = document.querySelector('.orders__drop-down');
  const ordersListItem = document.querySelector('.orders__list-item');

  const initialHeight = '110px';
  let ordersListItemIterator = 1;

  const handleClick = () => {
    ordersDropDownBtn.classList.toggle('orders__drop-down_active');
    /* ordersListItem.classList.toggle('orders__list-item_active'); */
    if (ordersListItemIterator) {
      ordersListItem.style.height = ordersListItem.scrollHeight + 'px';
      ordersListItemIterator = 0;
    } else {
      ordersListItem.style.height = initialHeight;
      ordersListItemIterator = 1;
    }
  };

  ordersDropDownBtn.addEventListener('click', handleClick);

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
        userInfo.secocdAddress = accountAddress2.value;
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
