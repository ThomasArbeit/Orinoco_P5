const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const eMail = document.getElementById("eMail");
const address = document.getElementById("address");
const city = document.getElementById("city");
const form = document.getElementById("form");

form.addEventListener('submit', function(e){
    document.getElementById("error").textContent = "";
    
    e.preventDefault();
    
    formCheck();

    let userContact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("eMail").value, 
    }

    if (cartProducts === null || Object.keys(cartProducts)[0] === undefined){
        let cartError = document.getElementById("error");
        cartError.textContent = "Attention, votre panier est vide, vous ne pouvez pas valider votre commande !";
        document.getElementById("cartElement").appendChild(cartError);
    } else {
        let productsToPost = [];
        for (let object in cartProducts){
            for (let i = 0; i < cartProducts[object].quantity; i++){
                productsToPost.push(cartProducts[object]._id);
            }
        }

        let allObjectsToPost = {
            contact : userContact,
            products : productsToPost
        }

        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(allObjectsToPost),
            headers: {
                'Content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (Object.keys(json)[0] === undefined){
                console.log("l'envoi au serveur n'est pas correct")
            } else {
                let orderPrice = localStorage.getItem('totalPriceInCart');
                if(orderPrice === null || orderPrice === "0"){
                    console.log("Il n'existe pas d'objet dans le panier");
                } else {
                    let order = json;
                    order.price = orderPrice;
                    localStorage.clear();
                    localStorage.setItem('order', JSON.stringify(order));
                }
                setTimeout(redirection, 2000);
            }
            
        }) 
    }
    

})

function formCheck(){

    const lastNameValue = lastName.value;
    const firstNameValue = firstName.value;
    const eMailValue = eMail.value;
    const addressValue = address.value;
    const cityValue = city.value;

    if (lastNameValue === ''){
        setErrorFor(lastName, 'Veuillez entrer votre nom');
    } else {
        setSuccessFor(lastName, '');
    }

    if (firstNameValue === ''){
        setErrorFor(firstName, 'Veuillez entrer votre prénom');
    } else {
        setSuccessFor(firstName, '');
    }

    if (eMailValue === ''){
        setErrorFor(eMail, 'Veuillez entrer votre email');
    } else {
        setSuccessFor(eMail, '');
    }

    if (addressValue === ''){
        setErrorFor(address, 'Veuillez entrer votre adresse');
    } else {
        setSuccessFor(address, '');
    }

    if (cityValue === ''){
        setErrorFor(city, 'Veuillez entrer votre ville');
    } else {
        setSuccessFor(city, '');
        // setTimeout(redirection, 2000);
    }
}

function setErrorFor(input, message){
    const formBox = input.parentElement;
    const errorText = formBox.querySelector("div");
    const iconError = formBox.querySelector(".form__iconError");
    const iconSuccess = formBox.querySelector(".form__iconSuccess");
    errorText.textContent = message;
    input.classList ="form__input form__input--error";
    iconError.classList = "form__icon form__icon--visible form__iconError ";
    iconSuccess.classList = "form__icon form__iconSuccess";
}

function setSuccessFor(input, message){
    const formBox = input.parentElement;
    const iconError = formBox.querySelector(".form__iconError");
    const iconSuccess = formBox.querySelector(".form__iconSuccess");
    const errorText = formBox.querySelector("div");
    errorText.textContent = message;
    input.classList = "form__input form__input--success"
    iconSuccess.classList = "form__icon form__icon--visible form__iconSuccess";
    iconError.classList = "form__icon form__iconError ";
}

function redirection(){
    document.location.href='thanks.html';
    console.log("jai cliqué sur ce bouton et j'arrive 4 secondes après avoir cliqué")
}