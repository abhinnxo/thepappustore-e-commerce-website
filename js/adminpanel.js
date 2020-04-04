const KEY = "thePappuStoreProducts";
let products = [];

window.addEventListener("DOMContentLoaded", () => {
  products = JSON.parse(localStorage.getItem(KEY)) || [];
  if (!(typeof products !== 'undefined' && products.length > 0)) {
    //If not in local storage then load local .JSON and save in storage
    fetch("./json/products.json")
      .then(res => res.json())
      .then(res => products = [...res])
      .then(() => localStorage.setItem(KEY, JSON.stringify(products)));
  }
})


function addNewProduct() {
  const campany = document.getElementById("campany").value;
  const item = document.getElementById("item").value;
  const price = document.getElementById("price").value;
  const discount = document.getElementById("discount").value;
  const addNewProduct = { campany, item, price, discount };

  const alreadyExists = products.filter(product => {
    return Object.entries(product).toString() === Object.entries(addNewProduct).toString()
  })
  if (!(typeof alreadyExists !== 'undefined' && alreadyExists.length > 0)) {
    products = [...products, addNewProduct]
    localStorage.setItem(KEY, JSON.stringify(products));
  }

}