//burger
const burgerBtn = document.querySelector('#burgerBtn');
const burgerMenuList = document.querySelector('.burgerList');
burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger__active');
    burgerMenuList.classList.toggle('burgerList__open');
});
const burgerListLink = document.querySelectorAll('.burgerList__link');
const burger = document.querySelector('.burger')
burgerListLink.forEach(item => {
  item.addEventListener('click', () => {
    burgerMenuList.classList.remove('burgerList__open')
    burger.classList.remove('burger__active')
  })
})
//header
const header = document.querySelector('.header');
window.document.addEventListener('scroll', () => {
  header.classList.remove('displayNone');
  header.style.display = 'block'
})


//showMore
const showMore = document.querySelector('.showMore');
const goodsLength = document.querySelectorAll('.catalogGood').length;
let visibleGoodsQuantity = 4;

showMore.addEventListener('click', () => {
  visibleGoodsQuantity += 4;
  const arr = Array.from(document.querySelector('.catalogGoodsWrapper').children);
  const visibleGoods = arr.slice(0, visibleGoodsQuantity);

  visibleGoods.forEach(good => {
    good.classList.add('isVisible')
  })
  if (visibleGoods.length === goodsLength) {
    showMore.style.display = 'none'

  }
})
console.log(goodsLength)
// cart
const catalogGoodBtn = document.querySelectorAll('.catalogGood__btn');
const cartList = document.querySelector('.cartList');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const cartIcon = document.querySelector('.headerIcon__cart');
const totalCost = document.querySelector('.totalPriceValue');

cartIcon.addEventListener('click', () => {
printQuantity() > 0 ? cart.classList.toggle('displayNone') : cart.classList.add('displayNone');

})

// накидываю id на товары каталога
// const catalogGood = document.querySelectorAll('.catalogGood');
// catalogGood.forEach(item => {
//   item.id = crypto.randomUUID();
// })

const printQuantity = () => {
  let length = cartList.children.length
  cartQuantity.textContent = length;
  return length
}
const generateCartGood = (img, text, price, id) => {
  return `
  <li class="cartGood__item" >
   <article class="cartGood" data-id="${id}" data-price="${price}">
      <img class="cartGood__img" src="${img}" alt="">
      <div class="cartGoodInfo">
        <p class="cartGood__text">${text}</p>
        <p class="cartGood__price">Цена: <span class="cartGood__priceValue">${price}</span> р</p>
          </div>
      <div class="cartGoodStepper">
        <button class="cartStepperBtn cartStepperMinus">-</button>
        <span class="cartStepperValue">1</span>
        <button class="cartStepperBtn cartStepperPlus">+</button>
          </div>
      <div class="del">
        <img class="delBtn" src="img/delImg.svg" alt="">
          </div>
      </article>
    </li> 
  `
}

const deleteGoodFromCart = (productParent) => {
  let id = productParent.querySelector('.cartGood').dataset.id;
  document.querySelector(`.catalogGood[id="${id}"]`).querySelector('.catalogGood__btn').disabled = false;
  productParent.remove();
  if(printQuantity() == 0) {
    cartQuantity.style.display = 'none'
    cart.classList.add('displayNone')
  }  
}

//catalogBtn
catalogGoodBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.catalogGood');
    let id = parent.id;
    let img = parent.querySelector('.catalogGood__img').getAttribute('src');
    let title = parent.querySelector('.catalogGood__title').textContent;
    let price = parseInt(parent.querySelector('.catalogGood__priceValue').textContent);

    cartList.insertAdjacentHTML('afterbegin', generateCartGood(img, title, price, id));

    printQuantity();
    /**
     * 
     * @returns price per quantity
     */
    const culcTotalPrice = () => {
      if (priceGoodArr !== []) {
        return priceGoodArr.reduce((sum, item) => sum + item) ;
      }
    }
    const printTotalPrice = () => {
      price.textContent = culcTotalCost()

    }
    /**
     * 
     * @returns Total cost
     */
    const culcTotalCost = () => {
      let goodPrices = document.querySelectorAll('.cartGood__priceValue')
            let totalCostArr = [];
            goodPrices.forEach(item => {
              totalCostArr.push(Number(item.textContent));
            });
            let totalCostSum = totalCostArr.reduce((sum, item) => sum + item);
            return totalCostSum
    }
    printTotalPrice()
    if (printQuantity() > 0) {
      cartQuantity.classList.remove('displayNone');
      cartQuantity.style.display = 'flex';
      cart.classList.add('active')
    }

    self.disabled = true;
    
    let count = 1;
    let priceGood = document.querySelector('.cartGood__priceValue')
    let priceGoodValue = +(document.querySelector('.cartGood__priceValue')).textContent;
    let priceGoodArr = [priceGoodValue];
    
    totalCost.textContent = culcTotalCost()
    if (cart.classList.contains('active')) {
      const stepperValue = document.querySelector('.cartStepperValue')
      const cartMinusBtn = document.querySelector('.cartStepperMinus');
      const cartPlusBtn = document.querySelector('.cartStepperPlus');

//plusBtn
      cartPlusBtn.addEventListener('click', () => {
        cartMinusBtn.disabled = false;
        count ++;
        if (count >= 9) {
          cartPlusBtn.disabled = true;
        }
        stepperValue.textContent = count;

        priceGoodArr.push(priceGoodValue);
        priceGood.textContent = culcTotalPrice();

        totalCost.textContent = culcTotalCost()
        
      })
//minusBtn
      cartMinusBtn.addEventListener('click', (e) => {
        cartPlusBtn.disabled = false
        count --;
        stepperValue.textContent = count;

        priceGoodArr.pop();
        if (count < 1) {

          deleteGoodFromCart(e.target.closest('.cartGood__item'));
        } else {
          priceGood.textContent = culcTotalPrice();
          totalCost.textContent = culcTotalCost();
        };
      });
//delBtn
      cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delBtn')) {
          deleteGoodFromCart(e.target.closest('.cartGood__item'));
          let goodPrices = document.querySelectorAll('.cartGood__priceValue')
              let totalCostArr = [];
              goodPrices.forEach(item => {
                totalCostArr.push(Number(item.textContent));
              });
              console.log(totalCostArr)
              if (printQuantity() > 0) {
                totalCost.textContent = culcTotalCost()
              } 
        }
      }
      )
};
    });    
});
//swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


