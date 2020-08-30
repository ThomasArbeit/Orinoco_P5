/* ------------ Fonctions utilisées sur plusieurs pages ------------- */


let cartNumbers = document.querySelector("#cart span");
cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");

let numberOfProducts = localStorage.getItem("numberOfProductsInCart");
numberOfProducts = JSON.parse(numberOfProducts);


function numberOfProductsInCartAddorMinus(param){
  if (numberOfProducts == null){
    numberOfProducts = 1;
    localStorage.setItem("numberOfProductsInCart", numberOfProducts);
  } else {
    param;
    localStorage.setItem("numberOfProductsInCart", numberOfProducts);
  }
  cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");
}


