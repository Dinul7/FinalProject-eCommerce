const colWrapper = document.querySelectorAll(".col-wrapper");

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
  for (i = 0; i < colWrapper.length; i++) {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add("product-card");

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

    colWrapper[i].appendChild(prodDiv);
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