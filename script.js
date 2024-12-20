let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Function to add items to cart
function addToCart(name, price) {
    const item = { name, price, quantity: 1 };
    const existingItem = cart.find(product => product.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}

// Function to remove items from the cart (used on cart.html)
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Function to display cart items on cart.html
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmountElement.innerText = '$0.00';
        return;
    }

    cartContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;

        const cartItem = `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                    <h5 class="mb-0">${item.name}</h5>
                    <small>Price: $${item.price} | Quantity: ${item.quantity}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', cartItem);
    });

    totalAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
}

