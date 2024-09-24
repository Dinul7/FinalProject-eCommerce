// const productCards = document.querySelectorAll(".product-card");
// console.log(productCards);
// const productCardsArr = Array.from(productCards);

const fetchGames = async function () {
  const rasp = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  let jocuri = await rasp.json();

  const jocuriArr = jocuri;
  console.log(jocuriArr.length);

  printeazaProduse(jocuriArr);
};

fetchGames();

const colWrapper = document.querySelectorAll(".col-wrapper");

const printeazaProdus = function (product) {
  for (i = 0; i < colWrapper.length; i++) {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add(".product-card");

    prodDiv.innerHTML = `
    <img src="${product[i].thumb}" />
              <div class="info">
                <h3>${product[i].title}</h3>
                <p>Sylish cafe chair</p>
                <div class="price">
                  <p>Rp 2.500.000</p>
                </div>
              </div>
    
    `;

    colWrapper[i].appendChild(prodDiv);
  }
  colWrapper.forEach((wrap) => {
    wrap.appendChild(prodDiv);
  });
};

function printeazaProduse(arrayDeProduse) {
  const produsePentruCard = arrayDeProduse.slice(0, 8);
  printeazaProdus(produsePentruCard);
}
