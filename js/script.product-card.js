const mainImg = document.querySelector('.main__wrapper');
const itemTag = document.querySelector('.item__tag');
const itemName = document.querySelector('.item__name');
const itemPrice = document.querySelector('.item__price');

const itemCountImg = document.querySelector('.item__count-img');
const itemAmount = document.querySelector('.item__amount');
const itemPackage = document.querySelector('.item__package');

let vitamins = [];
let productInfo = {};

const getTag = tag => {
  switch (tag) {
    case 'dietary':
      return 'Vitamins & Dietary Supplements';
    case 'minerals':
      return 'Minerals';
    case 'prenatal':
      return 'Prenatal Vitamins';
    case 'relief':
      return 'Pain Relief';
    case 'antioxidants':
      return 'Antioxidants';
    case 'loss':
      return 'Weight Loss';
    case 'probiotics':
      return 'Probiotics';
    default:
      break;
  }
};

const setCounterInfo = tag => {
  switch (tag) {
    case 'dietary':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon-bottle.webp" type="image/webp"><img src="img/product-card/icon-bottle.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '90 Capsules';
      itemPackage.innerHTML = '500 mg plastic can';
      break;
    case 'minerals':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon-bottle.webp" type="image/webp"><img src="img/product-card/icon-bottle.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '90 Capsules';
      itemPackage.innerHTML = '500 mg plastic can';
      break;
    case 'prenatal':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon_box.webp" type="image/webp"><img src="img/product-card/icon_box.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '15-3 Gr Packets';
      itemPackage.innerHTML = '2.56 ounces';
      break;
    case 'relief':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon_can.webp" type="image/webp"><img src="img/product-card/icon_can.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '9 Packets';
      itemPackage.innerHTML = '4.8 ounces plastic can';
      break;
    case 'antioxidants':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon-bottle.webp" type="image/webp"><img src="img/product-card/icon-bottle.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '90 Capsules';
      itemPackage.innerHTML = '500 mg plastic can';
      break;
    case 'loss':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon_box.webp" type="image/webp"><img src="img/product-card/icon_box.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '15-3 Gr Packets';
      itemPackage.innerHTML = '2.56 ounces';
      break;
    case 'probiotics':
      itemCountImg.innerHTML = `<picture><source srcset="img/product-card/icon_box.webp" type="image/webp"><img src="img/product-card/icon_box.png" alt="vitamin"></picture>`;
      itemAmount.innerHTML = '15-3 Gr Packets';
      itemPackage.innerHTML = '2.56 ounces';
      break;
    default:
      break;
  }
};

const setSale = (price, sale) => {
  if (sale) {
    const oldPrice = document.createElement('div');
    const oldPriceSpan = document.createElement('span');
    const discount = document.createElement('div');
    const newPrice = document.createElement('div');

    oldPrice.classList.add('item__price-old');
    oldPriceSpan.innerHTML = '$' + price;

    discount.classList.add('item__sale');
    discount.innerHTML = `-${sale}%`;

    const priceSale = price * ((100 - sale) / 100);

    newPrice.classList.add('item__price-new');
    newPrice.innerHTML = '$' + priceSale.toFixed(2);

    oldPrice.append(oldPriceSpan);
    oldPrice.append(discount);

    itemPrice.append(oldPrice);
    itemPrice.append(newPrice);
  } else {
    itemPrice.innerHTML = '$' + price;
  }
};

(async function () {
  await fetch(
    `https://vitamin-9645d-default-rtdb.europe-west1.firebasedatabase.app/vitamins/${sessionStorage.getItem(
      'itemId'
    )}.json`
  ).then(response => {
    if (response.status == 200) {
      response.json().then(data => {
        document.title = data.name + ' - Vitamins';

        mainImg.classList.add(data.tag);
        mainImg.childNodes[0].innerHTML = `<img src="img/vitamins__svg/${data.imgName}.svg" alt="vit">`;

        itemTag.classList.add(data.tag);
        itemTag.innerHTML = getTag(data.tag);

        itemName.innerHTML = data.name;

        setCounterInfo(data.tag);

        setSale(data.price, data.sale);

        productInfo = { ...data };
      });
    } else {
      console.log(response.status);
    }
  });
})();

// * Counter

