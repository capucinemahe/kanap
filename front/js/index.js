// je fais ma requete à l'API de manière asynchrone pour que mon code ne bloque pas
//une fois la réponse ok, je récupère la réponse de la requete

const getAll = async function () { //je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch("http://localhost:3000/api/products"); //j'attends la reponse du fetch
        if (response.ok) { //si la réponse est OK, je passe à la suite
            const data = await response.json(); //je récupére mes produits sous forme de tableau

            const parent = document.getElementById('items'); //je vais chercher mon parent pour construire les elements du DOM

            data.forEach(elt => { //boucle pour parcourir chaque element de mon API

                const a = document.createElement('a');
                parent.appendChild(a); //je l'injecte dans le DOM via son parent
                a.href = `./product.html?id=${elt._id}`; //me redirige vers le produit qui correspond à l'id

                const article = document.createElement('article');
                a.appendChild(article);

                const img = document.createElement('img');
                article.appendChild(img); //je l'injecte dans le DOM via son parent article
                img.src = elt.imageUrl;
                img.alt = elt.altTxt;

                const h3 = document.createElement('h3');
                article.appendChild(h3);
                h3.innerHTML = elt.name;
                h3.className = "productName";

                const p = document.createElement('p');
                article.appendChild(p); //je l'injecte dans le DOM via son parent article
                p.innerHTML = elt.description;
                p.className = "productDescription";
            })
        } else { //si je n'ai pas de réponse de l'API, cela me retourne une erreur
            console.error("retour du serveur:", response.status);
        }
    }
    catch (err) { //si ma fonction ne marche pas
        console.log(err); //ma console va renvoyer une erreur
    }
}
getAll(); //j'appelle la fonction globale pour récupérer les données de l'API