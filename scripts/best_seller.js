const log = (_arg) => {
  console.log(_arg);
}

const bestSellerCarousel = document.querySelector("#best-seller-container");
const cardTemplate = document.querySelector("#card-template");
const prevBtn = document.querySelector("#best-seller .prev");
const nextBtn = document.querySelector("#best-seller .next");

//Fetch json data
$.getJSON("../json/best_seller.json", (_res) => { sellerCards(_res) });

//dynamically create cards
const sellerCards = (_products) => {
  for (const product of _products) {
    const newCard = cardTemplate.content.cloneNode(true);
    newCard.querySelector(".card-img-top").src = `./best_seller_images/banner-${product._banner}.jpg`;
    newCard.querySelector(".card-title").innerHTML = `${product._title}<br />${product._pricing}`;
    newCard.querySelector(".card-text").innerHTML = `${product._byline}`;
    bestSellerCarousel.appendChild(newCard);
  }
}

//nav buttons
prevBtn.addEventListener("click", () => {
  bestSellerCarousel.scrollLeft -= 500;
})

nextBtn.addEventListener("click", () => {
  bestSellerCarousel.scrollLeft += 500;
})