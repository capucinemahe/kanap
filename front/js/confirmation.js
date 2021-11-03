const url = new URL(window.location.href);
//je récupère l'url en entier qui contient mon orderId

//console.log(url);

const orderId = url.searchParams.get("orderId"); 
//je récupère orderiD

//console.log(orderId);

const confirmationId = document.getElementById('orderId');
confirmationId.innerHTML = orderId;

localStorage.clear();