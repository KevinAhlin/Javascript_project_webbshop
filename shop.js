"use strict";


// HTML-ELEMENT
const productSectionEl = document.getElementById("products");
const topPageBtnEl = document.getElementById("topBtn");

const allProductsBtnEl = document.getElementById("productsBtn");
const mensClothingBtnEl = document.getElementById("mensClothingBtn");
const womensClothingBtnEl = document.getElementById("womensClothingBtn");
const jeweleryBtnEl = document.getElementById("jeweleryBtn");
const electronicsBtnEl = document.getElementById("electronicsBtn");
const totalCartItemsEl = document.getElementById("totalCartItems");


// FUNKTIONER
function renderProducts() {

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            const categoryBtn = document.getElementsByClassName("category-button");
            for (let i = 0; i < categoryBtn.length; i++) {
                categoryBtn[i].addEventListener('click', function() {
                    productList(data, this.getAttribute("data-category"));
                });
            }
            productList(data, "all");
        });
}

// function renderProducts() {
//     fetch("https://fakestoreapi.com/products")
//         .then(res => res.json())
//         .then(data => productList(data));
// }

function productList(productsData, selectedCategory) {

    console.log(productsData);
    // news[0].fields.rubrik.stringValue;
    // dataArray.documents[0].fields.rubrik.stringValue;
    // let productArray = productsData;

    const item = productsData.filter(item => {
        if (selectedCategory === "all") {
            return true;
        } else if (selectedCategory === item.category) {
            return true;
        }
        return false;
    })

    productSectionEl.innerHTML = "";

    for (let i = 0; i < item.length; i++) {

        productSectionEl.innerHTML += `
        <article>
             <h2> ${item[i].title} </h2>
             <h4> 
                 Category: ${item[i].category}
                 <br>
                 Product ID: ${item[i].id}
             </h4>
             <img src='${item[i].image}' alt='picture of product' class='image' width='125'>
             <p>
                 ${item[i].description}
                 <br><br>
                 Price: $${item[i].price}
                 <br><br>
                 Rating: ${JSON.stringify(item[i].rating)}
             </p>
             <button onclick="AddToCart('${item[i].id}', '${item[i].title}',
              '${item[i].price}', '${item[i].image}')">Add to cart</button>
             <hr>
         </article>   
        `

    }

    // for (let product of productArray) {
    //     // Debug
    //     // console.log(JSON.stringify(product));
    //     // console.log(product.title);
    //     // console.log(product.category);
    //     // console.log(product.description);

    //     productSectionEl.innerHTML += `
    //     <article>
    //         <h2> ${product.title} </h2>
    //         <h4> 
    //             Category: ${product.category}
    //             <br>
    //             Product ID: ${product.id}
    //         </h4>
    //         <img src='${product.image}' alt='picture of product' class='image' width='125'>
    //         <p>
    //             ${product.description}
    //             <br><br>
    //             Price: $${product.price}
    //             <br><br>
    //             Rating: ${JSON.stringify(product.rating)}
    //         </p>
    //         <button onclick="AddToCart('${product.id}', '${product.title}',
    //          '${product.price}', '${product.image}')">Add to cart</button>
    //         <hr>
    //     </article>
    //     `
    // }

}
renderProducts();

// En array för valda produkter
let cart = JSON.parse(localStorage.getItem("CART")) || [];

function AddToCart(itemId, itemTitle, itemPrice, itemImage) {
    // Debug
    // console.log(itemId);
    // console.log(itemTitle);
    // console.log(itemPrice);

    let productObject = {
        id: itemId,
        title: itemTitle,
        price: itemPrice,
        image: itemImage,
        // description: itemDesc,
        // category: itemCategory
    }

    console.log(productObject);

    // Lägg till valda produkten i köplistan
    cart.push(productObject);
    console.log("Längden av listan: " + cart.length);
    console.log(cart);

    // Spara array i localStorage, tar endast emot strängar
    localStorage.setItem("CART", JSON.stringify(cart));

    alert("Product added to cart");

    setTimeout(() => location.reload(), 500);       // laddar om sidan efter 500 ms
}

// När användaren scrollar ner 20px eller mer från toppen av sidan visas knappen
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topPageBtnEl.style.display = "block";
    } else {
        topPageBtnEl.style.display = "none";
    }
}

// När användaren klickar på knappen tas dom till toppen av sidan
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Skriv ut det nya antalet produkter i vagnen bredvid den.
let cartSize = JSON.parse(localStorage.getItem("CART"));
console.log(cartSize.length);
totalCartItemsEl.innerHTML = cartSize.length;


// EVENTHANTERARE
// allProductsBtnEl.addEventListener('click', renderProducts);
// mensClothingBtnEl.addEventListener('click', renderProducts);
// womensClothingBtnEl.addEventListener('click', renderProducts);
// jeweleryBtnEl.addEventListener('click', renderProducts);
// electronicsBtnEl.addEventListener('click', renderProducts);

// addProductToCart();

// Kollar innehållet i localStorage
// localStorage.clear();