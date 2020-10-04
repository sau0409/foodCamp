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

    async getProductsFromBackend() {
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
                let product = Storage.getProduct(btnId);
                //destructuring product as per need 
                //itemCount will have that item count
                let cartItem = {
                    itemId: product.itemId,
                    itemName: product.itemName,
                    price: product.price,
                    img: product.img,
                    itemCount: 1
                }
                // add selected item to cart
                cart = [...cart, cartItem];
                Storage.storeCart(cart);

                el.innerHTML = "In cart";
                el.disabled = true;
                // display cart length on navbar
                
                this.setCartValues(cart);
                console.log(cartItem);
                this.displayCartItem(cartItem);
            })
            let cartCount = 0;
            cart.forEach((elem)=> {
                cartCount+= elem.itemCount;
            })
            cartTotalCount.innerHTML = String(cartCount);
        });
    }

    //calculation total cart amount and total item count

    setCartValues(cart) {
        let cartCount = 0;
        let cartAmount = 0;
        cart.forEach((elem)=> {
            cartCount+= elem.itemCount;
            cartAmount+= elem.itemCount * parseInt(elem.price);
        })
        cartTotalCount.innerHTML = String(cartCount);
        totalAmount.innerText = String(cartAmount);
    }

    //displaying cart

    displayCartItem(item) {
        console.log(item);
            let cartItemDiv = `<div class="card card-cart">
            <div>
                <img src="${item.img}" class="cart-img" alt="kdai paneer image">
            </div>
            <div class="card-cart-t">
                <p class="card-cart-t-1">${item.itemName}</p>
                <p class="card-cart-t-2">${item.price} &#x20B9;</p>
            </div>
            <div class="cart-cal-item">
                <button class="cart-btn" data-id=${item.itemId}>
                    <i class="fas fa-plus-square cart-ic"></i>
                </button>
                <div class="card-cart-count">${item.itemCount}</div>
                <button class="cart-btn" data-id=${item.itemId}>
                    <i class="fas fa-minus-square cart-ic"></i>
                </button>
            </div>
        </div>`
        console.log(cartItemDiv);
        cartItemContainer.insertAdjacentHTML("afterbegin", cartItemDiv);

    }



}

// local storage

class Storage {
    static storeProducts(products) {
        window.sessionStorage.setItem("products", JSON.stringify(products));
    }
    
    static getProducts() {
        return JSON.parse(window.sessionStorage.getItem("products"));
    }

    static getProduct(id) {
        let productsArray = this.getProducts();
        return productsArray.find((elem)=> {
            return elem.itemId === id
        })
    }

    static storeCart(cart) {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return JSON.parse(window.localStorage.getItem("cart"));
    }

    static getCartItem(id) {
        let cartArray = this.getCart();
        return cartArray.find((elem)=> {
            return elem.itemId === id
        })
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

    products.getProductsFromBackend().then((products) => {
        ui.displayProducts(products);
        Storage.storeProducts(products);
    }).then(() => {
        ui.getProductAddBtn();
        
    });


});