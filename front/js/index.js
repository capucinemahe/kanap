// je fais ma requete, asynchrone pour attendre la réponse du back end
//une fois la réponse ok, je récupère la réponse qui est ok

const getAll = async function () { //asynchrone = je prépare mon asynchrone 
    try { //si ma fonction marche
        let response = await fetch("http://localhost:3000/api/products"); //j'attends la reponse du fetch pour passer à la suite
        if (response.ok) { //si ma réponse est OK, je passe à la suite
            const data = await response.json(); //pour récupérer mes produits sous forme de tableau - array

            //ici est mon code
            const parent = document.getElementById('items'); //je vais chercher mon parent 

            data.forEach(elt => { //boucle pour parcourir chaque element

                const a = document.createElement('a');
                a.href = `./product.html?id=${elt._id}`;
                parent.appendChild(a); //je l'injecte dans le DOM via son parent article

                const article = document.createElement('article');
                a.appendChild(article); //je l'injecte dans le DOM via son parent article

                const img = document.createElement('img');
                img.src = elt.imageUrl;
                img.alt = elt.altTxt;
                article.appendChild(img); //je l'injecte dans le DOM via son parent article

                const h3 = document.createElement('h3');
                h3.innerHTML = elt.name;
                h3.class = "productName";
                article.appendChild(h3); //je l'injecte dans le DOM via son parent article

                const p = document.createElement('p');
                p.innerHTML = elt.description;
                p.class = "productDescription";
                article.appendChild(p); //je l'injecte dans le DOM via son parent article
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