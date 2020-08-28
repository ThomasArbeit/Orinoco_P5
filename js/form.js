/* ----------- JavaScript pour gérer le formulaire de contact --------------- */


// Récupération des éléments du DOM correspondants au formulaire
const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const eMail = document.getElementById("eMail");
const address = document.getElementById("address");
const city = document.getElementById("city");
const form = document.getElementById("form");


// Ajout d'une écoute d'évenement lors du submit du formulaire
form.addEventListener('submit', function(e){

    // Assignation par défaut du texte d'erreur 
    document.getElementById("error").textContent = "";
    
    e.preventDefault();
    
    // Vérification des champs du formulaire
    formCheck();


    // Assignation des inputs à l'objet userContact
    let userContact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("eMail").value, 
    }

    // Si cartProducts n'existe pas, ou qu'il est vide, signaler que le panier est vide !
    if (cartProducts === null || Object.keys(cartProducts)[0] === undefined){
        let cartError = document.getElementById("error");
        cartError.textContent = "Attention, votre panier est vide, vous ne pouvez pas valider votre commande !";
        document.getElementById("cartElement").appendChild(cartError);

    // Sinon créer le tableau contenant les _id des objets 
    } else {
        // Initialisation du tableau
        let productsToPost = [];
        // Pour tous les objets dans cartProducts
        for (let object in cartProducts){
            // Pour la longueur de la quantité
            for (let i = 0; i < cartProducts[object].quantity; i++){
                // Ajouter l'_id de l'objet autant de fois ce même objet dans cartProducts
                productsToPost.push(cartProducts[object]._id);
            }
        }

        // Assignation de userContact et productsToPost pour l'envoyer au backend
        let allObjectsToPost = {
            contact : userContact,
            products : productsToPost
        }

        // Methode POST pour envoyer l'objet allObjectsToPost
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(allObjectsToPost),
            headers: {
                'Content-type' : 'application/json'
            }
        })

        // Récupération de la réponse du backend
        .then(response => response.json())
        .then(json => {
            console.log(json);

            // Depuis l'objet retourné par le backend
            // Si l'objet est vide, console.log que l'envoi de l'objet allObjectToPost n'est pas correct
            if (Object.keys(json)[0] === undefined){
                console.log("l'envoi au serveur n'est pas correct")

            // Sinon assignation du prix total du localStorage a une variable orderPrice
            } else {
                let orderPrice = localStorage.getItem('totalPriceInCart');
                if(orderPrice === null || orderPrice === "0"){
                    console.log("Il n'existe pas d'objet dans le panier");
                } else {
                    let order = json;
                    order.price = orderPrice;
                    // Suppression du localStorage pour ne plus avoir de panier après validation
                    localStorage.clear();
                    // Ajout de l'objet order dans le localStorage qui contient la réponse du backend ainsi que le prix total
                    localStorage.setItem('order', JSON.stringify(order));
                }
                // Laisser le temps au navigateur d'indiquer que tout est bon, puis rediriger vers la page de remerciement
                setTimeout(redirection, 2000);
            }
            
        }) 
    }
    

})


/* --------------- Fonctions vérifiant les inputs du formulaire --------------- */


function formCheck(){

    const lastNameValue = lastName.value;
    const firstNameValue = firstName.value;
    const eMailValue = eMail.value;
    const addressValue = address.value;
    const cityValue = city.value;
    const regexEmail = /.+@.+\..+/;

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
    }
    else if (!regexEmail.test(eMailValue)){
        setErrorFor(eMail, 'Attention votre adresse est invalide')
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