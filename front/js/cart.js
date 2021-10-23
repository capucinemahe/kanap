let prixTotal = 0; //j'initialise ma variable du prix total de mon panier
let quantiteTotale = 0;

localStorage.getItem("panier"); //je teste si j'ai déja quelque chose dans mon localstorage
let panier = JSON.parse(localStorage.getItem("panier")); //si j'ai des données dedans, ce sera assigné à mon tableau panier

const parentCart = document.getElementById('cart__items');

panier.forEach(eltpanier => { //je parcours tous les élements présents dans mon panier

    const articleCart = document.createElement('article');
    articleCart.className = "cart__item";
    articleCart.setAttribute("data-id", eltpanier.id);
    parentCart.appendChild(articleCart);

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

    const productPrice = document.createElement('p');
    divCartContentTitlePrice.appendChild(productPrice);
    const totalPrixRef = eltpanier.price * eltpanier.quantity; //prix de ma ligne de produit
    productPrice.innerHTML = totalPrixRef;

    const divCartContentSettings = document.createElement('div');
    divCartContent.appendChild(divCartContentSettings);
    divCartContentSettings.className = "cart__item__content__settings";

    const divProductQuantity = document.createElement('div');
    divCartContentSettings.appendChild(divProductQuantity);
    divProductQuantity.className = "cart__item__content__settings__quantity";

    const inputQuantityTitle = document.createElement('p');
    divProductQuantity.appendChild(inputQuantityTitle);
    inputQuantityTitle.innerHTML = "Quantité :";

    const inputQuantity = document.createElement('input');
    divProductQuantity.appendChild(inputQuantity);
    inputQuantity.type = "number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = eltpanier.quantity;

    //pour modifier la quantité de mon canapé
    //quantiteTotaleRef.addEventListener('change', modifyQuantity() => {};

    const divProductDelete = document.createElement('div');
    divCartContentSettings.appendChild(divProductDelete);
    divProductDelete.className = "cart__item__content__settings__delete";

    const deleteItem = document.createElement('p');
    divProductDelete.appendChild(deleteItem);
    deleteItem.className = "deleteItem";
    deleteItem.innerHTML = "Supprimer";

    const totalQuantity = document.getElementById('totalQuantity');
    quantiteTotale += eltpanier.quantity;
    totalQuantity.innerHTML = quantiteTotale;

    const totalPrice = document.getElementById('totalPrice');
    prixTotal += totalPrixRef;
    totalPrice.innerHTML = prixTotal;

    deleteItem.addEventListener('click', () => {
        const longueurDuPanierAvantSuppresssion = panier.length;

        panier = [...panier.filter(item => item.id + item.colors !== eltpanier.id + eltpanier.colors)];
        //je filtre dans mon panier en fonction de l'id ET de la couleur de mon produit
        //j'enlève l'article si il est different en fonction de son ID et sa couleur 

        
        if (panier.length < longueurDuPanierAvantSuppresssion) {//si mon nouveau panier a moins d'articles 
            localStorage.setItem("panier", JSON.stringify(panier));
            parentCart.removeChild(articleCart); //permet de faire la mise a jour sans rafraichir la page - single page
            // récupérer les nouvelles quntités de mon nouveau tableau 
            // récupérer les nouveaux prix de mon nouveau tableau
            
            if (panier.length == 0) { //si mon panier est vide, quantité totale et prix total sont égal à 0
                totalQuantity.innerHTML = 0;
                totalPrice.innerHTML = 0;
            } else { //sinon le prix total et la quantité totale s'actualisent
                totalQuantity.innerHTML = quantiteTotale -= eltpanier.quantity;
                totalPrice.innerHTML = prixTotal -= totalPrixRef;
            }
        }
    });
});





//formulaire




/*const parentForm = document.querySelector('.cart__order__form');

const p = document.createElement('p');
p.id = "firstNameErrorMsg";
p.innerHTML = 'erreur';

const inpFirstName = document.getElementById('firstName');
inpFirstName.required = true;
inpFirstName.innerHTML = "kikoo";
parentForm.appendChild(inpFirstName);

const inpName = document.getElementById('lastName');
inpName.required = true;

const inpAdress = document.getElementById('address');
inpAdress.required = true;

const inpCity = document.getElementById('city');
inpCity.required = true;

const inpEmail = document.getElementById('email');
inpEmail.required = true;


const objContact = { //objet contact à partir des données du formulaire
    firstname: inpFirstName.value,
    name: inpName.value,
    address: inpAdress.value,
    city: inpCity.value,
    email: inpEmail.value,
};*/