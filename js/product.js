const products = [
    { id: 1, name: "Puffy Cloud Mint Bag", price: 135000, category: "shoulder bag", rating: 5.0, image: "assets/images/tas1.jpg", desc: "Tas bahu besar model puffy empuk bertekstur kotak gelembung awan dengan warna hijau mint pastel cerah dan kantong depan ganda." },
    { id: 2, name: "Soft Pink Quilted Shoulder Bag", price: 145000, category: "shoulder bag", rating: 4.9, image: "assets/images/tas2.jpg", desc: "Tas jinjing nilon puffy merah muda soft yang manis dilengkapi gantungan boneka kecil menggemaskan bergaya coquette." },
    { id: 3, name: "Matcha Checkered Knit Bag", price: 125000, category: "shoulder bag", rating: 4.8, image: "assets/images/tas3.jpg", desc: "Tas rajutan tenun wol motif bunga daisy putih cantik di atas warna hijau matcha yang estetik abis." },
    { id: 4, name: "Peach Tulip Canvas Bag", price: 95000, category: "tote bag", rating: 4.7, image: "assets/images/tas4.jpg", desc: "Tote bag bahan kanvas kokoh berwarna krem pastel dengan sablon ilustrasi bunga tulip pink minimalis yang anggun." },
    { id: 5, name: "Lilac Sweet Ribbon Puffy Bag", price: 138000, category: "sling bag", rating: 4.9, image: "assets/images/tas5.jpg", desc: "Slingbag mini puffy kerut berbalut warna ungu lilac lembut dengan aksen ikat simpul tali panjang yang lucu." },
    { id: 6, name: "Strawberry Cream Woven Sling", price: 110000, category: "sling bag", rating: 5.0, image: "assets/images/tas6.jpg", desc: "Pouch mini serut rajutan berbentuk buah strawberry merah segar dengan penutup daun hijau yang sangat unik." },
    { id: 7, name: "Sage Everyday Canvas Pouch", price: 99000, category: "pouch", rating: 4.6, image: "assets/images/tas7.jpg", desc: "Pouch kotak penyimpanan tebal berbahan canvas polos warna hijau sage pastel minimalis untuk tempat kosmetik atau mukena." },
    { id: 8, name: "Milk Caramel Bear Drawstring", price: 140000, category: "sling bag", rating: 4.9, image: "assets/images/tas8.jpg", desc: "Tas bentuk unik siluet kelopak kuncup bunga berwarna cokelat karamel susu dengan tali pegangan kerut scrunchie yang modis." },
    { id: 9, name: "Teddy Tote Bag", price: 105000, category: "tote bag", rating: 4.8, image: "assets/images/tas9.jpg", desc: "Tote bag bahan beludru kokoh berwarna krem pastel dengan gambar boneka beruang berwarna coklat yang lucu." },
    { id: 10, name: "Pink Ribbon Bag", price: 100000, category: "sling bag", rating: 4.9, image: "assets/images/tas10.jpg", desc: "Tas model Vegan Leather empuk bertekstur bergambar pita dengan pita pink serta nuansa pink pastel." },
    { id: 11, name: "Cute Cherry Bag", price: 142000, category: "hand bag", rating: 5.0, image: "assets/images/tas11.jpg", desc: "Tas dengan model velvet empuk bertekstur lembut bulu dengan warna pink pastel dan krem serta gantungan cherry di bagian resleting." },
    { id: 12, name: "Brown Cat BackPack", price: 130000, category: "backpack", rating: 5.0, image: "assets/images/tas12.jpg", desc: "Ransel model velvet empuk bertekstur lembut bulu dengan warna coklat muda dan putih serta hiasan headphone pink." },
    { id: 13, name: "Pink Teddy bag charm", price: 50000, category: "bag charm", rating: 4.5, image: "assets/images/bagcharm1.jpg", desc: "Gantungan tas model beruang berwarna pink pastel." },
    { id: 14, name: "Pink Rabbit bag charm", price: 45000, category: "bag charm", rating: 4.6, image: "assets/images/bagcharm2.jpg", desc: "Gantungan tas model kelinci berwarna pink pastel." },
    { id: 15, name: "Croissant bag charm", price: 65000, category: "bag charm", rating: 5.0, image: "assets/images/bagcharm3.jpg", desc: "Gantungan tas model croissant berwarna coklat." },
    { id: 16, name: "Capybara bag charm", price: 70000, category: "bag charm", rating: 4.9, image: "assets/images/bagcharm4.jpg", desc: "Gantungan tas model capybara berwarna coklat dengan hiasan kepala strawberry." }
];

function renderProducts(items) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    if(items.length === 0) {
        grid.innerHTML = "<p style='text-align:center; grid-column:1/-1; padding: 20px;'>Wah, produk imut yang kamu cari tidak ditemukan...</p>";
        return;
    }
    items.forEach(p => {
        const isWish = wishlist.includes(p.id) ? "active" : "";
        grid.innerHTML += `
            <div class="product-card">
                <button class="btn-wishlist ${isWish}" onclick="toggleWishlist(${p.id}, this)">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <img src="${p.image}" class="product-image" alt="${p.name}" onclick="openModal(${p.id})">
                <div class="product-info" onclick="openModal(${p.id})">
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i> <span>${p.rating.toFixed(1)}</span>
                    </div>
                    <h3>${p.name}</h3>
                    <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${p.id})">
                        <i class="fa-solid fa-plus"></i> Tambah Keranjang
                    </button>
                </div>
            </div>
        `;
    });
}

function filterProducts() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const catVal = document.getElementById("category-filter").value;
    const priceVal = document.getElementById("price-filter").value;
    let filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal);
        const matchesCat = (catVal === "all") || (p.category === catVal);
        const matchesPrice = (priceVal === "all") || 
                             (priceVal === "under-100" && p.price < 100000) || 
                             (priceVal === "above-100" && p.price >= 100000);
        return matchesSearch && matchesCat && matchesPrice;
    });
    renderProducts(filtered);
}

function resetFilters() {
    document.getElementById("search-input").value = "";
    document.getElementById("category-filter").value = "all";
    document.getElementById("price-filter").value = "all";
    renderProducts(products);
}

function openModal(id) {
    const product = products.find(p => p.id === id);
    const modal = document.getElementById("product-modal");
    const body = document.getElementById("modal-body");
    
    body.innerHTML = `
        <img src="${product.image}" class="modal-img">
        <div class="modal-details">
            <div class="product-rating" style="font-size:15px; margin-bottom:5px;">
                <i class="fa-solid fa-star"></i> <span>${product.rating.toFixed(1)}</span>
            </div>
            <h2>${product.name}</h2>
            <p class="product-price" style="font-size:20px; margin: 10px 0;">Rp ${product.price.toLocaleString('id-ID')}</p>
            <p style="margin-bottom:20px; color:#666; font-size:14px; line-height:1.6;">${product.desc}</p>
            <button class="btn-submit-order" onclick="addToCart(${product.id}); closeModal();">Tambah ke Keranjang</button>
        </div>
    `;
    modal.style.display = "flex";
}

function closeModal() { 
    document.getElementById("product-modal").style.display = "none"; 
}