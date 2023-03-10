"use strict";


// HTML-ELEMENT
const productSectionEl = document.getElementById("products");
const productButtonEl = document.getElementById("productsBtn");
const totalCartItemsEl = document.getElementById("totalCartItems");

let cartSize = JSON.parse(localStorage.getItem("CART"));
console.log(cartSize.length);
totalCartItemsEl.innerHTML = cartSize.length;
