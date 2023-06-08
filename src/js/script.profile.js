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

  // * Change password

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
            console.log(`${data.password} = ${oldPass}`, data.password == oldPass);
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
                    Swal.fire({
                      title: 'You are successfully change pass',
                      icon: 'success',
                      confirmButtonColor: '#FF7D4E'
                    }).then(() => {
                      
                    });
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

  changeForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    warningChange.forEach(elem => {
      warningValidate.push(elem.innerHTML);
    });

    if (warningValidate.includesAll('Correctly')) {
      changePass();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });
});
