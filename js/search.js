const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchDiv = document.querySelector('.search-div');
const cardTemplate2 = document.querySelector('#card-template-2');
const ratingColors = ['red', 'red', 'orange', 'orange', 'blue']
var data;
var searchQuery = decodeURI(location.search.substring(1));
searchQuery = searchQuery.split(/[=&]+/);
searchQuery = searchQuery[searchQuery.indexOf("q") + 1];
searchInput.value = searchQuery;

//fetching json
window.addEventListener("DOMContentLoaded", () => {
  fetch('/json/products.json')
    .then(res => res.json())
    .then(res => data = res)
    .then(() => search(searchQuery))
})

//Display search res cards
function createCard(_product) {
  const o = _product.options;
  const newCard = cardTemplate2.content.cloneNode(true);
  newCard.querySelector('.srh-card-title').innerText = `${_product.item} (${o.color} ${o.storage} ${o.size} ${o.star})`;
  newCard.querySelector('.srh-card-camp').innerText = "By " + _product.campany;
  newCard.querySelector('.srh-card-rating').innerText = `${+_product.rating}/10`;
  newCard.querySelector('.srh-card-rating').style.color = ratingColors[+_product.rating / 2 - 1];
  newCard.querySelector('.srh-card-price').innerText = `Price ₹${_product.price}`;
  searchDiv.appendChild(newCard);
};

//search module
function search(_query) {
  if (!_query) return;
  //Clear previous search res
  searchDiv.innerHTML = '';
  let found = false;

  //Now search
  _query = new RegExp(_query, 'i');
  data.filter((_data) => {
    if (_data.item.match(_query)) {
      createCard(_data);
      found = true;
    }
  });
  ////Nothing to show
  if (!found)
    searchDiv.innerHTML = '<div class="no-srh-result"><p><i class="fa fa-meh-o"></i> Oops! can\'t found<br />Try searching something else</p></div>';
};

//search btn
searchBtn.addEventListener('mouseup', () => {
  if (searchInput.value)
    location.href = `/navbar/product.html?q=${searchInput.value}`;
});
searchInput.addEventListener('keypress', () => {
  if (searchInput.value && event.keyCode == 13)
    location.href = `/navbar/product.html?q=${searchInput.value}`;
})