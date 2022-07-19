

const url = "http://localhost:3000/api/products";
const ul = document.getElementById("items");

// Create an element in the HTML document //
function createNode(items) {
  return document.createElement(items);
}
// Append an element (el) on a parent //
function append(parent, el) {
  return parent.appendChild(el);
}


// Add a Class on an element //
function classList(items, name){
    return items.classList.add(name);
}

// Function that define all the variable and call the three function above //
function createElement(item){
    let link = createNode("a")
    let article = createNode("article")
    let title = createNode("h3");
    let img = createNode("img");    
    let description = createNode("p");
   title.innerHTML = `${item.name}`;
   img.src = item.imageUrl;
   description.innerHTML = `${item.description}`
   append(ul, link);
   append(link, article);
   append(article, img);
   append(article, title);
   append(article, description);
   classList(title, "productName");
   classList(description, "productDescription");
   img.setAttribute("alt", item.altTxt);
   link.setAttribute("href","./product.html?id="+ item._id)
 };


// API call //
fetch(url)
.then((response) => response.json())

// Use the response to iterate all the items in the API //
.then(function(data) {
  for(let i = 0; i < data.length; i++){
    createElement(data[i])
  }
})
.catch((error) => alert("Erreur : " + error)); 





  
