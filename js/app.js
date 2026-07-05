// Init web data state on launch
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    updateCartUI();
    updateWishlistUI();
});

// Global window event listener to close modals when background overlay is clicked
window.onclick = function(event) {
    const modalProd = document.getElementById("product-modal");
    const modalCheck = document.getElementById("checkout-modal");
    if (event.target == modalProd) modalProd.style.display = "none";
    if (event.target == modalCheck) modalCheck.style.display = "none";
}