const colWrapper = document.querySelectorAll(".col-wrapper");
const productCards = document.querySelectorAll(".product-card");
// console.log(productCards.entries());
const productCardsArr = Array.from(productCards);

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
  const productCardsArr = Array.from(productCards);
  for (let i = 0; i < productCardsArr.length; i++) {
    const newItem = productCardsArr[i];
    console.log(newItem);
  }
  console.log(product.title);
};

function printeazaProduse(arrayDeProduse) {
  for (let i = 0; i < colWrapper.length; i++) {
    // console.log(arrayDeProduse[i]);
    printeazaProdus(arrayDeProduse[i]);
  }
}

// function printeazaProduse(arrayDeProduse) {
//   arrayDeProduse.forEach((produs) => printeazaProdus(produs));
// }
