const colWrapper = document.querySelectorAll(".col-wrapper");
const shopBtn = document.querySelector(".cart-logo");
const shoppingCart = document.querySelector(".shopping-cart");
const bagBtn = document.querySelector(".fa-shopping-bag");
const banner = document.querySelector(".banner");

const fetchGames = async function () {
  const rasp = await fetch("https://fakestoreapi.com/products");
  let jocuri = await rasp.json();

  const jocuriArr = jocuri;

  console.log(jocuriArr);
};

// const fetchGames = async function () {
//   const resp = await fetch(
//     "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
//   );
//   const jocuri = resp.json();

//   console.log(jocuri);
// };

fetchGames();

shopBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("no-show");
});

bagBtn.addEventListener("click", () => {
  shoppingCart.classList.add("no-show");
});
