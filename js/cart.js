let cart = JSON.parse(localStorage.getItem('tutu_cart')) || [];

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, qty: 1});
    }
    saveCart();
}

function updateQty(id, qty) {
    if(qty <= 0) {
        confirmDeleteItem(id);
    } else {
        const item = cart.find(item => item.id === id);
        if(item) item.qty = parseInt(qty);
        saveCart();
    }
}

function confirmDeleteItem(id) {
    const product = products.find(p => p.id === id);
    const setujuHapus = confirm(`Apakah Kakak yakin ingin menghapus "${product.name}" dari keranjang belanja imutmu?`);
    if (setujuHapus) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
    } else {
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('tutu_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const countSpan = document.getElementById("cart-count");
    const totalSpan = document.getElementById("cart-total-price");
    
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-item-info">
                    <h4 style="font-size:14px;">${item.name}</h4>
                    <p style="font-size:12px; color:#E07A8A;">Rp ${item.price.toLocaleString('id-ID')}</p>
                    <div class="cart-item-qty" style="font-size:12px;">
                        Qty: <input type="number" value="${item.qty}" min="1" onchange="updateQty(${item.id}, this.value)">
                    </div>
                </div>
                <i class="fa-solid fa-trash" style="color:#E07A8A; cursor:pointer; font-size:14px;" onclick="confirmDeleteItem(${item.id})"></i>
            </div>
        `;
    });
    countSpan.innerText = count;
    totalSpan.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}