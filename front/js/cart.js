

const url = "http://localhost:3000/api/products";
const section = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");


let objLinea = localStorage.getItem("product");
let jsonPanier = JSON.parse(objLinea);
let quantity = 0;
let price = 0;

// Create an element in the HTML document //

function createNode(items) {
  return document.createElement(items);
}

// Append an element (el) on a parent //

function append(parent, el) {
  return parent.appendChild(el);
}

// Add a Class on an element //

function classList(items, name) {
  return items.classList.add(name);
}

// Add the total Quantity //

function totalQuantityFunction(itemPanier){
let newQuantity = quantity + Number(itemPanier.quantity);
quantity = newQuantity;
totalQuantity.innerHTML = quantity;
}

// Add the total Price //

function totalPriceFunction(itemPanier, itemApi){
  let newPrice = Number(itemApi.price)*itemPanier.quantity;
   price = newPrice + price;
   totalPrice.innerHTML = price;
}




// Function that define all the variable and call the five function above //

function createElement(itemApi, itemPanier) {
  let article = createNode("article");

  // Block Image //

  let divimg = createNode("div");
  let img = createNode("img");
  img.src = itemApi.imageUrl;
  append(section, article);
  append(article, divimg);
  append(divimg, img);
  article.setAttribute("data-id", itemApi._id);
  article.setAttribute("data-color", itemApi.color);
  img.setAttribute("alt", itemApi.altTxt)
  classList(article, "cart__item");
  classList(divimg, "cart__item__img");

  // Block Content //

  let divContent = createNode("div");
  append(article, divContent);
  classList(divContent, "cart__item__content");

  // Block Description //

  let divDescription = createNode("div");
  let titreDes = createNode ("h2");
  let pDes1= createNode ("p")
  let pDes2 = createNode ("p")
  titreDes.innerHTML = `${itemApi.name}`;
  pDes1.innerHTML = `${itemPanier.color}`
  pDes2.innerHTML = `${itemApi.price} €`;
  append(divContent, divDescription);
  append(divDescription, titreDes)
  append(divDescription, pDes1)
  append(divDescription, pDes2)
  classList(divDescription, "cart__item__content__description");

  // Block Settings //

  let divSettings = createNode ("div")
   append(divContent, divSettings);
   classList(divSettings, "cart__item__content__settings");

  // Block Quantity //

  let divQuantity = createNode("div");
  let pQuant = createNode("p")
  let inputQuant = createNode("input")
  let divdelete = createNode ("div")
  let pDelete = createNode("p")
  pQuant.innerHTML = `Qté : `;
  pDelete.innerHTML ="Supprimer"
  append(divSettings, divQuantity)
  append(divQuantity,pQuant)
  append(divQuantity,inputQuant)
  append(divSettings, divdelete)
  append(divdelete,pDelete)
  inputQuant.setAttribute("type", "number")
  inputQuant.setAttribute("class", "itemQuantity");
  inputQuant.setAttribute("name", "itemQuantity");
  inputQuant.setAttribute("min", 1);
  inputQuant.setAttribute("max", 100);
  inputQuant.setAttribute("value", `${itemPanier.quantity}`);
  classList(inputQuant, "itemQuantity");
  classList(divQuantity, "cart__item__content__settings__quantity");
  classList(divdelete, "cart__item__content__settings__delete");
  classList(pDelete, "deleteItem");

totalQuantityFunction(itemPanier);
totalPriceFunction(itemPanier, itemApi);

}

// Call API //
fetch(url)
  .then((response) => response.json())
