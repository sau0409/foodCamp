// all buttons and containers selected
const barsBtn = document.getElementById("barsBtn");
const cartBtn = document.getElementById("cartBtn");
const cartPlusBtn = document.getElementById("cartPlus");
const cartMinusBtn = document.getElementById("cartMinus");
const checkoutBtn = document.getElementById("checkoutBtn");
const addItemBtn = document.getElementById("addItemBtn");
const cartOverlayCloseBtn = document.getElementById("cartOverlayCloseBtn");
const cartOverlayResetBtn = document.getElementById("cartOverlayResetBtn");
const cartoverlay = document.querySelector(".cart-overlay");
const cartTotalCount = document.querySelector(".item-count-div");
const cartItemCount = document.querySelector(".card-cart-count");
const totalAmount = document.getElementById("totalAmout");
const productItemCntainer = document.querySelector(".product-row");
const cartItemContainer = document.querySelector(".card-cont");

// variables

let cart = [];


// getting products

class Products {

}

// display products

class Ui {

}

// local storage

class Storage {

}

// do rendering after dom is loaded

document.addEventListener("DOMContentLoaded", () => {

    // listen to navigation cart button click to open overlay

    cartBtn.addEventListener("click", () => {
        console.log("clciked");
        cartoverlay.classList.add("cart-overlay-show");
        document.body.classList.add("black-overlay");
    });

    // listen to cart close button click to close overlay

    cartOverlayCloseBtn.addEventListener("click", () => {
        console.log("clciked");
        cartoverlay.classList.remove("cart-overlay-show");
        document.body.classList.remove("black-overlay");
    });

    // intialising classes

    let products = new Products();
    let ui = new Ui();

});