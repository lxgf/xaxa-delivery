//получаем информацию о товарах в корзине из локального хранилища
let productName,
    productPrice,
    allProducts = JSON.parse(localStorage.getItem("products"));

let productsBlock = document.querySelector(".cart__items");

const calculateSum = () => {
  let sum = 0;
  let itemFullPrices = document.querySelectorAll(".item-price-full") //.innerHTML.replace("₽", "");
  let sumPlace = document.querySelector(".sum");
  let fullSum = document.querySelector(".full-price");
  let deliveryPrice = document.querySelector(".delivery-price");

  if(localStorage.getItem("products") === null) {
    sumPlace.innerHTML = "0 р.";
    fullSum.innerHTML = "0 р.";
    deliveryPrice.innerHTML = "0 р."
    return;
  } else {
    deliveryPrice.innerHTML = "200 р."
  }
  
  for (let j = 0; j < itemFullPrices.length; j++) {
    let itemFullPrice = parseInt(itemFullPrices[j].innerHTML.replace("₽", ""));
    sum += itemFullPrice;

    sumPlace.innerHTML = sum.toString() + " р.";
    fullSum.innerHTML = (sum + 200).toString() + " р.";
    deliveryPrice.innerHTML = "200 р."
  }
}

const addToReceipt = () => {
  let items = document.querySelectorAll(".cart__item");
  let result = [];

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    let itemName = item.querySelector(".prod-name").innerHTML;
    let itemSum = item.querySelector(".item-price-full").innerHTML;

    let resObj = {
      name: itemName,
      sum: itemSum
    }

    result.push(resObj);

    localStorage.setItem("receiptData", JSON.stringify(result));
  }
}

//если в локальном хранилище пусто выводим сообщение
if (allProducts == null) {
  let cartItem = document.createElement("div");
  cartItem.className = "my-1 flex flex-row w-full cart__bg cart__item py-4 px-3 rounded-lg items-center justify-between";
  productsBlock.appendChild(cartItem);

  let itemName = document.createElement("div");
  itemName.innerText = "Ваша корзина пуста!";
  cartItem.appendChild(itemName);
}
else {
  let title = document.querySelector('.title');
  let clearBtn = document.createElement('a');
  clearBtn.innerHTML = "Очистить";
  clearBtn.className = "my-1 flex flex-row ml-auto w-auto cart__bg py-2 px-3 rounded-lg items-center justify-between text-sm";
  title.appendChild(clearBtn);
  clearBtn.setAttribute('href', '#')
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("products");
    setTimeout(document.querySelector(".sum").innerHTML = "0 р.", 1000)
    location.reload();
  })
}

//выводим весь список товаров в корзине
for (let i = 0; i < allProducts.length; ++i) {
  productName = allProducts[i].name;
  productPrice = allProducts[i].price;

  let cartItem = document.createElement("div");
  cartItem.className = "my-1 flex flex-row w-full cart__bg cart__item py-4 px-3 rounded-lg items-center justify-between text-sm";
  productsBlock.appendChild(cartItem);

  let itemName = document.createElement("div");
  itemName.innerText = productName;
  itemName.className = "w-32 prod-name";
  cartItem.appendChild(itemName);

  let itemPrice = document.createElement("div");
  itemPrice.innerText = productPrice;
  itemPrice.className = "item-price";
  cartItem.appendChild(itemPrice);

  let amountCounter = document.createElement("div");
  amountCounter.className = "flex flex-row";
  cartItem.appendChild(amountCounter);

  let minusBtn = document.createElement("div");
  minusBtn.className = "px-1.5 minus bg-purple-500 text-white";
  minusBtn.textContent = "-";
  amountCounter.appendChild(minusBtn);

  let amountField = document.createElement("input");
  amountField.setAttribute("type", "number");
  amountField.setAttribute("value", "1");
  amountField.setAttribute("min", "1");
  amountField.readOnly = true;
  amountField.className = "w-5 text-center amount-field";
  amountCounter.appendChild(amountField);


  let plusBtn = document.createElement("div");
  plusBtn.className = "px-1.5 plus bg-purple-500 text-white";
  plusBtn.textContent = "+";
  amountCounter.appendChild(plusBtn);

  let itemMPrice = document.createElement("div");
  let mProductPrice = productPrice.substring(0, productPrice.length - 1);
  mProductPrice = mProductPrice * document.querySelector('.amount-field').value;
  itemMPrice.innerText = mProductPrice += '₽';
  itemMPrice.className = "item-price-full";
  cartItem.appendChild(itemMPrice);

  amountCounter.addEventListener("click", function () {
    let productAmount = amountField.value;
    let productCost = itemPrice.innerText.replace(".00 ₽", "");

    this.nextElementSibling.innerHTML = (productCost * productAmount) + '₽';

    calculateSum();
  })
}

calculateSum();


//находим все кнопки + и - на странице
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
let amountVal, minusBtn, plusBtn;

//вешаем на кнопки + обратчик клика, который инкрементирует кол-во товара
for (let i = 0; i < plusBtns.length; ++i) {
  plusBtn = plusBtns[i];
  plusBtn.addEventListener("click", function () {
    amountVal = this.previousElementSibling.value;
    this.previousElementSibling.value = parseInt(amountVal) + 1;
  });
}

//аналогично с минусом
for (let i = 0; i < minusBtns.length; ++i) {
  minusBtn = minusBtns[i];
  minusBtn.addEventListener("click", function () {
    amountVal = this.nextElementSibling.value;
    if (amountVal > 0) {
      this.nextElementSibling.value = parseInt(amountVal) - 1;
    }
  });
}

function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

document.querySelector('.buy-btn').addEventListener("click", () => {
  let addressFiled = document.querySelector('.address');
  if (addressFiled.value !== '') {
    localStorage.setItem("date", JSON.stringify(formattedDate()));
    addToReceipt();
    document.location.href = "/cheque.html";
  }
  else {
    addressFiled.focus();
    addressFiled.setAttribute('readonly', 'readonly');
    addressFiled.value = 'Адрес доствки не был введён!'
    addressFiled.style.color = '#ff4646';
    setTimeout(() => {
      addressFiled.removeAttribute('readonly');
      addressFiled.value = ''
      addressFiled.style.color = '#AE7CF2';
    }, 1500)
  }
})

document.addEventListener("load", calculateSum);
