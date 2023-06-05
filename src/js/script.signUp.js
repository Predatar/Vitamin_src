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
});
