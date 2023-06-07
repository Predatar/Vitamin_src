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

  const switcherTab = document.querySelectorAll('.main__switch');
  const tabs = document.querySelectorAll('.main__tab');

  const switchTab = index => {
    switcherTab.forEach(elem => {
      elem.classList.contains('main__switch_active') ? elem.classList.remove('main__switch_active') : null;
      switcherTab[index].classList.add('main__switch_active');
    });

    tabs.forEach(elem => {
      elem.classList.contains('main__tab_active') ? elem.classList.remove('main__tab_active') : null;
    });
    tabs[index].classList.add('main__tab_active');
  };

  switcherTab.forEach((elem, index) => {
    elem.addEventListener('click', () => {
      switchTab(index);
    });
  });

  // * Register data and action

  const newUser = {
    customer: undefined, // string
    social: undefined, // boolean
    email: undefined, // string
    firstName: undefined, // string
    lastName: undefined, // string
    password: undefined, // string
    permission: undefined // boolean
  };

  const createUser = async () => {
    const allUsers = [];
    await fetch('https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users.json').then(response => {
      if (response.status == 200) {
        response
          .json()
          .then(data => {
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                allUsers.push(data[key].email);
              }
            }

            if (Object.values(allUsers).includes(newUser.email)) {
              Swal.fire({ title: 'Such mail already exists', icon: 'warning', confirmButtonColor: '#FF7D4E' });
              throw new Error('Such mail already exists');
            } else {
              fetch('https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newUser)
              })
                .then(response => {
                  if (response.status == 200) {
                    response.json().then(data => sessionStorage.setItem('userId', data.name));
                    Swal.fire({
                      title: 'Registration successful, log in to your account',
                      icon: 'success',
                      confirmButtonColor: '#FF7D4E'
                    }).then(() => {
                      document.location.href = 'signIn.html';
                    });
                  } else {
                    Swal.fire({
                      title: 'No luck registering, try again',
                      icon: 'warning',
                      confirmButtonColor: '#FF7D4E'
                    });
                  }
                })
                .catch(error => console.log(error));
            }
          })
          .catch(error => console.log(error));
      } else {
        console.log(response.status);
      }
    });
  };

  // * For form

  const warning = document.querySelectorAll('.warning');

  const validateInput = (event, index, regExp, property, text) => {
    if (event.target.value.match(regExp)) {
      event.target.classList.remove('form__input_invalid');
      newUser[property] = event.target.value;
      warning[index].style.color = 'green';
      warning[index].innerHTML = 'Correctly';
    } else {
      if (event.target.value == '') {
        event.target.classList.remove('form__input_invalid');
        warning[index].innerHTML = '';
      } else {
        event.target.classList.add('form__input_invalid');
        warning[index].style.color = 'red';
        warning[index].innerHTML = text;
      }
    }
  };

  const activeBtn = (select, btnClass) => {
    let warningValidate = [];
    const btn = document.querySelector(btnClass);

    if (select) {
      for (let i = 0; i < 4; i++) {
        warningValidate.push(warning[i].innerHTML);
      }
      console.log(warningValidate);
      if (warningValidate.includesAll('Correctly')) {
        btn.classList.remove('form-wholesale__btn_disable');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('form-wholesale__btn_disable');
        btn.setAttribute('disabled', '');
      }
    } else {
      const warningValidate = [];
      const btn = document.querySelector(btnClass);

      for (let i = 4; i < warning.length; i++) {
        warningValidate.push(warning[i].innerHTML);
      }
      console.log(warningValidate);
      if (warningValidate.includesAll('Correctly')) {
        btn.classList.remove('form-wholesale__btn_disable');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('form-wholesale__btn_disable');
        btn.setAttribute('disabled', '');
      }
    }
  };

  // * Regular form

  const regularForm = document.querySelector('.form-regular');
  const regularEmail = document.getElementsByName('regularEmail');
  const regularFirstName = document.getElementsByName('regularFirst');
  const regularLastName = document.getElementsByName('regularLast');
  const regularPass = document.getElementsByName('regularPass');

  regularEmail[0].addEventListener('input', e => {
    validateInput(e, 0, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'email', 'Please enter a valid email address');
    activeBtn(1, '.form-regular__btn');
  });
  regularFirstName[0].addEventListener('input', e => {
    validateInput(e, 1, /^[a-zA-Z ]+$/, 'firstName', 'Only letters can be entered');
    activeBtn(1, '.form-regular__btn');
  });
  regularLastName[0].addEventListener('input', e => {
    validateInput(e, 2, /^[a-zA-Z ]+$/, 'lastName', 'Only letters can be entered');
    activeBtn(1, '.form-regular__btn');
  });
  regularPass[0].addEventListener('input', e => {
    validateInput(
      e,
      3,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'password',
      'The password must be longer than 8 characters'
    );
    activeBtn(1, '.form-regular__btn');
  });

  regularForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    for (let i = 0; i < 4; i++) {
      warningValidate.push(warning[i].innerHTML);
    }
    newUser.customer = 'regular';

    if (warningValidate.includesAll('Correctly')) {
      console.log('true');
      createUser();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });

  // * Wholesale form

  const wholesaleForm = document.querySelector('.form-wholesale');
  const wholesaleEmail = document.getElementsByName('wholesaleEmail');
  const wholesaleFirstName = document.getElementsByName('wholesaleFirst');
  const wholesaleLastName = document.getElementsByName('wholesaleLast');
  const wholesalePass = document.getElementsByName('wholesalePass');
  const wholesaleFile = document.getElementsByName('wholesaleFile');
  const wholesaleFileText = [
    document.querySelector('.form-wholesale__input-file-text1'),
    document.querySelector('.form-wholesale__input-file-text2')
  ];

  wholesaleEmail[0].addEventListener('input', e => {
    validateInput(e, 4, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'email', 'Please enter a valid email address');
    activeBtn(0, '.form-wholedale__btn');
  });
  wholesaleFirstName[0].addEventListener('input', e => {
    validateInput(e, 5, /^[a-zA-Z ]+$/, 'firstName', 'Only letters can be entered');
    activeBtn(0, '.form-wholedale__btn');
  });
  wholesaleLastName[0].addEventListener('input', e => {
    validateInput(e, 6, /^[a-zA-Z ]+$/, 'lastName', 'Only letters can be entered');
    activeBtn(0, '.form-wholedale__btn');
  });
  wholesalePass[0].addEventListener('input', e => {
    validateInput(
      e,
      7,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'password',
      'The password must be longer than 8 characters'
    );
    activeBtn(0, '.form-wholedale__btn');
  });
  wholesaleFile[0].addEventListener('change', ({ target }) => {
    wholesaleFileText.forEach(elem => {
      elem.innerHTML = target.files[0].name;
      elem.classList.add('form-wholesale__input-file-text_active');
    });

    if (target.files[0].name.match(/^[a-zA-Z ]+\.pdf$/)) {
      target.classList.remove('form__input_invalid');
      newUser.permission = true;
      warning[8].style.color = 'green';
      warning[8].innerHTML = 'Correctly';
    } else {
      if (target.value == '') {
        target.classList.remove('form__input_invalid');
        warning[8].innerHTML = '';
      } else {
        target.classList.add('form__input_invalid');
        warning[8].style.color = 'red';
        warning[8].innerHTML = 'Download a pdf file';
      }
    }
    activeBtn(0, '.form-wholedale__btn');
  });

  wholesaleForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    for (let i = 4; i < warning.length; i++) {
      warningValidate.push(warning[i].innerHTML);
    }
    newUser.customer = 'wholesale';

    if (warningValidate.includesAll('Correctly')) {
      console.log('true');
      createUser();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });
});
