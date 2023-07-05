const burger = document.querySelector('.burger');
const input = document.querySelector('input');

const menuClose = document.querySelector('.menu__close');

const menu = document.querySelector('.menu');

const addActiveClassForMenu = () => {
  menu.classList.add('menu_active');
  document.body.style.overflow = 'hidden';
};
const removeActiveClassForMenu = () => {
  menu.classList.remove('menu_active');
  document.body.style.overflow = 'scroll';
};

burger.addEventListener('click', e => {
  addActiveClassForMenu();
  document.body.style.overflow = 'none';
});
menuClose.addEventListener('click', e => {
  removeActiveClassForMenu();
  input.checked = false;
  document.body.style.overflow = 'auto';
});

const menuOpen = document.querySelectorAll('.menu__list-item');
// * Shop

const shop = document.querySelector('.menu-shop');
const shopClose = document.querySelector('.menu-shop__header svg');

const addActiveClassForShop = () => {
  shop.classList.add('menu-shop_active');
};
const removeActiveClassForShop = () => {
  shop.classList.remove('menu-shop_active');
};

menuOpen[0].addEventListener('click', e => {
  addActiveClassForShop();
});
shopClose.addEventListener('click', e => {
  removeActiveClassForShop();
});

// * Info

const info = document.querySelector('.menu-info');
const infoClose = document.querySelector('.menu-info__header svg');

const addActiveClassForInfo = () => {
  info.classList.add('menu-info_active');
};
const removeActiveClassForInfo = () => {
  info.classList.remove('menu-info_active');
};

menuOpen[1].addEventListener('click', e => {
  addActiveClassForInfo();
});
infoClose.addEventListener('click', e => {
  removeActiveClassForInfo();
});

// * Prof

const profile = document.querySelector('.menu__profile');
const profileMenu = document.querySelector('.menu-profile');
const profileClose = document.querySelector('.menu-profile__header svg');

const addActiveClassForProf = () => {
  profileMenu.classList.add('menu-profile_active');
};
const removeActiveClassForProf = () => {
  profileMenu.classList.remove('menu-profile_active');
};

if (sessionStorage.getItem('isLogined')) {
  profile.addEventListener('click', e => {
    e.preventDefault();
    addActiveClassForProf();
  });
}
profileClose.addEventListener('click', e => {
  removeActiveClassForProf();
});
