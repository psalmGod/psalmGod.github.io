// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Function to add items to the cart
function addToCart(name, price) {
    // Check if the product already exists in the cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    // Save to localStorage and update the count
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}

// Display cart items on the Cart Page
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        totalAmountElement.innerText = '$0.00';
        return;
    }

    // Clear the cart container before updating
    cartContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;

        const cartItem = `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                    <h5 class="mb-0">${item.name}</h5>
                    <small>Price: $${item.price.toFixed(2)} | Quantity: ${item.quantity}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', cartItem);
    });

    totalAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
}

// Remove items from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}
