/* -------------- JavaScript pour gérer la partie du panier de la page "Panier" ---------------------- */

// Récupération de l'élément "cartList" dans le DOM
let cartElement = document.getElementById("cartList");

// Récupération des objets dans le localStorage
let cartProducts = JSON.parse(localStorage.getItem("productsInCart"));

for (let object in cartProducts){

    let product = cartProducts[object];

    //Création d'une div contenant la liste des articles
    let cartArticles = document.createElement("div");
    cartArticles.classList = "cartArticles";
    cartElement.appendChild(cartArticles);

    //Création d'une div contenant le total du prix, ainsi que le bouton valider la commande
    let cartTotalAndValidate = document.createElement("div");
    cartTotalAndValidate.classList = "cartTotalAndValidate";
    cartElement.appendChild(cartTotalAndValidate);

    //Création d'un bouton pour supprimer l'élement
    let cartArticles__delete = document.createElement("button");
    cartArticles__delete.classList = "cartArticles__delete cartArticles__quantityButton";
    cartArticles__delete.innerHTML = '<i class="far fa-trash-alt"></i>';
    cartArticles.appendChild(cartArticles__delete);

    //Création de la div qui contiendra l'image du produit
    let cartArticles__img = document.createElement("div");
    cartArticles__img.classList = "cartArticles__img";
    cartArticles.appendChild(cartArticles__img);
    let cartArticlesImg = document.createElement("img");
    cartArticlesImg.src = product.imageUrl;
    cartArticles__img.appendChild(cartArticlesImg);

    //Création de la div contenant le nom, le prix unitaire, la quantité et les boutons pour incrémenter le nombre d'articles
    let cartArticles__productInfos = document.createElement("div");
    cartArticles__productInfos.classList = "cartArticles__productInfos";
    cartArticles.appendChild(cartArticles__productInfos);

    //Création d'un titre h2 contenant le nom de l'ours
    let cartArticles__productName = document.createElement("h2");
    cartArticles__productName.classList = "cartArticles__productName";
    cartArticles__productName.textContent = product.name;
    cartArticles__productInfos.appendChild(cartArticles__productName);

    //Création d'un paragraphe contenant le prix unitaire de l'ours en question
    let cartArticles__unitPrice = document.createElement("p");
    cartArticles__unitPrice.classList = "cartArticles__unitPrice";
    cartArticles__unitPrice.textContent = "Prix unitaire : " + product.price / 100 + ",OO €";
    cartArticles__productInfos.appendChild(cartArticles__unitPrice);

    //Création de la div contenant la quantité et les boutons pour ajouter ou enlever 
    let cartArticles__quantityAndButtons = document.createElement("div");
    cartArticles__quantityAndButtons.classList = "cartArticles__quantityAndButtons";
    cartArticles__productInfos.appendChild(cartArticles__quantityAndButtons);

    //Création d'un paragraphe qui contient la "Quantité : "
    let cartArticles__quantityText = document.createElement("p");
    cartArticles__quantityText.classList = "cartArticles__quantityText";
    cartArticles__quantityText.textContent = "Quantité : ";
    cartArticles__quantityAndButtons.appendChild(cartArticles__quantityText);

    //Création d'un bouton "-" pour enlever 1 à la quantité de l'ours en question
    let cartArticles__quantityMinus = document.createElement("button");
    cartArticles__quantityMinus.classList = "cartArticles__quantityMinus cartArticles__quantityButton";
    cartArticles__quantityMinus.id = product.name + "minus";
    cartArticles__quantityMinus.textContent = "-";
    cartArticles__quantityAndButtons.appendChild(cartArticles__quantityMinus);

    //Création d'un paragraphe contenant la quantité de l'ours en question
    let cartArticles__quantityNumber = document.createElement("p");
    cartArticles__quantityNumber.classList = "cartArticles__quantityNumber";
    cartArticles__quantityNumber.textContent = product.quantity;
    cartArticles__quantityAndButtons.appendChild(cartArticles__quantityNumber);
    // Si la quantité est inférieure à 2, on fait en sorte qu'on ne puisse plus cliquer sur le bouton (disabled)
    if (product.quantity < 2){
        cartArticles__quantityMinus.disabled = true; 
        cartArticles__quantityMinus.classList = "cartArticles__quantityMinus cartArticles__quantityButton cartArticles__quantityButton--disabled";
    }

    //Création du bouton "+" qui permet d'ajouter 1 à la quantité de l'ours en question
    let cartArticles__quantityPlus = document.createElement("button");
    cartArticles__quantityPlus.classList = "cartArticles__quantityplus cartArticles__quantityButton";
    cartArticles__quantityPlus.id = product.name + "plus";
    cartArticles__quantityPlus.textContent = "+";
    cartArticles__quantityAndButtons.appendChild(cartArticles__quantityPlus);

    //Création du paragraphe qui contient le prix total du produit
    let cartArticles__totalPrice = document.createElement("p");
    cartArticles__totalPrice.classList = "cartArticles__totalPrice";
    cartArticles__totalPrice.textContent = "Prix total : " + product.quantity * product.price / 100 + ",OO €";
    cartArticles.appendChild(cartArticles__totalPrice);

    

    /* --------- FONCTIONS POUR AJOUTER OU SUPPRIMER DES ELEMENTS --------- */

    // Récupération du prix total dans le localStorage
    let totalPrice = localStorage.getItem("totalPriceInCart");
    totalPrice = JSON.parse(totalPrice);

    // Fonction qui actualise le prix total d'un encart pour l'objet en question (en fonction de sa quantité)
    function totalPriceUpdate(){
        cartArticles__totalPrice.textContent = "Prix total : " + (cartProducts[object].quantity * cartProducts[object].price /100) + ",OO €";
    };

    // Fonction qui actualise le prix total de tous les ours (en additionnant)
    function cartTotalPriceMinus(){
        let totalPrice = localStorage.getItem("totalPriceInCart");
        totalPrice = JSON.parse(totalPrice);
        totalPrice = totalPrice - (cartProducts[object].price / 100);
        localStorage.setItem("totalPriceInCart", totalPrice);
        cartPrice.textContent ="Prix total de votre commande : " + localStorage.getItem("totalPriceInCart") + ",00 €";
    }

    // Fonction qui actualise le prix total de tous les ours (lors de la soustraction)
    function cartTotalPriceAdd(){
        let totalPrice = localStorage.getItem("totalPriceInCart");
        totalPrice = JSON.parse(totalPrice);
        totalPrice = totalPrice + (cartProducts[object].price / 100);
        localStorage.setItem("totalPriceInCart", totalPrice);
        cartPrice.textContent ="Prix total de votre commande : " + localStorage.getItem("totalPriceInCart") + ",00 €";
    }

    // Fonction qui actualise le prix total de tous les ours (lors de la suppression d'un objet peu importe la quantité)
    function cartTotalPriceRemoveItem(){
        let totalPrice = localStorage.getItem("totalPriceInCart");
        totalPrice = JSON.parse(totalPrice);
        totalPrice = totalPrice - (cartProducts[object].price / 100) * cartProducts[object].quantity;
        localStorage.setItem("totalPriceInCart", totalPrice);
        cartPrice.textContent ="Prix total de votre commande : " + localStorage.getItem("totalPriceInCart") + ",00 €";
    }

    // Ajout d'une écoute d'évenement lors du clic sur le bouton "poubelle"
    cartArticles__delete.addEventListener('click', function(e){
        cartTotalPriceRemoveItem();
        delete cartProducts[object];
        localStorage.setItem("productsInCart", JSON.stringify(cartProducts));

        let numberOfThisProduct = cartArticles__quantityNumber.textContent;
        let totalNumberOfProduct = localStorage.getItem("numberOfProductsInCart");
        totalNumberOfProduct = totalNumberOfProduct - numberOfThisProduct;
        localStorage.setItem("numberOfProductsInCart", totalNumberOfProduct);
        cartNumbers.textContent = localStorage.getItem("numberOfProductsInCart");

        cartElement.removeChild(cartArticles);
        e.preventDefault();

    })
    
    // Ajout d'une écoute d'évenement lors du clic sur le bouton "-"
    cartArticles__quantityMinus.addEventListener('click', function(e){
        cartProducts[object].quantity--;
        cartArticles__quantityNumber.textContent = cartProducts[object].quantity;
        totalPriceUpdate();
        cartTotalPriceMinus();

        localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
        if (cartProducts[object].quantity == 1){
            cartArticles__quantityMinus.disabled = true;
            cartArticles__quantityMinus.classList = "cartArticles__quantityMinus cartArticles__quantityButton cartArticles__quantityButton--disabled";
        } else {
            cartArticles__quantityMinus.disabled = false;
        }
        numberOfProductsInCartMinus(); 
        e.preventDefault();
    })

    // Ajout d'une écoute d'évenement lors du clic sur le bouton "+"
    cartArticles__quantityPlus.addEventListener('click', function(e){
        cartProducts[object].quantity++;
        cartArticles__quantityNumber.textContent = cartProducts[object].quantity;
        totalPriceUpdate();
        cartTotalPriceAdd();

        localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
        if (cartProducts[object].quantity > 1){
            cartArticles__quantityMinus.disabled = false;
            cartArticles__quantityMinus.classList = "cartArticles__quantityMinus cartArticles__quantityButton";
        } else {
            cartArticles__quantityMinus.disabled = true;
        }
        numberOfProductsInCartAdd();
        e.preventDefault();
    })
};

//Création du paragrpahe qui contient le prix total du panier
let cartPrice = document.createElement("p");
cartPrice.classList = "cartPrice";
if (localStorage.getItem("totalPriceInCart") === null){
    cartPrice.textContent ="Prix total de votre commande : 00,00 €";
} else {
    cartPrice.textContent ="Prix total de votre commande : " + localStorage.getItem("totalPriceInCart") + ",00 €";
}
cartElement.appendChild(cartPrice);

