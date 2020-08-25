let orderElement = localStorage.getItem("order");
orderElement = JSON.parse(orderElement);
let orderContact = orderElement.contact;
let orderProducts = orderElement.products;
let orderId = orderElement.orderId;
let orderPrice = orderElement.price;
let thankElement = document.getElementById("thank");


let thankingText = document.createElement("p");
thankingText.textContent = "Merci d'avoir acheté nos ours, vous avez commandé : ";
thankElement.appendChild(thankingText);

let products = document.createElement("ol");
products.id = "order";
thankElement.appendChild(products);

let totalPrice = document.createElement("p");
totalPrice.textContent = "Pour un prix total de : " + orderPrice + " ,00 €";
thankElement.appendChild(totalPrice);

let idOfOrder = document.createElement("p");
idOfOrder.textContent = "Voici votre numéro de suivi pour votre achat : " + orderId;
thankElement.appendChild(idOfOrder);




let objectProductsNumber = {};
for (let i = 0; i < orderProducts.length; i++){
    if (objectProductsNumber[orderProducts[i].name]){
        objectProductsNumber[orderProducts[i].name]++;
    } else {
        objectProductsNumber[orderProducts[i].name] = 1;
    }
}

console.log(objectProductsNumber);
console.log(Object.values(objectProductsNumber));

for (let object in objectProductsNumber){
    console.log("Vous avez " + object + " Quantité : " + objectProductsNumber[object] )
    
    let recapProduct = document.createElement("li");
    recapProduct.textContent = object + " x " + objectProductsNumber[object];
    products.appendChild(recapProduct);
}
console.log("Pour un prix total de : " + orderPrice + ",00€");

// Gestion de la fermeture de la page web
window.addEventListener("beforeunload", function (e) {
    localStorage.clear();
});