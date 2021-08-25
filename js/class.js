class Product {
    constructor(model, id, price, category, quantity){
        this.model = model;
        this.id = id;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
    }

    addQuantity(value) {
        this.quantity += value;
    }

    subTotal() {
        return this.quantity * this.price;
    }
}

class Laptop extends Product {
    constructor(model, id, price, category, quantity){
        super(model, id, price, category, quantity);
    }
}

class Smartphone extends Product {
    constructor(model, id, price, category, quantity){
        super(model, id, price, category, quantity);
    }
}

class Tablet extends Product {
    constructor(model, id, price, category, quantity){
        super(model, id, price, category, quantity);
    }
}