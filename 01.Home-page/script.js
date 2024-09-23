const colWrapper = document.querySelectorAll(".col-wrapper");
const productCards = document.querySelectorAll(".product-card");

console.log(productCards);
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
  console.log(colWrapper.length);
  // for (let i = 0; i < colWrapper.length; i++) {
  //   const card = document.querySelector(".product-card");
  //   console.log(card);

  //   // <img src="${product.thumb}" />
  //   //     <div class="info">
  //   //       <h3>${product.title}</h3>
  //   //       <p>Sylish cafe chair</p>
  //   //       <div class="price">
  //   //         <p>Rp 2.500.000</p>
  //   //       </div>
  //   //     </div>
  //   // `;
  // }
  [...productCards].forEach(function (el) {
    console.log(el);
    el.innerHTML = `
    <img src="${product.thumb}" />
      <div class="info">
        <h3>${product.title}</h3>
        <p>Sylish cafe chair</p>
        <div class="price">
          <p>Rp 2.500.000</p>
        </div>
      </div>
    `;
  });
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
    console.log(arrayDeProduse[i]);
    printeazaProdus(arrayDeProduse[i]);
  }
}
// productCards.forEach(function (card) {
//   printeazaProdus();
// });
