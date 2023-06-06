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

  // * Register action

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

  // * Form

  const regularForm = document.querySelector('.form-regular');
  const regularEmail = document.getElementsByName('regularEmail');
  const regularFirstName = document.getElementsByName('regularFirst');
  const regularLastName = document.getElementsByName('regularLast');
  const regularPass = document.getElementsByName('regularPass');
  const warning = document.querySelectorAll('.warning');

  const validateInput = (event, index, regExp, property, className, text) => {
    console.log(regExp);
    if (event.target.value.match(regExp)) {
      event.target.classList.remove(className);
      newUser[property] = event.target.value;
      warning[index].style.color = 'green';
      warning[index].innerHTML = 'Correctly';
    } else {
      if (event.target.value == '') {
        event.target.classList.remove(className);
        warning[index].innerHTML = '';
      } else {
        event.target.classList.add(className);
        warning[index].style.color = 'red';
        warning[index].innerHTML = text;
      }
    }
  };

  regularEmail[0].addEventListener('input', e => {
    validateInput(
      e,
      0,
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'email',
      'form-regular__input_invalid',
      'Please enter a valid email address'
    );
  });
  regularFirstName[0].addEventListener('input', e => {
    validateInput(e, 1, /^[a-zA-Z ]+$/, 'firstName', 'form-regular__input_invalid', 'Only letters can be entered');
  });
  regularLastName[0].addEventListener('input', e => {
    validateInput(e, 2, /^[a-zA-Z ]+$/, 'lastName', 'form-regular__input_invalid', 'Only letters can be entered');
  });
  regularPass[0].addEventListener('input', e => {
    validateInput(
      e,
      3,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'password',
      'form-regular__input_invalid',
      'The password must be longer than 8 characters'
    );
  });

  regularForm.addEventListener('submit', e => {
    e.preventDefault();

    newUser.customer = 'regular';
    newUser.password = regularPass[0].value;

    createUser();
  });
});
