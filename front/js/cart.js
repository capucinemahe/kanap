let prixTotal = 0; //j'initialise la variable du prix total de mon panier
let quantiteTotale = 0;

let panier = JSON.parse(localStorage.getItem("panier"));
//j'assigne les données de mon localstorage à mon tableau panier

const parentCart = document.getElementById('cart__items');
//je déclare le parent de mon DOM pour créer des éléments dynamiquement

if (panier) { //si mon panier a une valeur
    panier.forEach(eltpanier => {
        //je parcours tous les élements présents dans mon panier pour que les données s'affichent

        const articleCart = document.createElement('article');
        parentCart.appendChild(articleCart);
        articleCart.className = "cart__item";
        articleCart.setAttribute("data-id", eltpanier.id);

        const divCartImage = document.createElement('div');
        articleCart.appendChild(divCartImage);
        divCartImage.className = "cart__item__img";

        const imageCart = document.createElement('img');
        divCartImage.appendChild(imageCart);
        imageCart.src = eltpanier.image;
        imageCart.alt = eltpanier.altTxt;

        const divCartContent = document.createElement('div');
        articleCart.appendChild(divCartContent);
        divCartContent.className = "cart__item__content";

        const divCartContentTitlePrice = document.createElement('div');
        divCartContent.appendChild(divCartContentTitlePrice);
        divCartContentTitlePrice.className = "cart__item__content__titlePrice";

        const productName = document.createElement('h2');
        divCartContentTitlePrice.appendChild(productName);
        productName.innerHTML = eltpanier.name;

        const productColor = document.createElement('p');
        divCartContentTitlePrice.appendChild(productColor);
        productColor.innerHTML = eltpanier.colors;

        //***** PRIX ******/
        const productPrice = document.createElement('p');
        divCartContentTitlePrice.appendChild(productPrice);
        productPrice.classList.add("prixUnitaire");

        const totalPrixRef = eltpanier.price * eltpanier.quantity; //prix de ma ligne de produit
        productPrice.innerHTML = totalPrixRef;

        const totalPrice = document.getElementById('totalPrice');
        prixTotal += totalPrixRef;
        totalPrice.innerHTML = prixTotal;

        const divCartContentSettings = document.createElement('div');
        divCartContent.appendChild(divCartContentSettings);
        divCartContentSettings.className = "cart__item__content__settings";

        const divProductQuantity = document.createElement('div');
        divCartContentSettings.appendChild(divProductQuantity);
        divProductQuantity.className = "cart__item__content__settings__quantity";

        const inputQuantityTitle = document.createElement('p');
        divProductQuantity.appendChild(inputQuantityTitle);
        inputQuantityTitle.innerHTML = "Quantité :";

        //******** QUANTITE *****/
        const inputQuantity = document.createElement('input');
        divProductQuantity.appendChild(inputQuantity);
        inputQuantity.type = "number";
        inputQuantity.className = "itemQuantity";
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = 1;
        inputQuantity.max = 100;
        inputQuantity.value = eltpanier.quantity;

        const totalQuantity = document.getElementById('totalQuantity');
        quantiteTotale += eltpanier.quantity;
        totalQuantity.innerHTML = quantiteTotale;

        //pour modifier la quantité directement au sein du panier
        //+ faire en sorte que les totaux finaux s'actualisent avec l'appel aux fonctions de sommes
        inputQuantity.addEventListener('change', () => {
            productPrice.innerHTML = inputQuantity.value * eltpanier.price;

            sommePrixCanapes();
            sommeQuantiteCanapes();
        });

        const divProductDelete = document.createElement('div');
        divCartContentSettings.appendChild(divProductDelete);
        divProductDelete.className = "cart__item__content__settings__delete";

        const deleteItem = document.createElement('p');
        divProductDelete.appendChild(deleteItem);
        deleteItem.className = "deleteItem";
        deleteItem.innerHTML = "Supprimer";

        //pour supprimer totalement la reférence du panier 
        deleteItem.addEventListener('click', () => {
            const longueurDuPanierAvantSuppresssion = panier.length;
            
            panier = [...panier.filter(item => item.id + item.colors !== eltpanier.id + eltpanier.colors)];
            //je filtre dans mon panier en fonction de l'id ET de la couleur de mon produit
            //j'enlève l'article si il est different en fonction de son ID et sa couleur 
            
            if (panier.length < longueurDuPanierAvantSuppresssion) {//si mon nouveau panier a moins d'articles 
                localStorage.setItem("panier", JSON.stringify(panier));
                parentCart.removeChild(articleCart); //permet de faire la mise a jour sans rafraichir la page - single page
                // récupérer les nouvelles quantités de mon nouveau tableau 
                // récupérer les nouveaux prix de mon nouveau tableau
                
                if (panier.length == 0) { //si mon panier est vide, quantité totale et prix total seront égal à 0
                    totalQuantity.innerHTML = 0;
                    totalPrice.innerHTML = 0;
                } else { //sinon le prix total et la quantité totale s'actualisent
                    totalQuantity.innerHTML = quantiteTotale -= eltpanier.quantity;
                    totalPrice.innerHTML = prixTotal -= totalPrixRef;
                }}
        });
    });
} else {
    result = window.confirm("panier vide, voulez-vous retourner sur la page d'accueil ?")
    //afiche un fenetre qui propose de retourner sur la page de présentation des produits
    if (result == true) {
        window.location.href = "index.html";
    }
};

