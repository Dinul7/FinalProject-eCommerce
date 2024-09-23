const colWrapper = document.querySelectorAll(".col-wrapper");
const productCards = document.querySelectorAll(".product-card");

// console.log(productCard.length);
// console.log(colWrapper.length);
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

const printeazaProdus = function (product) {
  console.log(product);
  // const colWrapper = document.querySelector(".col-wrapper");
  // const cardElement = document.querySelector(".product-card");
  // const imgElement = document.createElement("img");
  // imgElement.src = `${product.thumb}`;

  // const infoElement = document.createElement("div");
  // infoElement.classList.add("info");

  // const headerThree = document.createElement("h3");
  // headerThree.innerText = `${product.title}`;

  // const infoP = document.createElement("p");
  // infoP.innerText = `Sylish cafe chair`;
  // const priceDiv = document.createElement("div");
  // priceDiv.classList.add("price");

  // const priceEl = document.createElement("p");
  // priceEl.innerText = "Rp 2.500.000";

  // priceDiv.appendChild(priceEl);

  // infoElement.appendChild(headerThree);
  // infoElement.appendChild(infoP);
  // infoElement.appendChild(priceDiv);

  // cardElement.appendChild(imgElement);
  // cardElement.appendChild(infoElement);
  // colWrapper.appendChild(cardElement);

  // productCard.forEach(function (card) {
  //   console.log(card);
  // });
  const productCard = document.querySelectorAll(".product-card");
  productCard.innerHTML = `
  <img src="${product.thumb}" />
      <div class="info">
        <h3>${product.title}</h3>
        <p>Sylish cafe chair</p>
        <div class="price">
          <p>Rp 2.500.000</p>
        </div>
      </div>
  `;
};
// productCard.forEach((card) => {
//   card.innerHTML = `
//    <img src="${product.thumb}" />
//      <div class="info">
//        <h3>${product.title}</h3>
//        <p>Sylish cafe chair</p>
//        <div class="price">
//          <p>Rp 2.500.000</p>
//        </div>
//      </div>
//   `;
// });
// const printeazaProduse = (arrayDeProduse) =>
//   arrayDeProduse.forEach((produs) => printeazaProdus(produs));

function printeazaProduse(arrayDeProduse) {
  for (let i = 0; i < colWrapper.length; i++) {
    printeazaProdus(arrayDeProduse[i]);
  }
}
// productCards.forEach(function (card) {
//   printeazaProdus();
// });
