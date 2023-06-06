// document.addEventListener('DOMContentLoaded', () => {
//   const burgerMenu = document.querySelector('.header__burger-menu');
//   const sidebar = document.querySelector('.sidebar');

//   burgerMenu.addEventListener('click', () => {
//     burgerMenu.classList.toggle('active');

//     sidebar.classList.toggle('open');
//   });
// });
!(function () {
  var t = {
    make: function () {
      var e = document.querySelectorAll('.js-hamburger');
      e.length > 0 &&
        n(e, function (e) {
          e.addEventListener('click', t.clickHandle, !1);
        }),
        t.headerAnimate(),
        document.querySelector('.js-hint').addEventListener('click', t.hintHandle, !1);
    },
    clickHandle: function (e) {
      e.preventDefault(), this.classList.toggle('is-active');
    },
    hintHandle: function (e) {
      e.preventDefault(),
        this.parentNode.removeChild(this),
        document.getElementById('hint').classList.add('is-visible');
    },
    headerAnimateDelay: 200,
    headerAnimateInterval: 3250,
    headerAnimate: function () {
      function n() {
        var e = parseInt(a.getAttribute('data-class'), 10);
        a.classList.add('hamburger--' + i[e]),
          window.requestTimeout(function () {
            a.classList.add('is-active'),
              window.requestTimeout(function () {
                a.classList.remove('is-active'),
                  window.requestTimeout(function () {
                    a.classList.remove('hamburger--' + i[e]);
                    var n = e + 1;
                    n === i.length && (n = 1), a.setAttribute('data-class', n);
                  }, 750);
              }, 1e3);
          }, 750);
      }
      var i = [
        'slider',
        'squeeze',
        'arrow',
        'arrowalt',
        'spin',
        'elastic',
        'emphatic',
        'collapse',
        'vortex',
        'stand',
        'spring',
        '3dx',
        '3dy',
        'boring'
      ];
      e(i);
      var a = document.querySelector('.hamburger--header'),
        o = window.requestInterval(n, t.headerAnimateDelay);
      window.requestTimeout(function () {
        window.clearRequestInterval(o), (o = window.requestInterval(n, t.headerAnimateInterval));
      }, t.headerAnimateDelay);
    }
  };
  t.make();
})();
