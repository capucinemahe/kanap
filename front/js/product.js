async function getDataProduct() { //je déclare la fonction - je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch(`http://localhost:3000/api/products/${id}`);
        //j'injecte l'id du canapé cliqué dans le fetch pour récupérer les données de ce produit
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data_product = await response.json();
            //je récupère les données du produit cliqué sous forme de json
            constructDOM(data_product);
        } else {
            console.error("retour du serveur:", response.status);
        }
    } catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
};

//je veux récupèrer l'id du produit à afficher 
const url = new URL(window.location.href);
//je découpe l'url pour récupérer l'id du produit
const id = url.searchParams.get("id");
//je cherche la valeur du paramètre de id 

const parentColors = document.getElementById('colors');
const parentImage = document.querySelector('.item__img');
const nameKanap = document.getElementById('title');
const priceKanap = document.getElementById('price');
const descriptionKanap = document.getElementById('description');
const imageKanap = document.createElement('img');
const quantiteeVoulue = document.getElementById("quantity");
const couleurVoulue = document.getElementById("colors");

function constructDOM(data_product) {
    
    parentImage.appendChild(imageKanap);
    imageKanap.src = data_product.imageUrl;
    imageKanap.alt = data_product.altTxt;
    
    nameKanap.innerHTML = data_product.name; //concerne le nom du canapé
    
    priceKanap.innerHTML = data_product.price; //idem pour le prix
    
    descriptionKanap.innerHTML = data_product.description;
    
    data_product.colors.forEach(elt => { //je vais parcourir mon tableau de couleurs dans mes data_product
        const optionsDeCouleur = document.createElement('option');
        //je déclare ma variable optionsDeCouleur et je créé et je stocke la balise option dans cette variable
        optionsDeCouleur.value = elt;
        //je stocke les données du tableau colors dans l'attribut value de la balise option
        parentColors.appendChild(optionsDeCouleur);
        //j'injecte ma variable optionsDeCouleur qui contient les données dans le DOM grace au parent
        optionsDeCouleur.innerHTML = elt; //je fais afficher les données sur mon site
    });
};

const btnAddToCart = document.getElementById("addToCart");
//ici mon evènement de click sur le btn et de stockage dans mon storage

btnAddToCart.addEventListener("click", () => {

    if (parentColors.value == "") {
        alert("Choisir une couleur pour votre canapé");
        return false;
    }

    //je crée un objet pour stocker les données du produit
    let objet = {
        id: id,
        name: nameKanap.innerHTML,
        image: imageKanap.src,
        textAlt: imageKanap.alt,
        colors: couleurVoulue.value,
        quantity: parseInt(quantiteeVoulue.value),
        //je parse ma quantité car sinon c'est un string
        price: priceKanap.innerHTML,
    };

    let panier = []; //je crée un tableau vide pour stocker mes produits

    //je veux faire en sorte que si j'ai déja un produit de meme iD et meme couleur dans mon panier, ils se cumulent
    if (localStorage.getItem("panier")) {
        //je teste si j'ai déja quelque chose dans mon panier
        panier = JSON.parse(localStorage.getItem("panier"));
        //si j'ai des données elles seront assignées à mon tableau panier

        let newPanier = [...panier]; //je crée une copie de mon panier

        let objIndex = newPanier.findIndex((item => item.id === objet.id && objet.colors === item.colors));

        if (objIndex !== -1) {
            newPanier[objIndex].quantity += objet.quantity; //si mon produit est déja là, j'actualise la quantité
        }
        else if (objIndex === -1) { //sinon je l'ajoute normalement au panier
            newPanier.push(objet);
        }
        localStorage.setItem("panier", JSON.stringify(newPanier));
    } else {

        //sinon j'insére mon objet dans le tableau panier normalement
        panier.push(objet);
        //j'envoi mon panier et ses produits dans mon localStorage avec Setitem et
        //je convertit le tableau en chaînes de caractères avec stringify
        localStorage.setItem("panier", JSON.stringify(panier));
        //le premier argument de setItem est la clé (tjrs de type string)
        //elle précise l'endroit où sont stockées les données pour les retrouver ultérieurement
    }
});

getDataProduct();