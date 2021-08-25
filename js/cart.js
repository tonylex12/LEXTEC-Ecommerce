/* Cart */

let myCart = [];

const cartDiv = document.getElementById('cart');
let cartFromLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));

const buyControl = (e) => {
    const idProducto = e.target.id;
    const selected = myCart.find(product => product.id == idProducto);
    if (selected == undefined) {
        myCart.push(products.find(product => product.id == idProducto));
    }
    else {
        swal({
            title: "Producto añadido al carrito!",
            text: "Añada otro producto o confirme su compra",
            icon: "success",
            button: "OK",
          });
    }
    localStorage.setItem('shopping-cart', JSON.stringify(myCart));
    updateCart();
}

$('.buyBtn').on('click', buyControl);

/* Delete clicked item */


const removeCartItem = (e) => {
    e.preventDefault();
    myCart = myCart.filter(item => item.id !== e.target.id);
    updateCart();
    localStorage.setItem('shopping-cart', JSON.stringify(myCart));
    if (myCart.length === 0) {
        deleteItems();
        $('#cart-img').animate({
            fontSize: '22px'
        }, 1000).css('color', 'rgba(0, 0, 0, 0.7)').delay(600).fadeOut('slow').fadeIn('slow');
    }
}

$('.delete-item').on('click', removeCartItem);


/* Delete all items from cart */

const deleteItems = () => {
    counter = 0;
    myCart = [];
    localStorage.removeItem("shopping-cart");
    cartDiv.innerHTML = `<p class="text-center fs-3 mt-4">Carrito Vacío</p>`;
    cartCounter.innerHTML = counter;
    document.getElementById('total-price').innerHTML = 0;
    $('#cart-img').animate({
        fontSize: '22px'
    }, 1000).css('color', 'rgba(0, 0, 0, 0.7)').delay(600).fadeOut('slow').fadeIn('slow');
}

$('#clear-cart').on('click', deleteItems);

/* cart counter */
const cartCounter = document.getElementById('cart-counter');


/* Function to confirm purchase */
const purchase = () => {
    if(myCart.length > 0) {
        swal({
            title: "Gracias por su compra!",
            text: "Revise su email para más detalles",
            icon: "success",
            button: "OK",
          });
          deleteItems();
    } else {
        swal("Añada productos al carrito!");
    }
}

$('#buy').on('click', purchase);


/* Open & close cart */
$('.cart-container').on('click', () => {
    $('#cart').show();
    $('#close-cart').show();
})
$('#close-cart').on('click', () => {
    $('#cart').hide();
    $('#close-cart').hide();
})





