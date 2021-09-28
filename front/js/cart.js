const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
let amountVal,
    minusBtn,
    plusBtn

for(let i = 0; i < plusBtns.length; ++i) {
    plusBtn = plusBtns[i];
    plusBtn.addEventListener("click", function() {
        amountVal = this.previousElementSibling.value;
        this.previousElementSibling.value = parseInt(amountVal) + 1;
    })
}

for(let i = 0; i < minusBtns.length; ++i) {
    minusBtn = minusBtns[i];
    minusBtn.addEventListener("click", function() {
        amountVal = this.nextElementSibling.value;
        this.nextElementSibling.value = parseInt(amountVal) - 1;
    })
}


let productName,
    productPrice,
    allProducts = JSON.parse(localStorage.getItem("products"));

let productsBlock = document.querySelector(".cart__items");

for(let i = 0; i < allProducts.length; ++i) {
    productName = allProducts[i].name;
    productPrice = allProducts[i].price;

    let cartItem = document.createElement("div");
    cartItem.className = "my-1 flex flex-row w-full cart__bg cart__item py-4 px-3 rounded-lg items-center justify-between";
    productsBlock.appendChild(cartItem);

    let itemName = document.createElement("div");
    itemName.innerText = productName;
    cartItem.appendChild(itemName);

    let itemPrice = document.createElement("div");
    itemPrice.innerText = productPrice;
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
    amountField.className = "w-4 text-center";
    amountCounter.appendChild(amountField);

    let plusBtn = document.createElement("div");
    plusBtn.className = "px-1.5 plus bg-purple-500 text-white";
    plusBtn.textContent = "+";
    amountCounter.appendChild(plusBtn);


}



