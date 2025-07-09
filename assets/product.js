// Product data for each category
const products = {
  general: [
    { name: 'Acer Aspire 5', price: '฿15,900', img: 'assets/image/acer-aspire-a515-56g-55kf-silver-1.jpg' },
    { name: 'HP 15s', price: '฿13,500', img: 'assets/image/HP-Notebook-15S-FQ1129TU-1.jpg' },
    { name: 'Lenovo IdeaPad 3', price: '฿14,200', img: 'assets/image/Lenovo-Notebook-IdeaPad-3-01.jpg' },
    { name: 'Asus VivoBook 15', price: '฿16,900', img: 'assets/image/asus-notebook-vivobook-15-M1502YA-NJ755WA-01.jpg' },
    { name: 'Dell Inspiron 15', price: '฿17,500', img: 'assets/image/dell-inspiron-oin3530340701gth-3530-ps-w-platinum-silver-1.jpg' },
    { name: 'MSI Modern 14', price: '฿18,900', img: 'assets/image/MSI-Notebook-Modern-14-B11MO-258TH-Grey-1.jpg' },
    { name: 'Huawei MateBook D15', price: '฿15,500', img: 'assets/image/Huawei-Notebook-MateBook-D15-Silver-1.jpg' },
    { name: 'DELL Inspiron 5440', price: '฿19,900', img: 'assets/image/dell-notebook-inspiron-5440-oin5440220701gth-silver-1.jpg' },
    { name: 'Toshiba Satellite Pro', price: '฿13,900', img: 'assets/image/61Ta4G8oGKL._AC_SL1500_.jpg' }
  ],
  work: [
    { name: 'Dell Latitude 3420', price: '฿25,900', img: 'assets/image/Dell-Notebook-Latitude3420-SNS3420004-Black-1.jpg' },
    { name: 'Lenovo ThinkPad E14', price: '฿27,900', img: 'assets/image/Screenshot 2025-07-06 223151.png' },
    { name: 'HP ProBook 440', price: '฿29,500', img: 'assets/image/Screenshot 2025-07-08 165317.png' },
    { name: 'Asus ExpertBook B1', price: '฿28,900', img: 'assets/image/download0.png' },
  ],
  gaming: [
    { name: 'Asus ROG Strix G15', price: '฿39,900', img: 'assets/image/Asus-Notebook-ROG-Strix-G15-GL542LV-HN102T-Black-1.jpg' },
    { name: 'MSI GF63 Thin', price: '฿32,900', img: 'assets/image/9S7-16R612-640-01.jpg' },
    { name: 'Acer Nitro 5', price: '฿34,900', img: 'assets/image/Acer-Nitro-AN515-01.jpg' },
    { name: 'Lenovo Legion 5', price: '฿36,900', img: 'assets/image/Lenovo-Notebook-Legion-5-15ARH7H-01.jpg' },
  ]
};

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'general';
}

function showCategory(category) {
  renderProducts(category);
  document.getElementById('category-title').textContent =
    category === 'general' ? 'โน๊ตบุ๊คทั่วไป' :
    category === 'work' ? 'โน๊ตบุ๊คทำงาน' :
    'โน๊ตบุ๊คเกมมิ่ง';
}

function goToProductDetail(product, category) {
  // ส่งชื่อสินค้าและหมวดหมู่ไปหน้า detail (หรือ query string)
  window.location.href = `product-detail.html?category=${encodeURIComponent(category)}&name=${encodeURIComponent(product.name)}`;
}

function renderProducts(category) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  products[category].forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price}</div>
      <button class="details-btn">ดูรายละเอียด</button>
    `;
    card.querySelector('.details-btn').onclick = () => goToProductDetail(product, category);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const category = getCategoryFromURL();
  showCategory(category);
});
