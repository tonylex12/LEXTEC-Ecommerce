/* Function to generate HTML */
const productsHTML = (arr, container) => {
    container.innerHTML = '';
    for (let product of arr) {
        container.innerHTML += `<div class="box">
                                    <h3>${product.model}</h3>
                                    <img src="images/${product.category}/${product.id}.png">
                                    <h4>Precio: $${product.price}</h4>
                                    <button id="${product.id}" class="buyBtn">Comprar</button>
                                </div>`;
    }
    $('.buyBtn').on('click', buyControl);
}

/* Functions to sort products by price */

const lessPrice = (arr, container) => {
    container.innerHTML = '';
    let sortArr = arr.sort((a, b) => a.price - b.price);
    for (let product of sortArr) {
        container.innerHTML += `<div class="box">
                                        <h3>${product.model}</h3>
                                        <img src="images/${product.category}/${product.id}.png">
                                        <h4>Precio: $${product.price}</h4>
                                        <button id="${product.id}" class="buyBtn">Comprar</button>
                                      </div>`;
    }
    $('.buyBtn').on('click', buyControl);
}

const greaterPrice = (arr, container) => {
    container.innerHTML = '';
    let sortArr = arr.sort((a, b) => b.price - a.price);
    for (let product of sortArr) {
        container.innerHTML += `<div class="box">
                                        <h3>${product.model}</h3>
                                        <img src="images/${product.category}/${product.id}.png">
                                        <h4>Precio: $${product.price}</h4>
                                        <button id="${product.id}" class="buyBtn">Comprar</button>
                                </div>`;
    }
    $('.buyBtn').on('click', buyControl);
}

/* Function to update Cart */

const updateCart = () => {
    cartDiv.innerHTML = '';
    myCart = [...new Set(myCart)]
    for (let product of myCart) {
        cartDiv.innerHTML += `<div class="d-flex flex-column align-items-center cart-item mx-auto mt-4">
                                <img class="m-1 img-fluid" src="images/${product.category}/${product.id}.png" width="80px" height="auto">
                                <p>${product.model}</p>
                                <div class="m-0 d-flex flex-row justify-content-center align-items-center">
                                    <p class="m-0">Cantidad</p>
                                    <button id="${product.id}" class="m-2 btn-add btnQ"><i class="fas fa-plus"></i></button>
                                    <span class="m-1 fs-6">${product.quantity}</span>
                                    <button id="${product.id}" class="m-2 btn-sub btnQ"><i class="fas fa-minus"></i></button>
                                </div>
                                <p class="m-1">Precio: $<span class="item-price">${product.price}</span></p>
                                <button type="button" class="btn btn-outline-secondary mb-3 delete-item" id="${product.id}">Eliminar item</button>
                              </div>`;
    }
    cartCounter.innerHTML = myCart.length;
    $('#cart').append(`<div class="cart-options mt-3 mx-auto">
                        <button class="cleanCart m-1" id="clear-cart">Vaciar</button>
                        <button type="button" class="btn btn-outline-secondary rounded-3 m-1">Total: $<span id="total-price">0</span></button>
                        <button type="button" class="purchase btn btn-success rounded-3 m-1" id="buy">Confirmar</button>
                    </div>`);
    totalPrice(myCart);
    $('.buyBtn').on('click', buyControl);
    $('.delete-item').on('click', removeCartItem);
    $('#clear-cart').on('click', deleteItems);
    $('#buy').on('click', purchase);
    $('.btn-add').click(addOne);
    $('.btn-sub').click(minusOne);
    $('#cart-img').animate({
        fontSize: '24px'
    }, 1000).css('color', '#e30521').delay(2000).fadeOut('slow').fadeIn('slow');
}

function addOne() {
    let product = myCart.find(item => item.id == this.id);
    product.addQuantity(1);
    $(this).parent().children()[2].innerHTML = product.quantity;
    totalPrice(myCart);
    localStorage.setItem('shopping-cart', JSON.stringify(myCart));
}

function minusOne() {
    let product = myCart.find(item => item.id == this.id)
    if (product.quantity > 1) {
        product.addQuantity(-1);
        $(this).parent().children()[2].innerHTML = product.quantity;
    }
    totalPrice(myCart);
    localStorage.setItem('shopping-cart', JSON.stringify(myCart));
}

function totalPrice(arr) {
    let total = 0;
    arr.forEach(product => total += product.subTotal());
    document.getElementById('total-price').innerHTML = total;
}

