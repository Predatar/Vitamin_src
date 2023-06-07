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
  // * For form

  const userLogin = {
    email: '',
    password: ''
  };

  const warning = document.querySelectorAll('.warning');

  const validateInput = (event, index, regExp, property, text) => {
    if (event.target.value.match(regExp)) {
      event.target.classList.remove('form__input_invalid');
      userLogin[property] = event.target.value;
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

  const activeBtn = () => {
    let warningValidate = [];
    const btn = document.querySelector('.form__btn');

    for (let i = 0; i < warning.length; i++) {
      warningValidate.push(warning[i].innerHTML);
    }

    if (warningValidate.includesAll('Correctly')) {
      btn.classList.remove('form__btn_disable');
      btn.removeAttribute('disabled');
    } else {
      btn.classList.add('form__btn_disable');
      btn.setAttribute('disabled', '');
    }
  };

  const loginUser = async () => {
    if (!!sessionStorage.getItem('userId')) {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`
      ).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            console.log(data);
            if (data.email == userLogin.email) {
              if (data.password == userLogin.password) {
                sessionStorage.setItem('isLogined', 'true');
                Swal.fire({
                  title: 'Authorisation completed!',
                  icon: 'success',
                  confirmButtonColor: '#FF7D4E'
                }).then(() => {
                  document.location.href = 'personal-cabinet.html';
                });
              } else {
                Swal.fire({
                  title: "Password doesn't match",
                  icon: 'warning',
                  confirmButtonColor: '#FF7D4E'
                });
              }
            } else {
              Swal.fire({
                title: "Email doesn't match",
                icon: 'warning',
                confirmButtonColor: '#FF7D4E'
              });
            }
          });
        } else {
          console.log(response.status);
        }
      });
    } else {
      const allUsers = [];
      await fetch(`https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users.json`).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                allUsers.push(data[key].email);
              }
            }

            if (Object.values(allUsers).includes(userLogin.email)) {
              const index = Object.values(allUsers).indexOf(userLogin.email);

              if (Object.values(data)[index].password === userLogin.password) {
                sessionStorage.setItem('isLogined', 'true');
                Swal.fire({
                  title: 'Authorisation completed!',
                  icon: 'success',
                  confirmButtonColor: '#FF7D4E'
                }).then(() => {
                  document.location.href = 'personal-cabinet.html';
                });
              } else {
                Swal.fire({
                  title: 'Wrong password',
                  icon: 'warning',
                  confirmButtonColor: '#FF7D4E'
                });
              }
            } else {
              Swal.fire({
                title: 'User with this email is not registered',
                icon: 'warning',
                confirmButtonColor: '#FF7D4E'
              });
            }
          });
        } else {
          console.log(response.status);
        }
      });
    }
  };

  // * Login form

  const loginEmail = document.querySelector('.form__input-email');
  const loginPass = document.querySelector('.form__input-password');
  const loginForm = document.querySelector('.form');

  loginEmail.addEventListener('input', e => {
    validateInput(e, 0, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'email', 'Please enter a valid email address');
    activeBtn();
  });
  loginPass.addEventListener('input', e => {
    validateInput(
      e,
      1,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'password',
      'The password must be longer than 8 characters'
    );
    activeBtn();
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    warning.forEach(elem => {
      warningValidate.push(elem.innerHTML);
    });

    if (warningValidate.includesAll('Correctly')) {
      loginUser();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });

  // * Social authorisation

  const socialBtn = document.querySelector('.main__auth-item');

  socialBtn.addEventListener('click', () => {
    if (warning[0].innerHTML == 'Correctly') {
      loginUser();
    } else {
      Swal.fire({ title: 'Enter the mail correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });
});
