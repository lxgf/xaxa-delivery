const restId = window.location.search.replace("?id=", "");
console.log(restId);

async function getRestData() {
  let response = await fetch("http://localhost/xaxa-delivery/api/product/read_from_restaurant.php?rest_id=" + restId);

  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.error("error", response.status);
  }
}

async function showData() {
  let restData = await getRestData();
  console.log(restData);

  let restName = document.querySelector(".rest-name");
  restName.textContent = restData["records"][0]["rest_name"];
}

window.addEventListener("load", showData);
