const productCard = document.querySelectorAll(".product-card");

const fetchGames = async function () {
  const rasp = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  let jocuri = await rasp.json();

  //   console.log(jocuri);

  displayProducts(jocuri);
};

fetchGames();

const displayProduct = function (product) {
  console.log(product);
  // const productCard = document.querySelectorAll(".product-card");
  // productCard.forEach((card) => {
  //   card.innerHTML = `
  //      <img src="${prod.thumb}" />
  //            <div class="info">
  //              <h3>${prod.title}</h3>
  //              <p>Sylish cafe chair</p>
  //             <div class="price">
  //                 <p>Rp 2.500.000</p>
  //                 <p class="discount">Rp 3.500.000</p>
  //              </div>
  //            </div>
  // `;
};
//   const productCard = document.querySelectorAll(".product-card");
//   productCard.forEach((card) => {
//     card.innerHTML = `
//     <img src="${product.thumb}" />
//                <div class="info">
//                  <h3>${product.title}</h3>
//                  <p>Sylish cafe chair</p>
//                 <div class="price">
//                     <p>Rp 2.500.000</p>
//                     <p class="discount">Rp 3.500.000</p>
//                  </div>
//                </div>
//     `;

//   productCard.innerHTML = `
//   <img src="${product.thumb}" />
//               <div class="info">
//                 <h3>${product.title}</h3>
//                 <p>Sylish cafe chair</p>
//                <div class="price">
//                    <p>Rp 2.500.000</p>
//                    <p class="discount">Rp 3.500.000</p>
//                 </div>
//               </div>
//   `;

function displayProducts(productsArr) {
  productsArr.forEach((product) => {
    displayProduct(product);
    // console.log(product);
  });
}

displayProducts(productCard);