const counterMinus = document.querySelector('.item__minus');
const counterPlus = document.querySelector('.item__plus');
const itemCounter = document.querySelector('.item__counter');

const checkCounterMinus = () => {
  if (itemCounter.innerHTML == 1) {
    counterMinus.classList.add('item__minus_disable');
  } else {
    counterMinus.classList.contains('item__minus_disable')
      ? counterMinus.classList.remove('item__minus_disable')
      : null;
  }
};

counterMinus.addEventListener('click', e => {
  if (itemCounter.innerHTML > 1) {
    itemCounter.innerHTML = -1 + +itemCounter.innerHTML;
  }
  checkCounterMinus();
});
counterPlus.addEventListener('click', e => {
  itemCounter.innerHTML = 1 + +itemCounter.innerHTML;
  checkCounterMinus();
});

// * Subscriptions

const subscriptions = document.querySelector('.item__subscriptions');

if (sessionStorage.getItem('isLogined')) {
  subscriptions.classList.add('item__subscriptions_show');
}

const itemSelect = document.querySelector('.item__select');
const itemSelected = document.querySelector('.item__selected');
const itemSelectList = document.querySelector('.item__list');
const itemListItems = document.querySelectorAll('.item__list-item');

const toggleActiveClassForItemSelected = () => {
  itemSelected.classList.toggle('item__selected_active');
};
const toggleActiveClassForItemSelectList = () => {
  itemSelectList.classList.toggle('item__list_active');
};
const toggleActiveClassForItemListItems = index => {
  itemListItems.forEach(elem => {
    elem.classList.contains('item__list-item_active') ? elem.classList.remove('item__list-item_active') : null;
  });
  itemListItems[index].classList.add('item__list-item_active');
};
const switchSubscriptionsDay = index => {
  itemSelected.childNodes[0].textContent = itemListItems[index].innerHTML;
};

itemSelect.addEventListener('click', e => {
  toggleActiveClassForItemSelected();
  toggleActiveClassForItemSelectList();
});
itemListItems.forEach((elem, index) => {
  elem.addEventListener('click', e => {
    toggleActiveClassForItemListItems(index);
    switchSubscriptionsDay(index);
  });
});

// * Switch text

const itemSubscriptionsText = document.querySelector('.item__subscriptions-text');

window.addEventListener('resize', e => {
  if (e.target.innerWidth < 608) {
    itemSubscriptionsText.childNodes[0].textContent = 'Deliver every';
  } else {
    itemSubscriptionsText.childNodes[0].textContent = 'Autoship this item every';
  }
});
if (window.innerWidth < 608) {
  itemSubscriptionsText.childNodes[0].textContent = 'Deliver every';
}

// * Add to cart

const btnAddToCart = document.querySelector('.item__btn');

btnAddToCart.addEventListener('click', e => {
  vitamins = JSON.parse(sessionStorage.getItem('vitamins'));
  const vitaminsName = [];

  if (vitamins) {
    vitamins.forEach(elem => vitaminsName.push(elem.name));

    if (vitaminsName.includes(productInfo.name)) {
      vitaminsName.forEach((elem, index) => {
        if (elem == productInfo.name) {
          vitamins[index].count = itemCounter.innerHTML;
          if (sessionStorage.getItem('isLogined')) {
            if (document.querySelector('.switch input[type="checkbox"]').checked) {
              vitamins[index].delivery = itemSelected.childNodes[0].textContent;
            }
          }
        }
      });
    } else {
      productInfo.count = itemCounter.innerHTML;

      if (sessionStorage.getItem('isLogined')) {
        if (document.querySelector('.switch input[type="checkbox"]').checked) {
          productInfo.delivery = itemSelected.childNodes[0].textContent;
        }
      }

      vitamins.push(productInfo);
    }
  } else {
    vitamins = [];
    productInfo.count = itemCounter.innerHTML;

    if (sessionStorage.getItem('isLogined')) {
      if (document.querySelector('.switch input[type="checkbox"]').checked) {
        productInfo.delivery = itemSelected.childNodes[0].textContent;
      }
    }

    vitamins.push(productInfo);
  }
  sessionStorage.setItem('vitamins', JSON.stringify(vitamins));
  refreshCartList();
  addActiveClassForCartBackDoor();
});
