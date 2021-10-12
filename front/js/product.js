const getOne = async function () { //je déclare la fonction GetOne - asynchrone = je prépare mon asynchrone 

    try { //si ma fonction marche

        //je récupère l'id du produit à afficher
        const str = window.location.href; //je cherche l'url en mode dynamique
        const url = new URL(str); //je découpe l'url pour voir tous les paramètres qu'il y a dedans
        const id = url.searchParams.get("id"); //je cherche la valeur du paramètre de id

        let response = await fetch(`http://localhost:3000/api/products/${id}`);
        //j'injecte l'id du canapé cliqué dans le fetch
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data_product = await response.json();
            //je récupère les données du produit cliqué sous forme de json

            const parentImage = document.querySelector('.item__img');
            //je déclare le parent pour créer l'image dans le DOM

            const imageKanap = document.createElement('img');
            imageKanap.src = data_product.imageUrl;
            imageKanap.alt = data_product.altTxt;
            parentImage.appendChild(imageKanap);

            const name = document.getElementById('title');
            name.innerHTML = data_product.name; //concerne le nom du canapé

            const price = document.getElementById('price');
            price.innerHTML = data_product.price; //idem pour le prix

            const description = document.getElementById('description');
            description.innerHTML = data_product.description;

            const parentColors = document.getElementById('colors');
            //je vais chercher mon parent pour créer mes options de couleurs
            data_product.colors.forEach(elt => { //je vais parcourir mon tableau de couleurs dans mes datas product

            const optionsDeCouleur = document.createElement('option');
            //je déclare ma variable optionsDeCouleur et je créé et je stocke la balise option dans cette variable
            optionsDeCouleur.value = elt;
            //je stocke les données du tableau colors dans l'attribut value de la balise option
            parentColors.appendChild(optionsDeCouleur);
            //j'injecte ma variable optionsDeCouleur qui contient les données dans le dom grace au parent
            optionsDeCouleur.innerHTML = elt; //je fais afficher les données sur mon site
            });


            //mon panier est un array = tableau = les tableaux sont des objets

             //j'essaie de récupérer la valeur de l'input quantité
            function getQuantity(){
                const inputValue = document.getElementById("quantity").value;
            };
    
            

            //il faut que je crée une fonction qui sera appelée à chaque fois que je cliquerai sur le bouton AddToCart

            //ici mon evènement de click sur le btn
            const btnAddToCart = document.getElementById("addToCart");
            btnAddToCart.addEventListener('click', () =>{
                ajoutLocalstorage()
            });

            function ajoutLocalstorage() {

                const getColor = document.getElementById("colors");

                let objAddToCart = {
                    colors: getColor.value,
                    id: data_product._id,
                    quantity: getQuantity(), 
                };


            }
        
            localStorage.setItem(data_product.id, JSON.stringify(objAddToCart));
            localStorage.setItem(data_product.colors, JSON.stringify(objAddToCart));


            //je dois faire le calcul du prix total en fonction de la quantité ajoutée 

        }
        else {
            console.error("retour du serveur:", response.status);
        }
    }
    catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
};

getOne(); //j'appelle la fonction getOne, pour un produit