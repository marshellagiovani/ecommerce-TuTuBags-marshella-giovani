let wishlist = JSON.parse(localStorage.getItem('tutu_wishlist')) || [];

function toggleWishlist(id, btn) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        btn.classList.remove("active");
    } else {
        wishlist.push(id);
        btn.classList.add("active");
    }
    localStorage.setItem('tutu_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.getElementById("wishlist-count").innerText = wishlist.length;
}