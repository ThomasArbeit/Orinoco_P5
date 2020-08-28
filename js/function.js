/* ------------ Fonctions utilisées sur plusieurs pages ------------- */


let cartNumbers = document.querySelector("#cart span");
cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");


// Fonction pour ajouter 1 au total d'objets contenus dans le panier
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


// Fonction pour enlever 1 au total d'objets contenus dans le panier
function numberOfProductsInCartMinus(){
    let numberOfProducts = localStorage.getItem("numberOfProductsInCart");
    numberOfProducts = JSON.parse(numberOfProducts);
    numberOfProducts--;
    localStorage.setItem("numberOfProductsInCart", numberOfProducts);

    cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");
}




