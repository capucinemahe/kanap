const getAll = async function () { //asynchrone = je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch("http://localhost:3000/api/products"); //j'attends la reponse du fetch pour passer à la suite
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data = await response.json(); //pour récupérer mes produits sous forme de tableau - array

            const parentCart = document.getElementById('cart__items');

            data.forEach(elt => {

                const articleCart = document.createElement('article');
                parentCart.appendChild(articleCart);
                articleCart.class = "cart__item";

                const divCartImage = document.createElement('div');
                articleCart.appendChild(divCartImage);
                divCartImage.class = "cart__item__img";

                const imageCart = document.createElement('img');
                divCartImage.appendChild(imageCart);
                imageCart.src = elt.imageUrl;
                imageCart.alt = elt.altTxt;

                const divCartContent = document.createElement('div');
                articleCart.appendChild(divCartContent);
                divCartContent.class = "cart__item__content";

                const divCartContentTitlePrice = document.createElement('div');
                divCartContent.appendChild(divCartContentTitlePrice);
                divCartContentTitlePrice.class = "cart__item__content__titlePrice";

                const productName = document.createElement('h2');
                divCartContentTitlePrice.appendChild(productName);
                productName = elt.name;

                const productPrice = document.createElement('p');
                divCartContentTitlePrice.appendChild(productPrice);
                productPrice = elt.price;

                const divCartContentSettings = document.createElement('div');
                divCartContent.appendChild(divCartContentSettings);
                divCartContentSettings.class = "cart__item__content__settings";

                const productQuantity = document.createElement('div');
                divCartContentSettings.appendChild(productQuantity);
                productQuantity.class = "cart__item__content__settings__quantity";

                const inputQuantityTitle = document.createElement('p');
                inputQuantityTitle.innerHTML = "Quantité :";

                const inputQuantity = document.createElement('input');
                inputQuantity.type = "number";
                inputQuantity.class = "itemQuantity";
                inputQuantity.name = "itemQuantity";
                inputQuantity.min = 1;
                inputQuantity.max = 100;
                inputQuantity.value = 42;

                const divProductDelete = document.createElement('div');
                divCartContentSettings.appendChild(divProductDelete);
                divProductDelete.class = "cart__item__content__settings__delete";

                const deleteItem = document.createElement('p');
                divProductDelete.appendChild(deleteItem);
                deleteItem.class = "deleteItem";
                deleteItem.innerHTML = "Supprimer";

            })
        }
        else {
            console.error("retour du serveur:", response.status);
        }
    }
    catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
}

getAll(); //appelle la fonction globale 