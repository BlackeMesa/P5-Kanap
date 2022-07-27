const url = "http://localhost:3000/api/products";
const classImg = document.getElementsByClassName("item__img")[0];
const classContent = document.getElementsByClassName("item__content__titlePrice")[0];
const classDescription = document.getElementsByClassName("item__content__description__title")[0];
const idOptions = document.getElementById("colors");
const urlId = window.location.search;
const urlParams = new URLSearchParams(urlId);
const id = urlParams.get('id');
const addProduct = document.getElementById("addToCart");
const selectcolor = document.getElementById("colors");
const selectquantity = document.getElementById("quantity");
 
// Create the options colors for each items //

function options(dataApi){
    for (i in dataApi) {
        let option = createNode("option");
        append(idOptions, option);
        option.setAttribute("value", dataApi[i]);
        option.innerHTML = dataApi[i];
    }
}
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
// Function that define all the variable and call the four function above //
function createElement(item){
    let img = createNode("img");
    let title = createNode("h1");
    let price = createNode("p");
    let content = createNode("p");
   title.innerHTML = `${item.name}`;
   img.src = item.imageUrl;
   content.innerHTML = `${item.description}`;
   price.innerHTML = `${item.price} €`;
   document.title = item.name;
   append(classImg, img);
   append(classContent, title);
   append(classContent, price);
   append(classDescription, content);
   options(item.colors);
   title.setAttribute("id", "title");
   content.setAttribute("id", "description");
   img.setAttribute("alt", item.altTxt)
   
 };

// Call API //
fetch(url)
  .then((response) => response.json())

  .then(function (data) {
    // Use the response to iterate all the items in the API //
    for (let i = 0; i < data.length; i++) {
      let idApi = data[i]._id;

      idApi === id ? createElement(data[i]) : i;
    }
  })
  .catch((error) => alert("Erreur : " + error));



// Object for the local Storage //
let productObject = {
  id: id,
  quantity: "",
  color: "",
};



// Function that define the color in the object above //

function objectColor() {
let selectedcolor = selectcolor.options[selectcolor.selectedIndex].value;
let textcolor = selectcolor.options[selectcolor.selectedIndex].text;
selectedcolor !== "" ? textcolor : alert("Veuillez sélectionner une couleur !");
productObject.color = selectedcolor;
}

// Function that define the quantity in the object above //
function objectQuantity() {
   
   let selectedquantity = selectquantity.value;
   selectedquantity > 0 ? selectedquantity : alert("Veuillez sélectionner une quantitée !");
   productObject.quantity = selectedquantity;
}


// Function that change the quantity when the colors is the same //

function newQuantity(productInLocalStorage){
productInLocalStorage[i].quantity = Number(productObject.quantity) + Number(productInLocalStorage[i].quantity);
 localStorage.setItem("product", JSON.stringify(productInLocalStorage));
 alert("La quantité a été modifié !");
}

// Function that push a new product if it wasn't in the local Storage //
function newProduct(productInLocalStorage) {
  productInLocalStorage.push(productObject);
  localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  alert("Votre produit a été ajouté !");
}

// Function that create a new localStorage Array //
function arrayLocalStorage(productInLocalStorage){
  productInLocalStorage = [];
  productInLocalStorage.push(productObject);
  localStorage.setItem("product", JSON.stringify(productInLocalStorage));
}


// Function that push the object into the localStorage //
addProduct.addEventListener("click", function(e) {
  e.preventDefault();
  objectColor();
  objectQuantity();
 let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
 let z = false;
 let selectedcolor = selectcolor.options[selectcolor.selectedIndex].value;
if (selectedcolor === '' || selectquantity.value == 0) {
alert('Tout les champs requis ne sont pas complétés')
 }
 else {
 for (i in productInLocalStorage){
  // Change the quantity into the localStorage //
  if (productObject.id === productInLocalStorage[i].id && productObject.color === productInLocalStorage[i].color){
newQuantity(productInLocalStorage);
 z = true;
  }
 }
  if (productInLocalStorage && z === false) {
    newProduct(productInLocalStorage);
 } 
 // If there is nothing in the localStorage create an array and push the object into it + psuh in localStorage //
 if (productInLocalStorage == undefined) {
   arrayLocalStorage(productInLocalStorage);
 }
 console.log(productInLocalStorage)
}
});



