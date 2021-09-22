async function getRests() {
  let response = await fetch("http://localhost/xaxa-delivery/api/restaurant/read.php");

  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error("error", response.status);
  }
}

async function showRests() {
  let records = await getRests();
  let restsBlock = document.querySelector(".restaurant-block");

  for (let key in records["records"]) {
    let link = document.createElement("a");
    link.className = "flex mb-3";
    link.setAttribute("href", "rest.html?id=" + records["records"][key]["id"]);
    restsBlock.appendChild(link);

    let image = document.createElement("img");
    image.className = "rest__img rounded-lg";
    image.setAttribute("src", "img/rests/" + records["records"][key]["img_link"]);
    link.appendChild(image);
  }
}

window.addEventListener("load", showRests);
