let cartNumbers = document.querySelector("#cart span");
cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");

function numberOfProductsInCartAdd(){
    let numberOfProducts = localStorage.getItem("numberOfProductsInCart");
    numberOfProducts = JSON.parse(numberOfProducts);
    if (numberOfProducts == null){
      numberOfProducts = 1;
      localStorage.setItem("numberOfProductsInCart", numberOfProducts);
    } else {
      numberOfProducts++;
      localStorage.setItem("numberOfProductsInCart", numberOfProducts);
    }
    cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");
}

function numberOfProductsInCartMinus(){
    let numberOfProducts = localStorage.getItem("numberOfProductsInCart");
    numberOfProducts = JSON.parse(numberOfProducts);
    if (numberOfProducts == null){
      numberOfProducts = 1;
      localStorage.setItem("numberOfProductsInCart", numberOfProducts);
    } else {
      numberOfProducts--;
      localStorage.setItem("numberOfProductsInCart", numberOfProducts);
    }
    cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");
}




