const prodsWrapper = document.getElementById("prods-wrap");
const shopBtn = document.querySelector(".cart-logo");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartTotal = document.querySelector(".shopping-cart-total");
const bagBtn = document.querySelector(".fa-shopping-bag");
const banner = document.querySelector(".banner");
const clearBtn = document.querySelector(".fa-times-circle");
const cartProducts = document.querySelector(".shopping-cart-products");
const placeOrderBtn = document.getElementById("order-btn");

const orderProducts = document.querySelector(".order-products");
const subtotalEl = document.querySelector(".subtotal");
const discountEl = document.querySelector(".discount-checkout");
const totalEl = document.querySelector(".total");

// const imputsInfos = document.querySelectorAll("input");

const fetchGames = async function () {
  const resp = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  const jocuri = resp.json();

  console.log(jocuri);
  const jocuriArr = jocuri;
  printeazaProduse(jocuriArr);
  console.log(jocuriArr);
};

function printeazaProduse(arrayDeProduse) {
  const produsePentruCard = arrayDeProduse.slice(0, 8);
  // console.log(produsePentruCard);
  produsePentruCard.forEach(function (el) {
    printeazaProdus(el);
  });
}

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

  filtreazaCart(cartIntreg).forEach(function (prod) {
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
    orderProducts.innerHTML = "";
    subtotalEl.innerHTML = "";
    discountEl.innerHTML = "";
    totalEl.innerHTML = "";
  });

  printeazaCheckout(cartIntreg);
}

function printeazaCheckout(cart) {
  // const orderProducts = document.querySelector(".order-products");
  // const subtotalEl = document.querySelector(".subtotal");
  // const discountEl = document.querySelector(".discount-checkout");
  // const totalEl = document.querySelector(".total");
  console.log(cart);

  filtreazaCart(cart).forEach(function (el) {
    const productCheckout = document.createElement("div");
    productCheckout.classList.add("product");
    productCheckout.innerHTML = `
    <p>${el.title} <small> X  ${countValues(cart, el.title)}</small></p>
                  <p>$ ${el.normalPrice}</p>
    `;

    orderProducts.appendChild(productCheckout);

    subtotalEl.innerHTML = `
    <h5>Subtotal</h5>
                <p>$ ${parseFloat(calculateTotalWitoutDiscount(cart)).toFixed(
                  2
                )}</p>
                
    `;

    discountEl.innerHTML = `
    <h5>Discount</h5>
    <p>$ ${parseFloat(
      parseFloat(calculateTotalWitoutDiscount(cart).toFixed(1)) -
        parseFloat(calculateTotal(cart).toFixed(2))
    )}
    `;

    totalEl.innerHTML = `
    <h5>Total</h5>
                <p>$ ${parseFloat(calculateTotal(cart)).toFixed(2)}</p>
    `;
  });
}

function filtreazaCart(cartDeFiltrat) {
  return cartDeFiltrat.filter(
    (value, index, self) =>
      index === self.findIndex((el) => el.internalName === value.internalName)
  );
}

function calculateTotal(obj) {
  return obj.reduce((sum, curentElement) => sum + +curentElement.salePrice, 0);
}
function calculateTotalWitoutDiscount(obj) {
  return obj.reduce(
    (sum, curentElement) => sum + +curentElement.normalPrice,
    0
  );
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

shopBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("no-show");
});

bagBtn.addEventListener("click", () => {
  shoppingCart.classList.add("no-show");
});

placeOrderBtn.addEventListener("click", () => {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const street = document.getElementById("street");
  const town = document.getElementById("town");

  console.log(userData);
  let jocuriCumparate = [];
  userData.forEach((el) => {
    jocuriCumparate.push(el.title + "");
  });

  if (
    firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    street.value.length == 0 ||
    town.value.length == 0
  ) {
    alert("You need to fill all fileds in order to finish your purchase!");
  } else {
    console.log(
      `You Bought ${
        jocuriCumparate.length
      } games : ${jocuriCumparate} all for $ ${parseFloat(
        calculateTotal(userData)
      ).toFixed(2)}`
    );

    document.querySelector(".order-products").innerHTML = "";
    document.querySelector(".subtotal").innerHTML = "";
    document.querySelector(".discount-checkout").innerHTML = "";
    document.querySelector(".total").innerHTML = "";
    document.querySelector(".shopping-cart-products").innerHTML = "";
    document.querySelector(".shopping-cart-total").innerHTML = "";
  }

  localStorage.clear();
});
