
// Récupération des objets via une requête ajax, et ajout des élements au DOM de la page d'accueil

fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(json => {
  var listeElement = document.getElementById("liste");
  json.forEach(function(teddy){
    // Création d'une div avec l'id de l'ours en peluche
    var blocTeddy = document.createElement("a");
    blocTeddy.id = teddy._id;
    blocTeddy.href = "produits.html?id=" + teddy._id;
    blocTeddy.classList = "blocTeddy";
    blocTeddy.textContent ="";
    listeElement.appendChild(blocTeddy); 

    // Création d'une div qui contiendra l'image de l'ours en peluche
    var  blocTeddy__imgDiv = document.createElement("div");
    blocTeddy__imgDiv.classList = "blocTeddy__img";

    //Création et ajout de l'image à la div 
    let blocTeddy__img = document.createElement("img");
    blocTeddy__img.src = teddy.imageUrl;
    blocTeddy__imgDiv.appendChild(blocTeddy__img);

    // Création d'une balise de titre h2 contenant le nom de l'ours en peluche
    var nameTeddy = document.createElement("h3");
    nameTeddy.classList = "blocTeddy__name";
    nameTeddy.textContent = teddy.name;

    // Création d'une balise de paragraphe contenant le prix de l'ours en peluche 
    var priceTeddy = document.createElement("p");
    priceTeddy.classList = "blocTeddy__price";
    priceTeddy.textContent = "Prix : " + (teddy.price/100) + " €";


    // Ajout de ces balises dans la div créee en premier
    blocTeddy.appendChild(blocTeddy__imgDiv);
    blocTeddy.appendChild(nameTeddy);
    blocTeddy.appendChild(priceTeddy);
  })
  })
