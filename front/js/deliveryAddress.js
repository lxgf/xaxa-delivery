let addressField = document.querySelector(".address");

addressField.addEventListener("change", ()=>{
    localStorage.setItem("address", addressField.value);
})

if (localStorage.getItem("address") === undefined) {
    addressField.value = "";
} else {
    addressField.value = localStorage.getItem("address");
}