// Use the data API to display the basket //
  .then(function (data) {
    let i = 0
    if (jsonPanier === null){
      alert('Votre panier est vide')
    }
    else{
    while (i < jsonPanier.length){
        const Panier = jsonPanier[i];
        for (let a = 0; a < data.length; a++) {
            let dataApi = data[a];
            let idApi = data[a]._id;
        // Iterate between the API-id and tha Basket-id //
        idApi === Panier.id ? createElement(dataApi, Panier) : a;
    }
i++;
    }

    let article = document.getElementsByClassName("cart__item");
    // Iterate with a loop function to modify the Totalquantity and Total Price when a quantity change by an action //
    for (let i = 0 ; i < article.length; i++) {
    let input = document.getElementsByClassName("itemQuantity");
    let initialValue = input[i].value
    input[i].addEventListener('change',function (e){
      e.preventDefault();
      // New quantity when remove or add product //
      let differenceValue = 0;
      differenceValue = Number(this.value) - initialValue;
      totalQuantity.innerHTML = differenceValue + Number(totalQuantity.textContent);
      initialValue = this.value;
      // New price when remove or add product //
      const classPrice = document.getElementsByClassName("cart__item__content__description")[i];
      const paraPrice = classPrice.getElementsByTagName("p")[1];
      const initialPrice = paraPrice.textContent;
      let differencePrice = 0;
      differencePrice = Number(differenceValue) * Number(initialPrice.split(" ")[0]);
      totalPrice.innerHTML = differencePrice + Number(totalPrice.textContent.split(" ")[0]);

      //Push Quantity LocalStorage//

      let localS = JSON.parse(localStorage.getItem("product"));
      let localSItem = localS[i];
      localSItem.quantity = initialValue;
      localStorage.setItem("product", JSON.stringify(localS));
      console.log(localS);
    })

    // Block with function that will delete an item from the localstorage when the user press the delete button //
    const suppr = document.getElementsByClassName("deleteItem");
    suppr[i].addEventListener('click', function(e){
    e.preventDefault();
    const supprArticle = document.getElementsByClassName("cart__item");
    let localS = JSON.parse(localStorage.getItem("product"));
    localS.splice(i,1);
    localStorage.setItem("product", JSON.stringify(localS))
    supprArticle[i].remove();
    location.reload();
    totalQuantity.innerHTML = Number(totalQuantity.textContent) - initialValue
    totalPrice.innerHTML = Number(totalPrice.textContent.split(" ")[0]) - Number(initialPrice.split(" ")[0]);
    })
  }
}
})
 



let contact = {
  firstName : "",
  lastName : "",
  address : "",
  city : "",
  email : "", 
}
// Variable to tranform the object contact into an array //
var arr = Object.keys(contact).map(function (key) {
  return [key, contact[key]];
});

// Fonction to assign a value for each key in the contact object //
function pushContact(i, inputValue){
  arr[i][1] = inputValue;
  contact = Object.fromEntries(arr);
}


const div = document.getElementsByClassName("cart__order__form__question")
let validation = [false, false, false, false, false]


// For Loop to verify each input text with regex //
for( let i = 0; i < div.length; i++){
const input = div[i].getElementsByTagName("input");
let regex = '';
if (i === 0 || i === 1 || i === 3){
   regex = new RegExp(/^[a-z ,.'-]+$/i);
}
if ( i === 2) {
  regex = new RegExp("[!#-'*+/-9=?A-Z^-~-]");
}
if (i === 4){
regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
}

// Function to validate each input in the form with a green background //
 input[0].addEventListener('change', function(){
   let test = regex.test(input[0].value)
   
     if (test) {
       input[0].style.background = "green";
       pushContact(i, input[0].value)
       validation[i] = true;
     } else if (input[0].value === "") {
       input[0].style.background = "white";
       validation[i]= false;
     } else {
       alert("Format Saisie Invalide");
       input[0].value = "";
       input[0].style.background = "white";
     }
    
 })
}

// For loop to iterate each id from the basket in an array //
let products = [];
for (i in jsonPanier){
products.push(jsonPanier[i].id)
}

function postForm() {
  const order = document.getElementById("order");
 
  
  order.addEventListener("click", (event) => {
    event.preventDefault();
    let confirmation = validation.includes(false);
      if (confirmation === true) {
        alert("Veuillez renseigner les champs manquants !");
      } else {
        const sendFormData = {
          contact,
          products,
        };

        // j'envoie le formulaire + localStorage (sendFormData)
        // ... que j'envoie au serveur

        const options = {
          method: "POST",
          body: JSON.stringify(sendFormData),
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch("http://localhost:3000/api/products/order", options)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("orderId", data.orderId);
            document.location.href = "confirmation.html?id=" + data.orderId;
          })
          .catch((error) => alert("Erreur : " + error));
      }
    ;
  
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();



