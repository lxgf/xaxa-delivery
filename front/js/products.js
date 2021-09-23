//получаем id текущего ресторана из ссылки
const restId = window.location.search.replace("?id=", "");
console.log(restId);

async function getData() {
  //делаем запрос к api, в качестве параметра используем id из ссылки
  let response = await fetch("http://localhost/xaxa-delivery/api/product/read_from_restaurant.php?rest_id=" + restId);

  //если ресторана по id не найдено, пользователя вернет на прошлую страницу
  if (response.status == 404) {
    history.back();
  }

  if (response.ok) {
    //возвращаем результат запроса
    let data = await response.json();
    return data;
  } else {
    //или выводим ошибку
    console.error("error", response.status);
  }
}

async function showData() {
  let restData = await getData();

  //находим место для названия ресторана
  let restName = document.querySelector(".rest-name");
  //вставляем название полученное из запроса
  restName.textContent = restData["records"][0]["rest_name"];

  //находим место для времени доставки
  let deliveryTime = document.querySelector(".delivery-time");
  //вставляем время доставки из запроса
  deliveryTime.textContent = restData["records"][0]["delivery_time"];

  //находим место для стоимости доставки
  let deliveryPrice = document.querySelector(".delivery-price");
  //вставляем цену доставки из запроса
  deliveryPrice.textContent = "от " + restData["records"][0]["delivery_price"] + " р.";
}

async function showProducts() {
  let products = await getData();
  //находим блок с продуктами
  let prodsBlock = document.querySelector(".prods-block");

  //для каждого товара создается своя карточка
  for (let key in products["records"]) {
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.className = "flex mb-3 product h-72 w-full rounded-lg md:w-64";
    link.style = "background-image: url(/img/prords/" + products["records"][key]["img_link"] + "); !important";
    prodsBlock.appendChild(link);

    let innerBlock = document.createElement("div");
    innerBlock.className = "flex prod__inner h-full w-full items-end";
    link.appendChild(innerBlock);

    let infoBlock = document.createElement("div");
    infoBlock.className = "flex flex-col prod__info h-20 w-full p-2";
    innerBlock.appendChild(infoBlock);

    let infoText = document.createElement("div");
    infoText.className = "prod__text";
    infoText.textContent = products["records"][key]["name"];
    infoBlock.appendChild(infoText);

    let infoPrice = document.createElement("div");
    infoPrice.className = "absolute w-full pr-4 pt-8 text-right ml-auto mr-0 prod__text prod__price";
    infoPrice.textContent = products["records"][key]["price"] + ".00 ₽";
    infoBlock.appendChild(infoPrice);
  }
}

//вызываем все это при загрузке страницы
window.addEventListener("load", showData);
window.addEventListener("load", showProducts);
