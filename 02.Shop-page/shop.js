const prodsWrapper = document.getElementById("prods-wrap");
console.log(prodsWrapper);
const shopBtn = document.querySelector(".cart-logo");
const cartBtn = document.querySelector(".shopping-cart");
const bagBtn = document.querySelector(".fa-shopping-bag");

const fetchGames = async function () {
  const rasp = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  let jocuri = await rasp.json();

  const jocuriArr = jocuri;
  console.log(jocuriArr.length);
  console.log(jocuriArr);
  printeazaProduse(jocuriArr);
};

fetchGames();

const printeazaProdus = function (product) {
  console.log(product.length);
  for (i = 0; i < product.length; i++) {
    const colWrapper = document.createElement("div");
    const hoverDiv = document.createElement("div");
    const prodDiv = document.createElement("div");
    colWrapper.classList.add("col-wrapper");
    prodDiv.classList.add("product-card");
    hoverDiv.classList.add("hover-wrapper");

    prodsWrapper.appendChild(colWrapper);

    hoverDiv.innerHTML = `
     <div class="wrap">
      <div class="wrapper-box">
     <button><a href="#">Add To cart</a></button>
     <div class="hover-actions">
       <div class="icons">
         <i class="fa fa-share-alt"></i>
         <p>Share</p>
       </div>
       <div class="icons">
         <i class="fa fa-balance-scale"></i>
         <p>Compare</p>
       </div>
       <div class="icons">
         <i class="fa fa-heart-o"></i>
         <p>Like</p>
       </div>
     </div>
   </div>
 </div>
    
    `;

    prodDiv.innerHTML = `
    <img src="${product[i].thumb}" />
              <div class="info">
                <h3>${product[i].title}</h3>
                <p>${chosePlatform(
                  product[i].steamRatingPercent,
                  product[i].metacriticScore
                )} score: ${chooseHighScore(
      product[i].steamRatingPercent,
      product[i].metacriticScore
    )}</p>
                <div class="price">
                  <p>${product[i].salePrice}$</p>
                  <p class="discount">${product[i].normalPrice}$</p>
                </div>
              </div>
    
    `;

    colWrapper.appendChild(hoverDiv);
    colWrapper.appendChild(prodDiv);
  }
};

const chooseHighScore = (steamScore, metacriticScore) =>
  steamScore > metacriticScore ? steamScore : metacriticScore;

const chosePlatform = (steam, metaCritic) =>
  steam > metaCritic ? "Steam" : "MetaCritic";

function printeazaProduse(arrayDeProduse) {
  const produsePentruCard = arrayDeProduse;
  console.log(produsePentruCard);

  printeazaProdus(produsePentruCard);
}

shopBtn.addEventListener("click", () => {
  cartBtn.classList.remove("no-show");
});

bagBtn.addEventListener("click", () => {
  cartBtn.classList.add("no-show");
});

cartBtn.addEventListener("click", () => {
  cartBtn.classList.add("no-show");
});
