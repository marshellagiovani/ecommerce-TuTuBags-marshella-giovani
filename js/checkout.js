function showCheckoutForm() {
    if(cart.length === 0) {
        alert("Keranjang kamu masih kosong, pilih tas lucu dulu yuk!");
        return;
    }
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById("checkout-total-price").innerText = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById("checkout-modal").style.display = "flex";
}

function closeCheckout() { 
    document.getElementById("checkout-modal").style.display = "none"; 
}

function processCheckout(e) {
    e.preventDefault();
    
    const loader = document.getElementById("loading-overlay");
    loader.style.display = "flex";
    const name = document.getElementById("name").value;
    const paymentMethod = document.getElementById("payment").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const shipping = document.getElementById("shipping").value.toUpperCase();
    
    setTimeout(() => {
        loader.style.display = "none";
        
        alert(`[MIDTRANS GATEWAY SANDBOX SECURE RESPONSE]\n\n` +
              `Status Transaksi: SUCCESS (200)\n` +
              `-------------------------------------------\n` +
              `Terima kasih Kak ${name}!\n` +
              `Email Notifikasi: ${email}\n` +
              `No WhatsApp: ${phone}\n` +
              `Ekspedisi: VIA ${shipping}\n` +
              `Metode Pembayaran: VA/QRIS ${paymentMethod.toUpperCase()}\n\n` +
              `Sistem TuTu Bags berhasil mengunci dana pesananmu. Paket imutmu segera dikemas dan dikirim! ✨`);
        
        cart = [];
        saveCart();
        closeCheckout();
        toggleCart();
    }, 2000); 
}