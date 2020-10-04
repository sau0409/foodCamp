// all buttons and containers selected
const barsBtn = document.getElementById("barsBtn");
const cartBtn = document.getElementById("cartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartOverlayCloseBtn = document.getElementById("cartOverlayCloseBtn");
const cartResetBtn = document.getElementById("cartOverlayResetBtn");
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

let productAddBtn = [];

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
        //will display all the products
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
            //adding products in container
            productItemCntainer.insertAdjacentHTML('afterbegin', productDiv);

        });
    }

    getProductAddBtn() {
        const addItemBtn = [...document.querySelectorAll(".product-add-btn")];
        productAddBtn = addItemBtn;
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

                //set cart values for item
                this.setCartValues(cart);

                //display cart items in cart
                this.displayCartItem(cartItem);

            })

            this.setCartValues(cart);

        });
    }

    //calculation total cart amount and total item count

    setCartValues(cart) {
        let cartCount = 0;
        let cartAmount = 0;
        cart.forEach((elem) => {
            cartCount += elem.itemCount;
            cartAmount += elem.itemCount * parseInt(elem.price);
        })
        cartTotalCount.innerHTML = String(cartCount);
        totalAmount.innerText = String(cartAmount);
    }

    //displaying cart

    displayCartItem(item) {
        let cartItemDiv = `<div class="card card-cart" id="item-${item.itemId}">
            <div>
                <img src="${item.img}" class="cart-img" alt="kdai paneer image">
            </div>
            <div class="card-cart-t">
                <p class="card-cart-t-1">${item.itemName}</p>
                <p class="card-cart-t-2">${item.price  * item.itemCount} &#x20B9;</p>
                <p class="card-cart-t-3 item-remove" data-id="${item.itemId}">Remove</p>
            </div>
            <div class="cart-cal-item">
                <button class="cart-btn"  functionality="add">
                    <i class="fas fa-plus-square item-add cart-ic" data-id=${item.itemId}></i>
                </button>
                <div class="card-cart-count">${item.itemCount}</div>
                <button class="cart-btn"  functionality="minus">
                    <i class="fas fa-minus-square item-minus cart-ic" data-id=${item.itemId}></i>
                </button>
            </div>
        </div>`
        cartItemContainer.insertAdjacentHTML("afterbegin", cartItemDiv);

    }

    //setup initial cart

    setupCart() {

        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);

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
    }

    populateCart(cart) {
        cart.forEach((el) => this.displayCartItem(el));
    }


    cartLogic() {

        //clear cart
        cartResetBtn.addEventListener("click", () => {
            this.clearCart();
        });

        //cart item listner
        cartItemContainer.addEventListener("click", (event)=>{
            let target = event.target;
            let id = target.getAttribute("data-id");

            if (target.classList.contains('item-remove')) {
                this.removeCartItem(id);
            }
            else if  (event.target.classList.contains('item-add')) {
                console.log("add");
                

            }
            else if  (event.target.classList.contains('item-minus')) {
                console.log("minus");
            }
        });



        /*const cardBtn = document.querySelectorAll('.cart-btn');
        cardBtn.forEach((card) => {
            card.addEventListener("click", () => {
                console.log("cart btn pressed")
                let cartItemPressed = cart.find((el) => {
                    return el.itemId === card.getAttribute("data-id");
                })
                console.log(cartItemPressed);
                let functionality = card.getAttribute("functionality");
                console.log(functionality);

                if (functionality === 'add') {
                    console.log("cart add btn pressed")
                    cartItemPressed.itemCount = parseInt(cartItemPressed.itemCount) + 1;
                    this.removeCartItem(cartItemPressed.itemId);
                    console.log("cart item removed");
                    this.displayCartItem(cartItemPressed);
                    console.log("cart item added");
                } else if (functionality === 'minus') {
                    if (parseInt(cartItemPressed.itemCount) > 1) {
                        console.log("cart minus btn pressed")
                        cartItemPressed.itemCount = parseInt(cartItemPressed.itemCount) - 1;
                        this.removeCartItem(cartItemPressed.itemId);
                        this.displayCartItem(cartItemPressed);
                        console.log("cart item added");
                    } else {
                        console.log("cart minus btn pressed else logic")
                        let itemIndex = cart.findIndex((el) => {
                            return el.itemId === cartItemPressed.itemId;
                        });
                        cart.splice(itemIndex, 1);
                        this.removeCartItem(cartItemPressed.itemId);
                    }
                }

                Storage.storeCart(cart);
                this.updateCart(cart);
            })
        })*/
    }

    clearCart() {
        let cartItems = cart.map((item)=> item.itemId);
        cartItems.forEach((el)=> {
            this.removeCartItem(el);
        });
        console.log(cartItems);
    }

    removeCartItem(itemId) {
        cart = cart.filter((item)=> {
            return item.itemId !== itemId;
        });
        this.setCartValues(cart);
        Storage.storeCart(cart);
        let itemEl = document.getElementById(`item-${itemId}`);
        cartItemContainer.removeChild(itemEl);
        this.enableProduct(itemId);
    }

    enableProduct(itemId) {
        let product = productAddBtn.find((el)=> {
            return itemId === el.getAttribute("id");
        })
        product.innerHTML = "Add";
        product.disabled = false;
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
        return productsArray.find((elem) => {
            return elem.itemId === id
        })
    }

    static storeCart(cart) {
        window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : [];
    }

    static getCartItem(id) {
        let cartArray = this.getCart();
        return cartArray.find((elem) => {
            return elem.itemId === id
        })
    }
}

// do rendering after dom is loaded

document.addEventListener("DOMContentLoaded", () => {

    // creating instance of classes
    let products = new Products();
    let ui = new Ui();

    //setup cart items
    ui.setupCart();


    products.getProductsFromBackend().then((products) => {
        ui.displayProducts(products);
        Storage.storeProducts(products);
    }).then(() => {
        ui.getProductAddBtn();
        ui.cartLogic();
    });


});