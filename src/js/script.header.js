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
  const header = document.querySelector('.header');
  let lastScroll = 0;
  const scrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
  };

  const containHide = () => {
    return header.classList.contains('header__hide');
  };

  window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containHide()) {
      header.classList.add('header__hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
      header.classList.remove('header__hide');

      header.classList.add('header__show');
    }

    if (scrollPosition() < 50) {
      header.classList.remove('header__show');
    }

    lastScroll = scrollPosition();
  });
});
