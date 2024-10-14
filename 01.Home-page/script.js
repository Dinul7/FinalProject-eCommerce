const prodsWrapper = document.getElementById("prods-wrap");
const shopBtn = document.querySelector(".cart-logo");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartTotal = document.querySelector(".shopping-cart-total");
const bagBtn = document.querySelector(".fa-shopping-bag");
const banner = document.querySelector(".banner");
const clearBtn = document.querySelector(".fa-times-circle");
const cartProducts = document.querySelector(".shopping-cart-products");

const fetchGames = async function () {
  const rasp = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  let jocuri = await rasp.json();

  const jocuriArr = jocuri;
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

function printeazaProduse(arrayDeProduse) {
  const produsePentruCard = arrayDeProduse.slice(0, 8);
  // console.log(produsePentruCard);
  produsePentruCard.forEach(function (el) {
    printeazaProdus(el);
  });
}

const productsCart = [];

console.log(productsCart);

function addToCart(product) {
  productsCart.push(product);
  printeazaCart(productsCart);
}

// function printeazaElementCart(product) {
//   const shoppingCartProducts = document.querySelector(
//     ".shopping-cart-products"
//   );

//   const cartElement = document.createElement("div");
//   shoppingCartProducts.appendChild(cartElement);

//   cartElement.classList.add("cart-product");

//   cartElement.innerHTML = `
//   <img src="${product.thumb}" alt="Sofa">
//             <div class="cart-product-info">
//               <p>${product.title}</p>
//               <p><span></span> <span>X</span> $${product.salePrice}</p>
//             </div>
//   `;
// }

function printeazaCart(cartIntreg) {
  const shoppingCartProducts = document.querySelector(
    ".shopping-cart-products"
  );
  shoppingCartProducts.innerHTML = "";
  console.log(cartIntreg);

  cartFiltrat = cartIntreg.filter(
    (value, index, self) =>
      index === self.findIndex((el) => el.internalName === value.internalName)
  );

  // const count = Array.from(
  //   cartIntreg.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
  //   ([key, count]) => ({ key, count })
  // );

  cartFiltrat.forEach(function (prod) {
    // console.log(count);

    const count = Array.from(
      cartIntreg.reduce((r, c) => r.set(c, (r.get(c) || 0) + 1), new Map()),
      ([key, count]) => ({ key, count })
    );

    console.log(count);
    let nrBucati = count.count;
    const shoppingCartProducts = document.querySelector(
      ".shopping-cart-products"
    );

    const cartElement = document.createElement("div");
    shoppingCartProducts.appendChild(cartElement);

    cartElement.classList.add("cart-product");

    cartElement.innerHTML = `
    <img src="${prod.thumb}" alt="Sofa">
              <div class="cart-product-info">
                <p>${prod.title}</p>
                <p><span>${+nrBucati}</span><span>X</span> $${
      prod.salePrice
    }</p>
              </div>
    `;
  });

  shoppingCartTotal.innerHTML = `
  <p>Subtotal</p>
          <p>$ ${parseFloat(calculateTotal(cartIntreg)).toFixed(2)}</p>
  `;
}

function quantity(cart) {
  return cart.reduce((count, word) => {
    count[word.internalName] = (count[word.internalName] || 0) + 1;
    return count;
  }, {});
}

function calculateTotal(obj) {
  return obj.reduce((sum, curentElement) => sum + +curentElement.salePrice, 0);
}

// Event listeners
shopBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("no-show");
});

bagBtn.addEventListener("click", () => {
  shoppingCart.classList.add("no-show");
});

clearBtn.addEventListener("click", () => {
  cartProducts.innerHTML = "";
  clearBtn.style.visibility = "hidden";

  shoppingCartTotal.innerHTML = "";
});

const chooseHighScore = (steamScore, metacriticScore) =>
  steamScore > metacriticScore ? steamScore : metacriticScore;

const chosePlatform = (steam, metaCritic) =>
  steam > metaCritic ? "Steam" : "MetaCritic";
