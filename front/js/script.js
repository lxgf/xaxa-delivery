async function getRests() {
  //делаем запрос API
  let response = await fetch("http://localhost/xaxa-delivery/api/restaurant/read.php");

  //возвращаем результат
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    //или выводим ошибку
    console.error("error", response.status);
  }
}

async function showRests() {
  let records = await getRests();
  //находим на сайте блок с классом restaurant-block
  let restsBlock = document.querySelector(".restaurant-block");


  //для каждого ресторана полученного из запроса
  for (let key in records["records"]) {

    //создаем ссылку на страницу ресторана и вставляем ее в restaurant-block
    let link = document.createElement("a");
    link.className = "flex mb-3";
    link.setAttribute("href", "rest.html?id=" + records["records"][key]["id"]);
    restsBlock.appendChild(link);


    //в ссылку вставляем картинку-логотип ресторана
    let image = document.createElement("img");
    image.className = "rest__img rounded-lg";
    image.setAttribute("src", "img/rests/" + records["records"][key]["img_link"]);
    link.appendChild(image);
  }
}

//вызываем функцию при загрузке страницы
window.addEventListener("load", showRests);
