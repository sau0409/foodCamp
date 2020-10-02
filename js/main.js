let cartBtn = document.getElementById("cartBtn");
let cartOverlayCloseBtn = document.getElementById("cartOverlayCloseBtn");
let cartoverlay = document.querySelector(".cart-overlay");


// listen to cart click

cartBtn.addEventListener("click", ()=> {
    console.log("clciked");
    cartoverlay.classList.add("cart-overlay-show");
    document.body.classList.add("black-overlay");
});

cartOverlayCloseBtn.addEventListener("click", ()=> {
    console.log("clciked");
    cartoverlay.classList.remove("cart-overlay-show");
    document.body.classList.remove("black-overlay");
});