// FOR LOOP GENERATOR CARD when i had hard coded cards
//   for (i = 0; i < product.length; i++) {
//     const colWrapper = document.createElement("div");
//     const hoverDiv = document.createElement("div");
//     const prodDiv = document.createElement("div");
//     colWrapper.classList.add("col-wrapper");
//     prodDiv.classList.add("product-card");
//     hoverDiv.classList.add("hover-wrapper");

//     prodsWrapper.appendChild(colWrapper);

//     // console.log(addHover);

//     hoverDiv.innerHTML = `
//      <div class="wrap">
//       <div class="wrapper-box">
//      <button class="hover-add-to-cart">Add To cart</button>
//      <div class="hover-actions">
//        <div class="icons">
//          <i class="fa fa-share-alt"></i>
//          <p>Share</p>
//        </div>
//        <div class="icons">
//          <i class="fa fa-balance-scale"></i>
//          <p>Compare</p>
//        </div>
//        <div class="icons">
//          <i class="fa fa-heart-o"></i>
//          <p>Like</p>
//        </div>
//      </div>
//    </div>
//  </div>

//     `;

//     prodDiv.innerHTML = `
//     <img src="${product[i].thumb}" />
//               <div class="info">
//                 <h3>${product[i].title}</h3>
//                 <p>${chosePlatform(
//                   product[i].steamRatingPercent,
//                   product[i].metacriticScore
//                 )} score: ${chooseHighScore(
//       product[i].steamRatingPercent,
//       product[i].metacriticScore
//     )}</p>
//                 <div class="price">
//                   <p>${product[i].salePrice}$</p>
//                   <p class="discount">${product[i].normalPrice}$</p>
//                 </div>
//               </div>

//     `;

//     colWrapper.appendChild(hoverDiv);
//     colWrapper.appendChild(prodDiv);
//   }
