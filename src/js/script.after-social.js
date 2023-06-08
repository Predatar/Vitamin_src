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

  const file = document.getElementsByName('wholesaleFile');
  const fileText = document.querySelector('.form-wholesale__input-file-text1');
  const fileForm = document.querySelector('.form');
  let permission;

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

  const updateUser = async () => {
    await fetch(
      `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/users/${sessionStorage.getItem(
        'userId'
      )}.json`,
      {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          permission: permission
        })
      }
    ).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          Swal.fire({
            title: 'You are successfully registered',
            icon: 'success',
            confirmButtonColor: '#FF7D4E'
          }).then(() => {
            document.location.href = 'signIn.html';
          });
        });
      } else {
        console.log(response.status);
      }
    });
  };

  file[0].addEventListener('change', ({ target }) => {
    fileText.innerHTML = target.files[0].name;
    fileText.classList.add('form-wholesale__input-file-text1_active');

    if (target.files[0].name.match(/^.+\.pdf$/)) {
      target.classList.remove('form__input_invalid');
      permission = target.files[0].name;
      warning[0].style.color = 'green';
      warning[0].innerHTML = 'Correctly';
    } else {
      if (target.value == '') {
        target.classList.remove('form__input_invalid');
        warning[0].innerHTML = '';
      } else {
        target.classList.add('form__input_invalid');
        warning[0].style.color = 'red';
        warning[0].innerHTML = 'Download a pdf file';
      }
    }

    activeBtn();
  });

  fileForm.addEventListener('submit', e => {
    e.preventDefault();

    const warningValidate = [];

    warning.forEach(elem => {
      warningValidate.push(elem.innerHTML);
    });

    if (warningValidate.includesAll('Correctly')) {
      updateUser();
    } else {
      Swal.fire({ title: 'Fill in all the fields correctly', icon: 'warning', confirmButtonColor: '#FF7D4E' });
    }
  });
});
