let panier = []; //tableau vide pour stocker mes produits

if (localStorage.getItem("panier")) { //je teste si j'ai déja quelque chose dans mon localstorage
    panier = JSON.parse(localStorage.getItem("panier")); //si j'ai des données dedans, ce sera assigné à mon tableau panier
};

const getAll = async function () { //asynchrone = je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch(`http://localhost:3000/api/products/`); //j'attends la reponse du fetch pour passer à la suite
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data = await response.json(); //pour récupérer mes produits sous forme de tableau - array

            let prixTotalPourChaqueRef = [];
            let quantiteTotalePourChaqueRef = [];
            const somme = (previousValue, currentValue) => previousValue + currentValue;

            data.forEach(eltdata => { //je parcours tous les éléments de la base de donnée - proposés sur mon site
                panier.forEach(eltpanier => { //je parcours tous les élements présents dans mon panier
                    
                    if (eltdata._id === eltpanier.id) { //si l'id de ma base de donnée totale correspond a un id dans le panier, alors il s'affiche
                       if(eltpanier.id === "a557292fe5814ea2b15c6ef4bd73ed83"){
                            eltdata.price = 1499;
                        }
                        const parentCart = document.getElementById('cart__items');

                        const articleCart = document.createElement('article');
                        parentCart.appendChild(articleCart);
                        articleCart.className = "cart__item";

                        const divCartImage = document.createElement('div');
                        articleCart.appendChild(divCartImage);
                        divCartImage.className = "cart__item__img";

                        const imageCart = document.createElement('img');
                        divCartImage.appendChild(imageCart);
                        imageCart.src = eltdata.imageUrl;
                        imageCart.alt = eltdata.altTxt;

                        const divCartContent = document.createElement('div');
                        articleCart.appendChild(divCartContent);
                        divCartContent.className = "cart__item__content";

                        const divCartContentTitlePrice = document.createElement('div');
                        divCartContent.appendChild(divCartContentTitlePrice);
                        divCartContentTitlePrice.className = "cart__item__content__titlePrice";

                        const productName = document.createElement('h2');
                        divCartContentTitlePrice.appendChild(productName);
                        productName.innerHTML = eltdata.name;

                        const productColor = document.createElement('p');
                        divCartContentTitlePrice.appendChild(productColor);
                        productColor.innerHTML = eltpanier.colors;

                        const productPrice = document.createElement('p');
                        divCartContentTitlePrice.appendChild(productPrice);
                        const lignePrice = eltdata.price *= parseInt(eltpanier.quantity,10);
                        productPrice.innerHTML = `${lignePrice} €`; //à améliorer

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

                        //inputQuantity.addEventListener('change', modifyQuantity() => {};

                        const divProductDelete = document.createElement('div');
                        divCartContentSettings.appendChild(divProductDelete);
                        divProductDelete.className = "cart__item__content__settings__delete";

                        const deleteItem = document.createElement('p');
                        divProductDelete.appendChild(deleteItem);
                        deleteItem.className = "deleteItem";
                        deleteItem.innerHTML = "Supprimer";

                        //je sors de la section cart__items
                
                        // total du prix pour chaque ligne du panier
                        prixTotalPourChaqueRef.push(eltdata.price *= parseInt(eltpanier.quantity,10));
                        //je dois parser pour transformer les chiffres de mes quantités en chiffres car ils étaient en chaine de caractère
                        quantiteTotalePourChaqueRef.push(parseInt(eltpanier.quantity,10));
                    }
                })
            })
           // console.log(prixTotalPourChaqueRef);
           // console.log(quantiteTotalePourChaqueRef);
            
        const totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.innerHTML = quantiteTotalePourChaqueRef.reduce(somme);
   
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.innerHTML = prixTotalPourChaqueRef.reduce(somme);
        
    }
        else {
            console.error("retour du serveur:", response.status);
        }
    }
    catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
}
getAll();

//formulaire

const parentForm = document.querySelector('.cart__order__form');

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
};