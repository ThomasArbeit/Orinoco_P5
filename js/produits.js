let urlId = window.location.search;

fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(json => {
  let teddies = json;
  let productElement = document.getElementById("produit");
  let titleTeddyPage = document.getElementById("teddyName"); 

  
  for (let i = 0; i < teddies.length; i++){
      if (urlId === "?id=" + teddies[i]._id){

          // Création du titre du produit de la page
          let productName = document.createElement("h1");
          productName.textContent = "Notre Ours : " + teddies[i].name;
          titleTeddyPage.appendChild(productName);

          // Création de la description du produit de la page
          let productDescription = document.createElement("h2");
          productDescription.textContent = teddies[i].description;
          titleTeddyPage.appendChild(productDescription);

          // Création d'une div pour contenir les infos
          let productBloc = document.createElement("div");
          productBloc.classList = "productBloc";
          productElement.appendChild(productBloc);

          // Création de la div qui contiendra l'image du produit
          let productBloc__img = document.createElement("div");
          productBloc__img.classList = "productBloc__img";
          productBloc.appendChild(productBloc__img);


          // Création de la div qui contiendra le contenu textuel
          let productBloc__info = document.createElement("div");
          productBloc__info.classList = "productBloc__info";
          productBloc.appendChild(productBloc__info);

          // Création de la description interne de l'ours
          let productBloc__descriptionTitle = document.createElement("h2");
          productBloc__descriptionTitle.classList = "productBloc__title";
          productBloc__descriptionTitle.textContent = "Description :";
          productBloc__info.appendChild(productBloc__descriptionTitle);

          let productBloc__descriptionText = document.createElement("p");
          productBloc__descriptionText.classList = "productBloc__descriptionText";
          productBloc__descriptionText.textContent = teddies[i].description;
          productBloc__info.appendChild(productBloc__descriptionText);

          // Création de la sélection de changement de couleurs
          let productBloc__colorsTitle = document.createElement("h2");
          productBloc__colorsTitle.classList = "productBloc__title";
          productBloc__colorsTitle.textContent = "Couleurs :";
          productBloc__info.appendChild(productBloc__colorsTitle);

          let productColors = document.createElement("select");
          productColors.id = teddies[i].name + "colors";
          productColors.classList = "productBloc__colorChoices";
          productColors.name = "couleurs";
          
          let productColorsLabel = document.createElement("label");
          productColorsLabel.textContent = "Choisissez la couleur de votre choix."
          productColorsLabel.classList = "productBloc__colorParagraphe"
          productBloc__info.appendChild(productColorsLabel);
          productBloc__info.appendChild(productColors);

          let teddyOnPageColors = teddies[i].colors;
          for (let j = 0; j < teddyOnPageColors.length; j++){
            let productColorsChoices = document.createElement("option")
            productColorsChoices.value = teddyOnPageColors[j];
            productColorsChoices.textContent = teddyOnPageColors[j];
            productColors.appendChild(productColorsChoices);
          }
          
          // Création de la balise image
          let productImg = document.createElement("img");
          productImg.src = teddies[i].imageUrl;
          productBloc__img.appendChild(productImg);

          // Création de la div contenant le bouton add to cart et le prix
          let productBloc__addCartAndPrice = document.createElement("div");
          productBloc__addCartAndPrice.classList = "productBloc__addCartAndPrice";
          productBloc__info.appendChild(productBloc__addCartAndPrice);

          // Création de l'affichage du prix unitaire du produit
          let productBloc__priceTitle = document.createElement("h2");
          productBloc__priceTitle.classList = "productBloc__title productBloc__title--noMargin";
          productBloc__priceTitle.textContent = "Prix unitaire :";
          productBloc__addCartAndPrice.appendChild(productBloc__priceTitle);

          let productPrice = document.createElement("p");
          productPrice.textContent = teddies[i].price / 100 + " €";
          productPrice.classList = "productBloc__price";
          productBloc__addCartAndPrice.appendChild(productPrice);

          // Création du bouton Ajout au panier
          let productBloc__addToCart = document.createElement("button");
          productBloc__addToCart.classList = "productBloc__addToCart button";
          productBloc__addToCart.id = "addToCart";
          productBloc__addToCart.textContent = "Ajouter au Panier";
          productBloc__addCartAndPrice.appendChild(productBloc__addToCart);
      
          

          // Création d'une écoute d'évenement on click du bouton addToCart
          let addToCart = document.getElementById("addToCart");


          addToCart.addEventListener('click', function(e){

            // Définition de l'objet affiché sur la page en une variable teddyOnPage
            let teddyOnPage = teddies[i];

            // Définition et attribution de la valeur du localStorage dans isIncart
            let isInCart = localStorage.getItem('productsInCart');
            isInCart = JSON.parse(isInCart);

            function totalPriceInCartUpdate(){
              let totalPriceInCart = localStorage.getItem("totalPriceInCart");
              totalPriceInCart = JSON.parse(totalPriceInCart);
              totalPriceInCart = totalPriceInCart + teddies[i].price / 100;
              localStorage.setItem("totalPriceInCart", totalPriceInCart);
            }

            totalPriceInCartUpdate();

            // Si isInCart existe alors augmenter la quantité de 1
            if (isInCart != null) {
              console.log("le localStorage contient un objet");
              if (isInCart[teddyOnPage.name] == undefined) {
                console.log("J'ajoute ce nouvel ours au localStorage");
                teddyOnPage.quantity = 1;
                isInCart = {
                  ...isInCart,
                  [teddyOnPage.name] : teddyOnPage
                };
              } else {
                console.log("J'ajoute 1 a la quantité de cet objet déjà présent dans le localStorage");
                isInCart[teddyOnPage.name].quantity += 1;
              }
            }
            // Si isInCart est null alors ajouter un champ quantity à l'objet et définition de l'objet
            // isInCart avec le nom de l'ours comme key et y assigner l'objet de cet ours 
            else {
              console.log("Le panier est vide, j'ajoute donc cet objet au localStorage");
              teddyOnPage.quantity = 1;
              isInCart = {
                [teddyOnPage.name] : teddyOnPage
              };
            };

            // Attribuer l'objet isIncart au localStorage
            localStorage.setItem("productsInCart", JSON.stringify(isInCart));

            numberOfProductsInCartAdd();
            // Eviter que le lien ne fonctionne
            e.preventDefault();
          })
      };
  };
  })