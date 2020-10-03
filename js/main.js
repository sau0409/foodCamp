// all buttons and containers selected
const barsBtn = document.getElementById("barsBtn");
const cartBtn = document.getElementById("cartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartOverlayCloseBtn = document.getElementById("cartOverlayCloseBtn");
const cartOverlayResetBtn = document.getElementById("cartOverlayResetBtn");
const cartoverlay = document.querySelector(".cart-overlay");
const cartTotalCount = document.querySelector(".item-count-div");
const totalAmount = document.getElementById("totalAmout");
const productItemCntainer = document.querySelector(".product-row");
const cartItemContainer = document.querySelector(".card-cont");

const cartPlusBtn = document.getElementById("cartPlus");
const cartMinusBtn = document.getElementById("cartMinus");
const cartItemCount = document.querySelector(".card-cart-count");

// variables

let cart = [];

// getting products

class Products {

    async getProducts() {
        try {
            let productsList = await fetch("./data/foodCatalogueItems.json");
            let data = await productsList.json();
            let products = data.items;
            let id = 0;
            products = products.map((item) => {
                id++;
                let {
                    itemName,
                    group,
                    subGroup,
                    price,
                    image: img
                } = item;
                return {
                    itemId: String(id),
                    itemName,
                    group,
                    subGroup,
                    price,
                    img
                }
            });
            return products;
        } catch (err) {
            console.log(err);
        }
    }
}

// display products

class Ui {

    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            let productDiv = `<div class="col-sm">
            <div class="card product-card">
                <img src="${product.img}" class="product-img" alt="kdai paneer image">
                <div class="card-body">
                    <h6 class="card-title">${product.itemName}</h6>
                    <p class="card-text mt-n2">${product.price} &#x20B9;</p>
                    <div class="c-prod-btn mt-n2">
                        <button class="btn btn-block btn-success product-add-btn" id="${product.itemId}">Add</button>
                    </div>
                </div>
            </div>
        </div>`
            productItemCntainer.insertAdjacentHTML('afterbegin', productDiv);
        });
    }

    getProductAddBtn() {
        const addItemBtn = [...document.querySelectorAll(".product-add-btn")];

        addItemBtn.forEach((el, index) => {
            let btnId = el.getAttribute("id");
            if (cart.find((ele) =>
                    ele.itemId === btnId
                )) {
                el.innerHTML = "In cart";
                el.disabled = true;
            }
            el.addEventListener("click", () => {
                let pro = JSON.parse(window.sessionStorage.getItem("products"));

                cart.push(pro.find((proEl) => {
                    return proEl.itemId === btnId;
                }));
                Storage.storeCart(cart);

                console.log(cart);
                el.innerHTML = "In cart";
                el.disabled = true;
                cartTotalCount.innerHTML = cart.length;
            })
            cartTotalCount.innerHTML = cart.length;
        });
    }



}

// local storage

class Storage {
    static storeProducts(products) {
        window.sessionStorage.setItem("products", JSON.stringify(products));
    }

    static storeCart(cart) {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// do rendering after dom is loaded

document.addEventListener("DOMContentLoaded", () => {

    let cartLocalStorage = JSON.parse(window.localStorage.getItem("cart"));
        if(cartLocalStorage) {
            cart = cartLocalStorage;
        }

    // listen to navigation cart button click to open overlay

    cartBtn.addEventListener("click", () => {
        cartoverlay.classList.add("cart-overlay-show");
        document.body.classList.add("black-overlay");
    });

    // listen to cart close button click to close overlay

    cartOverlayCloseBtn.addEventListener("click", () => {
        cartoverlay.classList.remove("cart-overlay-show");
        document.body.classList.remove("black-overlay");
    });

    // creating instance of classes

    let products = new Products();
    let ui = new Ui();

    products.getProducts().then((products) => {
        ui.displayProducts(products);
        Storage.storeProducts(products);
    }).then(() => {
        ui.getProductAddBtn();
    });


});