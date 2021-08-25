const products = [];
let laptops = [];
let smartphones = [];
let tablets = [];

$(document).ready(function () {
    if ('shopping-cart' in localStorage) {
        const arrayLiterals = cartFromLocalStorage;
        if(arrayLiterals.length > 0) {
            for (const literal of arrayLiterals) {
                myCart.push(new Product(literal.model, literal.id, literal.price, literal.category, literal.quantity))
            }
        }
        updateCart();
    }

    if(myCart.length === 0) {
        $('#cart').append(`<p class="text-center fs-3 mt-4"> Carrito Vacío</p>`);
    }
    
    $.get('products.json', function(data, status) {
        if (status == 'success') {
            for (let literal of data) {
                products.push(new Product(literal.model, literal.id, literal.price, literal.category, literal.quantity))
            }
        }
        laptops = products.filter(product => product.category == "laptops")
        smartphones = products.filter(product => product.category == "smartphones")
        tablets= products.filter(product => product.category == "tablets")
        productsHTML(laptops, laptopContainer);
        productsHTML(smartphones, phoneContainer);
        productsHTML(tablets, tabletContainer);
    })
})

/* Laptops */

let laptopContainer = document.getElementById('laptop-container');

/* Smartphones */

let phoneContainer = document.getElementById('phone-container')

/* Tablets */

let tabletContainer = document.getElementById('tablet-container')

/* Sort Laptops by Price */

const lessLaptops = () => {
    lessPrice(laptops, laptopContainer);
    $('#laptop-container').slideUp(10, () => {
        $('#laptop-container').slideDown('fast');
    })
}

const greaterLaptops = () => {
    greaterPrice(laptops, laptopContainer);
    $('#laptop-container').slideUp(10, () => {
        $('#laptop-container').slideDown('fast');
    })
}

$('#lessLaptops').on('click', lessLaptops)
$('#greaterLaptops').on('click', greaterLaptops)

/* Sort Smartphones by Price */

const lessPhones = () => {
    lessPrice(smartphones, phoneContainer);
    $('#phone-container').slideUp(10, () => {
        $('#phone-container').slideDown('fast');
    })
}

const greaterPhones = () => {
    greaterPrice(smartphones, phoneContainer);
    $('#phone-container').slideUp(10, () => {
        $('#phone-container').slideDown('fast');
    })
}

$('#lessPhones').on('click', lessPhones)
$('#greaterPhones').on('click', greaterPhones)

/* Sort Tablets by Price */

const lessTablets = () => {
    lessPrice(tablets, tabletContainer);
    $('#tablet-container').slideUp(10, () => {
        $('#tablet-container').slideDown('fast');
    })
}

const greaterTablets = () => {
    greaterPrice(tablets, tabletContainer);
    $('#tablet-container').slideUp(10, () => {
        $('#tablet-container').slideDown('fast');
    })
}

$('#lessTablets').on('click', lessTablets)
$('#greaterTablets').on('click', greaterTablets)

/* Login Sign Up form */
$(document).on('click','.user, .already-account', function(){
    $('.form').addClass('login-active').removeClass('sign-up-active')
});

$(document).on('click','.sign-up-btn', function(){
    $('.form').addClass('sign-up-active').removeClass('login-active')
});

$(document).on('click','.form-cancel', function(){
    $('.form').removeClass('login-active').removeClass('sign-up-active')
});

const searchDiv = document.getElementById('results-container');
let searchInput = document.getElementById('search-product')

/* To get input for search */
$('#search-product').keyup(function(e) {
    const inputSearch = this.value.toUpperCase();
    if(inputSearch != "") {
        const result = products.filter(product => product.model.includes(inputSearch.toUpperCase()));
        productsHTML(result, searchDiv);
    } else {
        searchDiv.innerHTML = ""
    }
})

$('.btn-cancel').on('click', function() {
    console.log("click")
    searchInput.value = "";
    searchDiv.innerHTML = "";
})

