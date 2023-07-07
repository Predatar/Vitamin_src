document.addEventListener('DOMContentLoaded', () => {
  // const burgerMenu = document.querySelector('.header__burger-menu');
  // const sidebar = document.querySelector('.sidebar');

  // burgerMenu.addEventListener('click', () => {
  //   burgerMenu.classList.toggle('active');

  //   sidebar.classList.toggle('open');
  // });

  // switchHeaderItemActiveClass(pageCheck());

  // const burger = document.querySelector('.burger');
  // const sidemenu = document.querySelector('.sidebar');

  // burger.addEventListener('click', () => {
  //   document.body.style.overflow = 'hidden';
  //   sidemenu.classList.add('sidebar_active');
  // });

  /* var menuIcon = document.querySelector('.burger');
  var sidebar = document.querySelector('.sidebar');

  menuIcon.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar--open');
  });

  document.addEventListener('click', function (event) {
    var targetElement = event.target;
    var isClickInsideSidebar = sidebar.contains(targetElement);
    var isClickInsideMenuIcon = menuIcon.contains(targetElement);

    if (!isClickInsideSidebar && !isClickInsideMenuIcon) {
      sidebar.classList.remove('sidebar--open');
    }
  }); */

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
