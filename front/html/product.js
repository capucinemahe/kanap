const getAll = async function () { //je déclare la fonction GetAll - asynchrone = je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch(`http://localhost:3000/api/products/`); //j'attends la reponse du fetch pour passer à la suite
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data = await response.json(); //pour récupérer mes produits sous forme de tableau - array


            console.log(data);//on accède aux données

            const str = window.location.href; //je cherche l'url en mode dynamique
            const url = new URL(str); //je découpe l'url pour voir tous les paarmètres qu'il y a dedans
            const id = url.searchParams.get("id"); //je cherche la valeur du paramètre de id
            console.log(id);


            data.forEach(elt => { //boucle pour parcourir chaque element

                const title = document.getElementById('title'); //je déclare quel élément du html je veux utiliser pour mettre le nom du produit //je stocke l'élement cible
                title.innerHTML = `hello ${elt.name}`; //j'injecte du texte dans ma cible title

                const price = document.getElementById('price');
                price.innerHTML = `super prix mon ami ${elt.price}`;

                const description = document.getElementById('description');
                description.innerHTML = `super deescription ${elt.description}`;
            })
        }
        else {
            console.error("retour du serveur:", response.status);
        }
    }
    catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
};

getAll(); //j'appelle la fonction globale, la fonction getAll