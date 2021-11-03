//2eme appel à l'API
const getOne = async function () { //je déclare la fonction GetOne - je prépare mon asynchrone 
    try { //si ma fonction marche
        //je veut récupèrer l'id du produit à afficher 
        const url = new URL(window.location.href);
        //je découpe l'url pour récupérer l'id du produit
        const id = url.searchParams.get("id");
        //je cherche la valeur du paramètre de id 

        let response = await fetch(`http://localhost:3000/api/products/${id}`);
        //j'injecte l'id du canapé cliqué dans le fetch pour récupérer les données de ce produit
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data_product = await response.json();
            //je récupère les données du produit cliqué sous forme de json

            const parentImage = document.querySelector('.item__img');
            //je déclare le parent pour créer mon élement

            const imageKanap = document.createElement('img');
            parentImage.appendChild(imageKanap);
            imageKanap.src = data_product.imageUrl;
            imageKanap.alt = data_product.altTxt;

            const name = document.getElementById('title');
            name.innerHTML = data_product.name; //concerne le nom du canapé

            const price = document.getElementById('price');
            price.innerHTML = data_product.price; //idem pour le prix

            const description = document.getElementById('description');
            description.innerHTML = data_product.description;

            const parentColors = document.getElementById('colors');
            //je vais chercher mon parent pour créer mes options de couleurs

            data_product.colors.forEach(elt => { //je vais parcourir mon tableau de couleurs dans mes data_product

                const optionsDeCouleur = document.createElement('option');
                //je déclare ma variable optionsDeCouleur et je créé et je stocke la balise option dans cette variable
                optionsDeCouleur.value = elt;
                //je stocke les données du tableau colors dans l'attribut value de la balise option
                parentColors.appendChild(optionsDeCouleur);
                //j'injecte ma variable optionsDeCouleur qui contient les données dans le DOM grace au parent
                optionsDeCouleur.innerHTML = elt; //je fais afficher les données sur mon site
            });

            const quantiteeVoulue = document.getElementById("quantity");
            const couleurVoulue = document.getElementById("colors");

            //ici mon evènement de click sur le btn et de stockage dans mon storage
            const btnAddToCart = document.getElementById("addToCart");

            btnAddToCart.addEventListener('click', () => {
                //je crée un objet pour stocker les données du produit
                let objet = {
                    id: data_product._id,
                    name: data_product.name,
                    image: data_product.imageUrl,
                    textAlt: data_product.altTxt,
                    colors: couleurVoulue.value,
                    quantity: parseInt(quantiteeVoulue.value),
                    //je parse ma quantité car sinon c'est un string
                    price: data_product.price,
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
        } else {
            console.error("retour du serveur:", response.status);
        }
    } catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
};

getOne(); //j'appelle la fonction getOne, pour afficher les données d'un produit via l'API et le fetch