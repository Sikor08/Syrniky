//burger
const burgerBtn = document.querySelector('#burgerBtn');
const burgerMenuList = document.querySelector('.burgerList');
burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger__active');
    burgerMenuList.classList.toggle('burgerList__open');
});


// swiper
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });



// cart
const catalogGoodBtn = document.querySelectorAll('.catalogGood__btn');
const cartList = document.querySelector('.cartList');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const cartIcon = document.querySelector('.headerIcon__cart');
const cartPlusBtn = document.querySelector('.cartStepperPlus');


let goods = []

cartIcon.addEventListener('click', () => {
printQuantity() > 0 ? cart.classList.toggle('displayNone') : cart.classList.add('displayNone');


})

const totalPrice = document.querySelector('.totalPriceValue');
let price = 0;

// накидываю id на товары каталога
// const catalogGood = document.querySelectorAll('.catalogGood');
// catalogGood.forEach(item => {
//   item.id = crypto.randomUUID();
// })

const plusFullprice = (currentPrice) => {
  return price += currentPrice;
}
const minusFullprice = (currentPrice) => {
  return price -= currentPrice;
}
const printTotalPrice = () => {
  totalPrice.textContent = `${price}`
}
const printQuantity = () => {
  let length = cartList.children.length
  cartQuantity.textContent = length;
  return length
}
const generateCartGood = (img, text, price, id) => {
  return `
  <li class="cartGood__item" >
   <article class="cartGood" data-id="${id}" data-price="${price}">
    <div class="cartGood__img">
      <img src="${img}" alt="">
    </div>
                        <div class="cartGoodInfo">
                            <p class="cartGood__text">${text}</p>
                            <div class="cartGoodPrice">
                                <p class="cartGood__price">Цена: <span class="cartGood__priceValue">${price}</span> р</p>
                            </div>
                        </div>
                        <div class="cartGoodStepper">
                            <button class="cartStepperBtn cartStepperMinus" data-id="${id}">-</button>
                            <span class="cartStepperValue">1</span>
                            <button class="cartStepperBtn cartStepperPlus" data-id="${id}">+</button>

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
  let currentPrice = productParent.querySelector('.cartGood__priceValue').textContent;
  minusFullprice(currentPrice);
  printTotalPrice()
  productParent.remove();
  if(printQuantity() == 0) {
    cartQuantity.style.display = 'none'
    cart.classList.add('displayNone')
  }  
}
catalogGoodBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.catalogGood');
    let id = parent.id;
    let img = parent.querySelector('.catalogGood__img img').getAttribute('src');
    let title = parent.querySelector('.catalogGood__title').textContent;
    let price = parseInt(parent.querySelector('.catalogGood__priceValue').textContent);

  


    cartList.insertAdjacentHTML('afterbegin', generateCartGood(img, title, price, id));

    printQuantity();

    let goodPrices = document.querySelectorAll('.cartGood__priceValue')
    let totalCostArr = [];
    goodPrices.forEach(item => {
      totalCostArr.push(Number(item.textContent));
    });
    console.log(totalCostArr)
    let totalCostSum = totalCostArr.reduce((sum, item) => sum + item);
    console.log(totalCostSum);
    totalPrice.textContent =totalCostSum

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

    if (cart.classList.contains('active')) {
      const stepperValue = document.querySelector('.cartStepperValue')
      const cartMinusBtn = document.querySelector('.cartStepperMinus');
      const cartPlusBtn = document.querySelector('.cartStepperPlus');
      let cost;
      let costElem;

      cartPlusBtn.addEventListener('click', () => {
        cartMinusBtn.disabled = false;

        count ++;
        if (count >= 4) {
          cartPlusBtn.disabled = true;
          alert('Не объешься?')
        }
        stepperValue.textContent = count;
       

        priceGoodArr.push(priceGoodValue);
        let priceGoodsSum = priceGoodArr.reduce((sum, item) => sum + item) ;
        priceGood.textContent = priceGoodsSum;
        let goodPrices = document.querySelectorAll('.cartGood__priceValue')
        let totalCostArr = [];

        goodPrices.forEach(item => {
          totalCostArr.push(Number(item.textContent));
        });
        console.log(totalCostArr)
        let totalCostSum = totalCostArr.reduce((sum, item) => sum + item);
        console.log(totalCostSum);
        totalPrice.textContent =totalCostSum
        
      })
      cartMinusBtn.disabled = true;



      cartMinusBtn.addEventListener('click', (e) => {
        cartPlusBtn.disabled = false
        count --;
        if (count == 1) {
          cartMinusBtn.disabled = true;
        }
        stepperValue.textContent = count;

        let stepperQuantity = e.target.parentNode.querySelector('.cartStepperValue').textContent;
        let dataPrice = e.target.closest('.cartGood').dataset.price

        cost  = +stepperQuantity * + dataPrice;
        costElem = e.target.closest('.cartGood').querySelector('.cartGood__priceValue')
        costElem.textContent = cost;
        console.log(priceGoodArr)
        priceGoodArr.pop()
        console.log(priceGoodArr)
        
        let goodPrices = document.querySelectorAll('.cartGood__priceValue')
        let totalCostArr = [];
        goodPrices.forEach(item => {
          totalCostArr.push(Number(item.textContent));
        });
        console.log(totalCostArr)
        let totalCostSum = totalCostArr.reduce((sum, item) => sum + item);
        console.log(totalCostSum);
        totalPrice.textContent =totalCostSum

      })
}
    });
});






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
          let totalCostSum = totalCostArr.reduce((sum, item) => sum + item);
          console.log(totalCostSum);
          totalPrice.textContent =totalCostSum
  
        }
        
  }
}
)

//promotion
