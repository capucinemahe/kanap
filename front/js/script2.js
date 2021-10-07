// je fais ma requete, asynchrone pour attendre la réponse du back end
//une fois la réponse ok, je récupère la réponse qui est ok

/*const getPromise = function () {
    fetch("http://localhost:3000/api/products")
        .then((response) => { //résultat de fetch
            if (response.ok) {
                const data = response.json();
                return data
            }
            else {
                console.error("retour du serveur:", response.status);
            }
        })
        .then((data) => { //data = résultat du premier .then
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}

getPromise();*/

//



const getAll = async function(){
    try{
        let response = await fetch("http://localhost:3000/api/products");
        if(response.ok){
            const data = response.json(); //pour récupérer mes produits sous forme de tableau - array
            console.log(data);
        }
        else{
            console.error("retour du serveur:", response.status);
        }
    }
    catch(err){
        console.log(err);
    }
}
getAll(); //appelle la fonction


//je crée l'objet produit

let personnage = {
    prenom: "Pol",
    colors: "bleu",
    price: 10,
}

const div = document.createElement("div");
div.innerHTML=`${prenom}`; //j'injecte du texte
div.className="classeDeDiv";
const parent = document.getElementById("items"); //je vais chercher mon parent
parent.innerHTML=`<img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, ${prenom}">
<h3 class="productName">${prenom}</h3>
<p class="productDescription">Super canapé rose pour ${prenom}.</p>`;
parent.appendChild(div); //je l'injecte dans le dom via un parent
const tableau=[1,2,3,4,5,6,7]
tableau.forEach(elt=>
    {
    const p = document.createElement("p");
    p.innerHTML="hi";  
    parent.appendChild(p);
    }
    );
