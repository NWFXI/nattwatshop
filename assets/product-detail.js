// product-detail.js
// ใช้ข้อมูลจาก window.productDetailsData และรองรับการแสดงสินค้าแบบ reusable

function getProductDetail(name) {
  // รับ name เป็น argument เพื่อใช้ซ้ำได้หลายที่
  return window.productDetailsData && window.productDetailsData[name];
}

function renderProductDetail(name, box, title) {
  const detail = getProductDetail(name);
  if (!detail) {
    box.innerHTML = '<div style="color:#e74c3c;text-align:center;">ไม่พบข้อมูลสินค้า</div>';
    title.textContent = 'ไม่พบสินค้า';
    return;
  }
  title.textContent = detail.name;
  // รูปภาพหลักและแกลเลอรี (main image ใหญ่ขึ้น, auto slide)
  const imgs = detail.images || [];
  let thumbs = '';
  imgs.forEach((img, i) => {
    thumbs += `<img src="${img}" class="product-thumb${i===0?' active':''}" data-idx="${i}" alt="thumb">`;
  });

  // คะแนนรีวิว (ดาว)
  let ratingHtml = '';
  if (detail.rating) {
    const full = Math.floor(detail.rating);
    const half = detail.rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    ratingHtml = '<div class="product-rating">' +
      '<span class="rating-label">'+(detail.ratingLabel||'คะแนนรีวิว')+':</span>' +
      '<span class="stars">' +
      '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty) +
      ` <span class="rating-num">(${detail.rating.toFixed(1)})</span>` +
      '</span>' +
      (detail.reviewCount ? `<span class="review-count">${detail.reviewCount} รีวิว</span>` : '') +
      '</div>';
  }

  // ป้าย badge
  let badgeHtml = '';
  if (detail.badge) {
    badgeHtml = `<span class="product-badge">${detail.badge}</span>`;
  }

  // ตารางข้อมูลอื่นๆ (ราคา, สถานะ, การรับประกัน, คะแนน, รีวิว, ปุ่ม)
  let infoTable = `<table class="product-info-table">
    <tr><td class='info-key'>ราคา</td><td class='info-val'>${detail.price}${detail.oldPrice ? `<span class="old-price">${detail.oldPrice}</span>` : ''}</td></tr>
    ${typeof detail.stock !== 'undefined' ? `<tr><td class='info-key'>สถานะ</td><td class='info-val'><span class="product-stock ${detail.stock > 0 ? 'in-stock' : 'out-stock'}">${detail.stock > 0 ? `มีสินค้า (${detail.stock} ชิ้น)` : 'สินค้าหมด'}</span></td></tr>` : ''}
    ${detail.warranty ? `<tr><td class='info-key'>การรับประกัน</td><td class='info-val'>${detail.warranty}</td></tr>` : ''}
    ${detail.rating ? `<tr><td class='info-key'>คะแนนรีวิว</td><td class='info-val'>${ratingHtml}</td></tr>` : ''}
    <tr><td class='info-key'>สั่งซื้อ</td><td class='info-val'>${detail.stock === 0 ? `<button class="order-btn" disabled>🛒 สั่งซื้อ</button>` : `<button class="order-btn">🛒 สั่งซื้อ</button>`}</td></tr>
  </table>`;

  // จุดเด่นสินค้า
  let highlights = '';
  if (detail.highlights && detail.highlights.length) {
    highlights = '<ul class="product-highlights">' +
      detail.highlights.map(h => `<li>✔️ ${h}</li>`).join('') + '</ul>';
  }

  // ตารางสเปก
  let specTable = '';
  if (detail.spec && detail.spec.length) {
    specTable = '<table class="product-spec-table">' +
      detail.spec.map(s => {
        const parts = s.split(/[:：]/);
        if (parts.length === 2) {
          return `<tr><td class='spec-key'>${parts[0]}</td><td class='spec-val'>${parts[1]}</td></tr>`;
        } else {
          return `<tr><td colspan='2' class='spec-val'>${s}</td></tr>`;
        }
      }).join('') + '</table>';
  }

  box.innerHTML = `
    <div class="product-detail-container pro-style">
      <div class="product-gallery vertical-gallery">
        <div class="main-img-wrap">
          <img src="${imgs[0]}" class="product-main-img large-img" id="main-img" alt="${detail.name}">
          ${badgeHtml}
        </div>
        <div class="product-thumbs vertical-thumbs">${thumbs}</div>
      </div>
      <div class="product-info">
        <div class="product-info-title">${detail.name}</div>
        <div class="product-info-desc">${detail.desc || ''}</div>
        ${highlights}
        <div class="product-info-table-wrap">${infoTable}</div>
        <div class="product-spec-title">สเปกสินค้า</div>
        ${specTable}
      </div>
    </div>
  `;
  // JS เปลี่ยนรูปหลักเมื่อคลิก thumb
  const mainImg = document.getElementById('main-img');
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      mainImg.src = this.src;
      currentImgIdx = parseInt(this.getAttribute('data-idx'));
    });
  });
  // Auto slide main image
  let currentImgIdx = 0;
  if (imgs.length > 1) {
    setInterval(() => {
      currentImgIdx = (currentImgIdx + 1) % imgs.length;
      mainImg.src = imgs[currentImgIdx];
      document.querySelectorAll('.product-thumb').forEach((t, i) => t.classList.toggle('active', i === currentImgIdx));
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const box = document.getElementById('product-detail');
  const title = document.getElementById('product-title');
  renderProductDetail(name, box, title);
});
