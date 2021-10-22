let panier = []; //tableau vide pour stocker mes produits
let prixTotal = 0; //j'initialise ma variable du prix total de mon panier
let quantiteTotale = 0;


localStorage.getItem("panier"); //je teste si j'ai déja quelque chose dans mon localstorage
panier = JSON.parse(localStorage.getItem("panier")); //si j'ai des données dedans, ce sera assigné à mon tableau panier


panier.forEach(eltpanier => { //je parcours tous les élements présents dans mon panier

    const parentCart = document.getElementById('cart__items');

    const articleCart = document.createElement('article');
    parentCart.appendChild(articleCart);
    articleCart.className = "cart__item";
    articleCart.setAttribute("data-id", eltpanier._id);


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
    let totalPrixRef = eltpanier.price *= eltpanier.quantity; //prix de ma ligne de produit
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
 
    let quantiteTotaleRef= parseInt(eltpanier.quantity);

    const divProductDelete = document.createElement('div');
    divCartContentSettings.appendChild(divProductDelete);
    divProductDelete.className = "cart__item__content__settings__delete";

    const deleteItem = document.createElement('p');
    divProductDelete.appendChild(deleteItem);
    deleteItem.className = "deleteItem";
    deleteItem.innerHTML = "Supprimer";

    const totalQuantity = document.getElementById('totalQuantity');
    quantiteTotale += quantiteTotaleRef;
    totalQuantity.innerHTML = quantiteTotale;

    const totalPrice = document.getElementById('totalPrice');
    prixTotal += totalPrixRef; 
    totalPrice.innerHTML = prixTotal;


});
   

    //inputQuantity.addEventListener('change', modifyQuantity() => {};

 
 /*let clearLign = document.querySelector('.deleteItem'); // sélectionne le bouton
    clearLign.addEventListener ('click', (e) => { // écoute du clic
        
        location.reload(); // recharge la page
    });*/






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