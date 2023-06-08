document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.header__burger-menu');
  const sidebar = document.querySelector('.sidebar');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');

    sidebar.classList.toggle('open');
  });

  // * Profile link

  const profileLink = document.querySelector('.header__profile');

  const switchLink = () => {
    if (!!sessionStorage.getItem('isLogined')) {
      profileLink.setAttribute('href', 'profile.html');
    } else {
      profileLink.setAttribute('href', 'signIn.html');
    }
  };

  switchLink();
});
