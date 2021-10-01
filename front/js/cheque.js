let productName,
  productPrice,
  allProducts = JSON.parse(localStorage.getItem("products"));
  address = localStorage.getItem("address");
  date = localStorage.getItem("date");
  deliveryPrice = 200;

if (allProducts == null) {
    alert('Нет покупок!');
}
else{
    let sum = 0;

    for (let i = 0; i < allProducts.length; i++) {
        let itemDate = document.querySelector('#date');
        let itemAddress = document.querySelector('#address');
        let productItem = document.createElement('div');
        let itemProduct = document.createElement('div');
        let itemPrice = document.createElement('div');
        let itemDelivery = document.querySelector('#delivery_price');
        productItem.className = 'cheque__line cheque__double-Line';
        productItem.appendChild(itemProduct);
        productItem.appendChild(itemPrice);
        itemDate.innerHTML = date.slice(1,-1);
        itemAddress.innerHTML = address;
        document.querySelector('.cheque__wrapper').insertBefore(productItem, document.querySelector('#other'));
        productName = allProducts[i].name;
        productPrice = allProducts[i].price;
        itemProduct.innerHTML =  productName;
        itemPrice.innerHTML = productPrice;
        itemDelivery.innerHTML = (deliveryPrice + '.00 ₽');
        sum += parseInt(productPrice.replace('.00 ₽', ''));
    }
    
    let finalPrice = document.querySelector('#final_price');
    finalPrice.innerHTML = sum + deliveryPrice + '.00₽';
    window.print();
}