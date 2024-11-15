const prodsWrapper = document.getElementById("prods-wrap");
const shopBtn = document.querySelector(".cart-logo");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartTotal = document.querySelector(".shopping-cart-total");
const bagBtn = document.querySelector(".fa-shopping-bag");
const banner = document.querySelector(".banner");
const clearBtn = document.querySelector(".fa-times-circle");
const cartProducts = document.querySelector(".shopping-cart-products");
const pageBtns = document.querySelectorAll(".page-btn");
const next = document.querySelector(".next-btn");
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
  const colWrapper = document.createElement("div");
  const prodDiv = document.createElement("div");

  const hoverDiv = document.createElement("div");
  const wrapDiv = document.createElement("div");
  const wrappedBoxDiv = document.createElement("div");
  const addButton = document.createElement("button");
  const hoverActions = document.createElement("div");

  colWrapper.classList.add("col-wrapper");
  prodDiv.classList.add("product-card");
  hoverDiv.classList.add("hover-wrapper");
  wrapDiv.classList.add("wrap");
  wrappedBoxDiv.classList.add("wrapper-box");
  addButton.classList.add("hover-add-to-cart");
  hoverActions.classList.add("hover-actions");
  addButton.innerText = "Add to Cart";
  hoverActions.innerHTML = `
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
  `;

  prodDiv.innerHTML = `
      <img src="${product.thumb}" />
                <div class="info">
                  <h3>${product.title}</h3>
                  <p>${chosePlatform(
                    product.steamRatingPercent,
                    product.metacriticScore
                  )} score: ${chooseHighScore(
    product.steamRatingPercent,
    product.metacriticScore
  )}</p>
                  <div class="price">
                    <p>${product.salePrice}$</p>
                    <p class="discount">${product.normalPrice}$</p>
                  </div>
                </div>

      `;

  colWrapper.appendChild(hoverDiv);
  hoverDiv.appendChild(wrapDiv);
  wrapDiv.appendChild(wrappedBoxDiv);
  wrappedBoxDiv.appendChild(addButton);
  wrappedBoxDiv.appendChild(hoverActions);
  colWrapper.appendChild(prodDiv);
  prodsWrapper.appendChild(colWrapper);

  addButton.addEventListener("click", function () {
    addToCart(product);
  });
};

const storedData = localStorage.getItem("cart");
const userData = JSON.parse(storedData);
// console.log(storedData);
// console.log(userData);

function cartAfterRefresh(userData) {
  if (userData !== null) {
    printeazaCart(userData);
  } else {
    return;
  }
}
cartAfterRefresh(userData);

const productsCart = [];

function addToCart(product) {
  productsCart.push(product);
  localStorage.setItem("cart", JSON.stringify(productsCart));
  printeazaCart(productsCart);
}

function printeazaCart(cartIntreg) {
  const shoppingCartProducts = document.querySelector(
    ".shopping-cart-products"
  );

  shoppingCartProducts.innerHTML = "";
  const iElem = document.createElement("i");
  iElem.classList.add("fa");
  iElem.classList.add("fa-times-circle");
  shoppingCartProducts.appendChild(iElem);

  cartFiltrat = cartIntreg.filter(
    (value, index, self) =>
      index === self.findIndex((el) => el.internalName === value.internalName)
  );

  cartFiltrat.forEach(function (prod) {
    // nrbucati(cartIntreg);
    const shoppingCartProducts = document.querySelector(
      ".shopping-cart-products"
    );
    const cartElement = document.createElement("div");
    shoppingCartProducts.appendChild(cartElement);

    cartElement.classList.add("cart-product");
    //puse pe cart element
    const imgEl = document.createElement("img");
    imgEl.src = prod.thumb;
    const cartProductInfo = document.createElement("div");
    cartProductInfo.classList.add("cart-product-info");

    //puse pe cart product info
    const firstP = document.createElement("p");
    firstP.innerText = prod.title;

    const secondP = document.createElement("p");
    const firstSpan = document.createElement("span");
    const secondSpan = document.createElement("span");
    const thirdSpan = document.createElement("span");
    firstSpan.classList.add("quant-number");
    secondSpan.classList.add("ics");
    thirdSpan.classList.add("prod-sale-price");

    secondP.appendChild(firstSpan);
    secondP.appendChild(secondSpan);
    secondP.appendChild(thirdSpan);

    firstSpan.innerText = countValues(cartIntreg, prod.title);
    secondSpan.innerText = "X";
    thirdSpan.innerText = "$ " + prod.salePrice;

    cartProductInfo.appendChild(firstP);
    cartProductInfo.append(secondP);

    cartElement.appendChild(imgEl);
    cartElement.appendChild(cartProductInfo);
  });

  shoppingCartTotal.innerHTML = `
  <p>Subtotal</p>
          <p>$ ${parseFloat(calculateTotal(cartIntreg)).toFixed(2)}</p>
  `;

  iElem.addEventListener("click", () => {
    cartProducts.innerHTML = "";
    shoppingCartTotal.innerHTML = "";
    localStorage.clear();
  });
}

function calculateTotal(obj) {
  return obj.reduce((sum, curentElement) => sum + +curentElement.salePrice, 0);
}

function countValues(arr, countItem) {
  let count = 0;
  arr.forEach((el) => {
    if (el.title == countItem) {
      count++;
    }
  });
  return count;
}

const chooseHighScore = (steamScore, metacriticScore) =>
  steamScore > metacriticScore ? steamScore : metacriticScore;

const chosePlatform = (steam, metaCritic) =>
  steam > metaCritic ? "Steam" : "MetaCritic";

function printeazaProduse(arrayDeProduse) {
  // const produsePentruCard = arrayDeProduse;
  const produseTotale = arrayDeProduse;
  const produsePentruCard = arrayDeProduse.slice(0, 20);
  const results = document.querySelector(".results");
  results.innerHTML = `<p>Showing ${produsePentruCard.length} of ${produseTotale.length} results</p>`;
  produsePentruCard.forEach(function (el) {
    printeazaProdus(el);
  });
}

shopBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("no-show");
});

bagBtn.addEventListener("click", () => {
  shoppingCart.classList.add("no-show");
});

let currActive = 0;

pageBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currActive = idx;
    console.log(currActive);
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");
  });
});

// next.addEventListener("click", () => {
//   currActive++;
//   if (currActive > pageBtns.length) {
//     currActive = pageBtns.length;
//   }
//   updateActive();
// });

// function updateActive() {
//   pageBtns.forEach((btn, idx) => {
//     console.log(btn);
//     if (idx < currActive) {
//       console.log(`Indexul este ${idx}`);
//       console.log(`Curent active este ${currActive}`);
//       btn.classList.add("active");
//     } else if (currActive > idx) {
//       btn.classList.remove("active");
//     }
//     if (currActive > idx) {
//       btn.classList.remove("active");
//     } else if (currActive > idx) {
//       btn.classList.add("active");
//     }
//   });

// }