function sommeQuantiteCanapes() {
    const quantiteCanap = document.querySelectorAll('.itemQuantity');
    let somme = 0;

    quantiteCanap.forEach(canappp => {
        somme += parseInt(canappp.value);
    })
    return totalQuantity.innerHTML = somme;
};

function sommePrixCanapes() {
    const prixCanap = document.querySelectorAll('.prixUnitaire');
    let somme = 0;

    prixCanap.forEach(canappp => {
        somme += parseInt(canappp.innerHTML);
    })
    return totalPrice.innerHTML = somme;
};


//********** formulaire ***********//

const parentForm = document.querySelector('.cart__order');
const submitForm = document.getElementById('order');

const inputFirstName = document.getElementById('firstName');
const inputName = document.getElementById('lastName');
const inputAdress = document.getElementById('address');
const inputCity = document.getElementById('city');
const inputEmail = document.getElementById('email');

const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
const regexNames = /^[a-z ,.'-]+$/i;

//chaque fois que l'utilisateur tente d'envoyer les données
//on vérifie que le champ est valide

inputEmail.addEventListener("input", () => {
    //si il est invalide, on affiche un message d'erreur personnalisé
    if (regexMail.test(inputEmail.value) == false) {
        document.getElementById('emailErrorMsg').innerHTML = "l'email saisi n'est pas correct";
    }
}); //ça empêche l'envoi des données du formulaire au back

inputCity.addEventListener("input", () => {

    if (regexCity.test(inputCity.value) == false) {
        document.getElementById('cityErrorMsg').innerHTML = "format de ville incorrect";
    }
});

inputName.addEventListener("input", () => {

    if (regexNames.test(inputName.value) == false) { //si les donnees saisies dans mon input sont incorrectes, un msg d'erreur apparait
        document.getElementById('lastNameErrorMsg').innerHTML = "format de votre nom incorrect";
    }
});

inputFirstName.addEventListener("input", () => {

    if (regexNames.test(inputFirstName.value) == false) {
        document.getElementById('firstNameErrorMsg').innerHTML = "format de votre prénom incorrect";
    }
});

submitForm.addEventListener("click", (e) => {
    e.preventDefault() //empeche

    const contact = { //objet contact à partir des données du formulaire
        firstName: inputFirstName.value,
        lastName: inputName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value,
    };

    //console.log(contact);

    //test des Regex
    if (regexMail.test(contact.email) == false || regexCity.test(contact.city) == false || regexNames.test(contact.firstName || regexNames.test(contact.lastName) == false) == false) {
        alert("Merci de remplir correctement le formulaire pour valider votre commande");
        return false;
    };

    const products = []; //produits à envoyer en post sous forme de tableau

    panier.forEach(elt => {
        products.push(elt.id);
    });

    //console.log(products);

    const donnees = { contact, products }; //objet avec les données contact + le tableau des produits

    //console.log(donnees);

    //on envoie en POST
    fetch((`http://localhost:3000/api/products/order`), {
        method: 'POST',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(donnees),
    })
        .then(response => { //renvoi une premiere prommesse
            return response.json() //si reponse ok, retourne un objet json
        })
        //traitement pour l'obtention du numéro de commmande
        .then((panier) => {
            window.location.href = `confirmation.html?orderId=${panier.orderId}`; //redirige vers la page confirmation de commande
        })

        .catch((error) => {
            alert(error);
        });
});


//verifier les inputs et une fois vérifiés, ils sont envoyé

//La méthode GET est la valeur de méthode par défaut
//On l'utilise de préférence sauf si on ne veut pas que les paramètres soient ajoutés à l'URL
//Elle permet de récupérer les données passées à la page avec du code JavaScript

// je récupère la valeur puis je la push dans un tableau - faire tableau avec les ids des produits du panier du localstorage

//le fetch est fait au moment du click sur le bouton pr envoyer les données au back