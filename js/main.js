let cartBtn = document.getElementById("cartBtn");
let cartoverlay = document.querySelector(".cart-overlay");


// listen to cart click

cartBtn.addEventListener("click", ()=> {
    console.log("clciked");
    cartoverlay.classList.add("cart-overlay-show");
});