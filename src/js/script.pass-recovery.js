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
  const warning = document.querySelectorAll('.warning');

  const passRecoveryEmail = document.querySelector('.form__input');
  const passRecoveryForm = document.querySelector('.form');
  let recoveryEmail;

  const validateInput = (event, index, regExp, text) => {
    if (event.target.value.match(regExp)) {
      event.target.classList.remove('form__input_invalid');
      recoveryEmail = event.target.value;
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

  const recoverPass = async () => {
    if (!!sessionStorage.getItem('userId')) {
      await fetch(
        `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
          'userId'
        )}.json`
      ).then(response => {
        if (response.status == 200) {
          response.json().then(data => {
            Swal.fire({
              title: 'Your password',
              text: data.password,
              showCancelButton: true,
              confirmButtonText: 'Copy',
              confirmButtonColor: '#FF7D4E',
              cancelButtonText: 'Ok'
            }).then(result => {
              if (result.isConfirmed) {
                navigator.clipboard.writeText(data.password);
                Swal.fire({
                  title: 'Password added to clipboard!',
                  icon: 'success',
                  confirmButtonColor: '#FF7D4E'
                }).then(() => {
                  document.location.href = 'signIn.html';
                });
              }
            });
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

              Swal.fire({
                title: 'Your password',
                text: Object.values(data)[index].password,
                showCancelButton: true,
                confirmButtonText: 'Copy',
                cancelButtonText: 'Ok'
              }).then(result => {
                if (result.isConfirmed) {
                  navigator.clipboard.writeText(Object.values(data)[index].password);
                  Swal.fire('Password added to clipboard!', '', 'success').then(() => {
                    document.location.href = 'signIn.html';
                  });
                }
              });

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

  passRecoveryEmail.addEventListener('input', e => {
    validateInput(e, 0, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please enter a valid email address');
    activeBtn();
  });

  passRecoveryForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    warning.forEach(elem => {
      warningValidate.push(elem.innerHTML);
    });

    if (warningValidate.includesAll('Correctly')) {
      recoverPass();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });
});
