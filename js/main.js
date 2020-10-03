// all button selected
let barsBtn = document.getElementById("barsBtn");
let cartBtn = document.getElementById("cartBtn");
let cartPlus = document.getElementById("cartPlus");
let cartMinus = document.getElementById("cartMinus");
let checkoutBtn = document.getElementById("checkoutBtn");
let addItemBtn = document.getElementById("addItemBtn");
let cartOverlayCloseBtn = document.getElementById("cartOverlayCloseBtn");
let cartOverlayResetBtn = document.getElementById("cartOverlayResetBtn");
let cartoverlay = document.querySelector(".cart-overlay");
let cartTotalCount = document.querySelector(".item-count-div");
let cartItemCount = document.querySelector(".card-cart-count");
let totalAmount = document.getElementById("totalAmout");
let productItemCntainer = document.querySelector(".product-row");
let cartItemContainer = document.querySelector(".card-cont");


// listen to navigation cart button click to open overlay

cartBtn.addEventListener("click", () => {
    console.log("clciked");
    cartoverlay.classList.add("cart-overlay-show");
    document.body.classList.add("black-overlay");
});

// listen to cart c;ose button click to close overlay

cartOverlayCloseBtn.addEventListener("click", () => {
    console.log("clciked");
    cartoverlay.classList.remove("cart-overlay-show");
    document.body.classList.remove("black-overlay");
});

// cart count