"use strict";

// HTML-ELEMENT
const unorderedListEl = document.getElementById("itemList");
const totalPriceEl = document.getElementById("totalPrice");
const orderFormEl = document.getElementById("orderForm");
const totalCartItemsEl = document.getElementById("totalCartItems");
const topPageBtnEl = document.getElementById("topBtn");

const buyerNameEl = document.getElementById("buyerName").required;
const emailEl = document.getElementById("email").required;
const addressEl = document.getElementById("address").required;
const shipmentOptionEl = document.getElementById("shipmentType").required;
const submitButtonEl = document.getElementById("submitBtn");

// FUNTIONER
function showCart() {

    let cart = localStorage.getItem("CART");
    cart = JSON.parse(cart);
    console.log(cart);

    let totalPrice = 0;
    cart.forEach(element => {

        // parseFloat() tar en variabel och returnerar ett float tal/nummer
        totalPrice += parseFloat(element.price);
    });
    console.log(totalPrice.toFixed(2));     

    // Skriv ut kundens lista med produkter samt prissumman under listan
    for (let item of cart) {

        unorderedListEl.innerHTML += `
        <li>
        <img src='${item.image}' alt='picture of product' class='image' width='100'> <br>
        ${item.title} <br>
        Product ID: ${item.id} <br>
        Price: $${item.price} <br>
        <button onclick="deleteProduct('${item.title }')">Delete</button>
        </li>
        <br><br>
        `
    }

    if (cart.length != 0) {
        // toFixed(x) avrundar ett tal till x antal decimaler
        totalPriceEl.innerHTML = "<b>Total price: </b>$" + totalPrice.toFixed(2);
    }

}
showCart();

function deleteProduct(productName) {

    let cart = localStorage.getItem("CART");
    console.log(cart);
    cart = JSON.parse(cart);
    console.log(cart);
    console.log(cart.length);
    console.log(cart[0].title);

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === productName) {
            console.log(cart[i].title);
            cart.splice(i,1);
        }
    }
    console.log(cart);
    
    console.log(productName);
    localStorage.setItem("CART", JSON.stringify(cart));

    setTimeout(() => location.reload(), 200)    // reloads the site after 500 ms
}

function postOrder() {
    let cart = localStorage.getItem("CART");
    console.log(cart);
    cart = JSON.parse(cart);
    console.log(cart);

    // Skapa en lista som endast inneh??ller valda produkters id
    let cartIDs = [];
    cart.forEach(element => {
        console.log(element.id);
        cartIDs.push(element.id);
    });
    console.log(cartIDs);

    // H??mta k??parens uppgifter fr??n formul??ret
    let fullName = buyerNameEl.value;
    let email = emailEl.value;
    let address = addressEl.value;
    let shipmentOption = shipmentOptionEl.value;
    let productIDs = JSON.stringify(cartIDs);
    
    console.log(fullName, email, address, productIDs, shipmentOption);

    if (fullName == null || email == null || address == null || productIDs == null || shipmentOption == null) {
        alert("Please fill in all the fields in the form and try again.");
    } else {
        console.log(fullName, email, address, productIDs, shipmentOption);

        // S??tt samman v??rdena till ett JSON-objekt
        let body = JSON.stringify(
            {
                "fields": {
                    "name": {
                        "stringValue": fullName
                    },
                    "email": {
                        "stringValue": email
                    },
                    "address": {
                        "stringValue": address
                    },
                    "shipment": {
                        "stringValue": shipmentOption
                    },
                    "productIDs": {
                        "stringValue": productIDs
                    }
                }
            }
        )
        
        fetch("https://firestore.googleapis.com/v1/projects/webbsite-project/databases/(default)/documents/FakeStore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())    // Konverterar JSON-data fr??n anropet till JS-objekt
            .then(data => console.log(data))
            .catch(error => alert(error));

        clearForm();
        console.log("POST funkade");
    }
  
}

function clearForm() {
    orderFormEl.reset();
    localStorage.clear();
    alert("Order sent. Thank you.");

    setTimeout(() => location.reload(), 1000);       // laddar om sidan efter 1000 ms
}

// N??r anv??ndaren scrollar ner 20px eller mer fr??n toppen av sidan visas knappen
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topPageBtnEl.style.display = "block";
    } else {
        topPageBtnEl.style.display = "none";
    }
}

// N??r anv??ndaren klickar p?? knappen tas dom till toppen av sidan
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Skriv ut det nya antalet produkter i vagnen bredvid den.
let cartSize = JSON.parse(localStorage.getItem("CART"));
console.log(cartSize.length);
totalCartItemsEl.innerHTML = cartSize.length;


// EVENTHANTERARE
submitButtonEl.addEventListener('click', postOrder);
