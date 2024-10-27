class Product {
    constructor(ID, Name, Description, Price, StQ) {
        this.ID = ID;
        this.Name = Name;
        this.Description = Description;
        this.Price = Price;
        this.StQ = StQ;
        this.discountPrice = 0; // Updated property name for clarity
    }

    updateQuantity(quantity) {
        this.StQ += quantity; // Increment stock quantity
    }

    getProductInfo() {
        console.log(`ID: ${this.ID}`);
        console.log(`Name: ${this.Name}`);
        console.log(`Description: ${this.Description}`);
        console.log(`Price: ${this.Price} $`);
        console.log(`Stock: ${this.StQ}`);
        console.log(`Discount Price: ${this.discountPrice} $`);
    }

    applyDiscount(discountPercentage) {
        this.discountPrice = this.Price * (1 - discountPercentage / 100); // Calculate discount price
    }
}

class Customer {
    constructor(Id, Name, Email, Password) {
        this.Id = Id;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.OrderHistory = []; // Initialize order history
    }

    login(email, password) {
        if (this.Email === email && this.Password === password) {
            console.log("Login successfully.... WELCOME");
        } else {
            console.log("Email or Password is wrong, please try again");
        }
    }

    addToOrderHistory(shoppingCart) {
        this.OrderHistory.push({
            products: shoppingCart.productList,
            total: shoppingCart.totalPrice
        });
    }

    showOrderHistory() {
        this.OrderHistory.forEach((order, index) => {
            console.log(`Product List ${index + 1}`);
            console.log(order.products);
            console.log(`Total Price: ${order.total}`);
        });
    }
}

class ShoppingCart {
    constructor() {
        this.productList = [];
        this.totalPrice = 0;
    }

    addProduct(product, quantity) {
        if (product.StQ <= 0 || quantity <= 0) {
            console.log("This product is not available in stock");
            return;
        }

        const existingProduct = this.productList.find(p => p.ProductName === product.Name);

        if (existingProduct) {
            console.log("Product exists, updating quantity...");
            existingProduct.quantity += quantity;
        } else {
            this.productList.push({
                ProductName: product.Name,
                quantity,
                Price: product.Price,
                discountPrice: product.discountPrice
            });
        }

        product.StQ -= quantity; // Reduce the stock quantity
    }

    removeProduct(productName) {
        const productIndex = this.productList.findIndex(p => p.ProductName.toUpperCase() === productName.toUpperCase());
    
        if (productIndex !== -1) {
            this.productList.splice(productIndex, 1);
        } else {
            console.log("Please enter a valid product");
        }
    }

    updateProductQuantity(product, newQuantity) {
        const existingProduct = this.productList.find(p => p.ProductName.toUpperCase() === product.Name.toUpperCase());

        if (existingProduct) {
            const oldQuantity = existingProduct.quantity;
            existingProduct.quantity = newQuantity;
            product.StQ += oldQuantity - newQuantity; // Adjust stock based on the change in quantity
        }
    }

    calculateTotalPrice() {
        this.totalPrice = this.productList.reduce((total, product) => {
            const priceToUse = product.discountPrice || product.Price; // Use discount price if available
            return total + (priceToUse * product.quantity);
        }, 0);
        
        console.log(`Total Price: ${this.totalPrice}`);
    }

    showProductList() {
        this.productList.forEach((product, index) => {
            console.log(`Product ${index} Info:`);
            console.log(`Product: ${product.ProductName}`);
            console.log(`Quantity: ${product.quantity}`);
            console.log(`Price: ${product.Price}`);
            console.log(`Discount Price: ${product.discountPrice}`);
        });
    }
}

// Example usage
console.log("Create Users");
const customer1 = new Customer(7654, "Jonathan", "Jonathan.cus1@gmail.com", "Passw@rd");
customer1.login("Jonathan.cus1@gmail.com", "PDPHDBC");
customer1.login("Jonathan.cus1@gmail.com", "Passw@rd");

console.log("Create Products");
const blackSneakers = new Product(1, "Black Sneakers", "Comfortable black sneakers for everyday wear", 145, 20);
blackSneakers.getProductInfo();

const blueJeans = new Product(2, "Blue Jeans", "Classic blue denim jeans", 234, 24);
blueJeans.getProductInfo();

const brownBoots = new Product(3, "Brown Boots", "Sturdy brown boots for outdoor activities", 100, 34);
brownBoots.getProductInfo();

console.log("Apply discount test on brownBoots and stock quantity");
brownBoots.applyDiscount(50);
brownBoots.updateQuantity(6);
brownBoots.getProductInfo();

console.log("Create Shopping Cart for customer 1");
const cart1 = new ShoppingCart();
cart1.addProduct(blackSneakers, 3);
cart1.addProduct(brownBoots, 5);
cart1.showProductList();

const cart2 = new ShoppingCart();
cart2.addProduct(blueJeans, 9);
cart2.addProduct(brownBoots, 5);
cart2.addProduct(blackSneakers, 4);
cart2.calculateTotalPrice();

console.log("Update product quantity and remove the brownBoots from the shopping cart");
cart1.removeProduct(brownBoots.Name);
cart1.updateProductQuantity(blackSneakers, 5);
cart1.showProductList();

console.log("Black Sneakers stock update");
blackSneakers.getProductInfo();

console.log("Total paid for the shopping cart");
cart1.calculateTotalPrice();

console.log("Order History Customer 1");
customer1.addToOrderHistory(cart1);
customer1.addToOrderHistory(cart2);
customer1.showOrderHistory();

