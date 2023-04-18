console.log("Script loaded");

const products = getAvailableProducts();

// my codes goes here
const productContainer = document.getElementById("productDiv");
const searchProduct = document.getElementById("searchProduct");
const maxPrice = document.getElementById("maxPrice");
const productUl = document.createElement("ul");
productContainer.appendChild(productUl);

function displaySearchedProduct(searchedProducts) {
  while (productUl.children.length != 0) {
    productUl.removeChild(productUl.childNodes[0]);
  }
  searchedProducts.forEach((obj) => {
    const titleLi = document.createElement("li");
    const titleH3 = document.createElement("h3");
    titleH3.innerText = obj.name;
    titleLi.append(titleH3);
    productUl.appendChild(titleLi);
    const priceLi = document.createElement("li");
    priceLi.innerHTML = `price: ${obj.price}`;
    productUl.appendChild(priceLi);
    const ratingLi = document.createElement("li");
    ratingLi.innerHTML = `Rating: ${obj.rating}`;
    productUl.appendChild(ratingLi);
  });
  productContainer.appendChild(productUl);
}

function searchByProductNameAndPrice() {
  const searchText = document.getElementById("searchProduct").value;
  const searchPrice = document.getElementById("maxPrice").value;
  if (searchText != "" && searchPrice != "") {
    const pattern = new RegExp(searchText, "gim");
    const searchedProducts = products.filter(
      (product) => pattern.test(product.name) && product.price <= searchPrice
    );
    displaySearchedProduct(searchedProducts);
  } else if (searchText != "" && searchPrice == "") {
    const pattern = new RegExp(searchText, "gim");
    const searchedProducts = products.filter((product) =>
      pattern.test(product.name)
    );
    displaySearchedProduct(searchedProducts);
  } else if (searchText == "" && searchPrice != "") {
    const searchedProducts = products.filter(
      (product) => product.price <= searchPrice
    );
    displaySearchedProduct(searchedProducts);
  } else {
    while (productUl.children.length != 0) {
      productUl.removeChild(productUl.childNodes[0]);
    }
  }
}

searchProduct.addEventListener("input", searchByProductNameAndPrice);
maxPrice.addEventListener("input", searchByProductNameAndPrice);
