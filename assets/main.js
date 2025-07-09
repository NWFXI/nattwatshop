// Main JS for navigation and dynamic content
function navigate(page) {
  window.location.href = page;
}

function goToCategory(category) {
  window.location.href = `product.html?category=${category}`;
}

// Highlight active nav link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.style.textDecoration = 'underline';
      link.style.color = '#fbc531';
    }
  });
});

// Contact form handler (dummy)
function submitContactForm(e) {
  e.preventDefault();
  alert('ขอบคุณสำหรับการติดต่อ! เราจะตอบกลับโดยเร็วที่สุด');
  document.getElementById('contact-form').reset();
}

// Automatic banner image rotation with slide-left effect
let bannerImages = [
  'assets/image/Image1.png',
  'assets/image/Image2.png',
  'assets/image/33333.png'
];
let currentBanner = 0;
const bannerImg = document.querySelector('.banner img');
if (bannerImg) {
  bannerImg.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s';
  setInterval(() => {
    // Slide out to left
    bannerImg.style.transform = 'translateX(-100%)';
    bannerImg.style.opacity = '0';
    setTimeout(() => {
      currentBanner = (currentBanner + 1) % bannerImages.length;
      bannerImg.src = bannerImages[currentBanner];
      // Reset position to right, then slide in
      bannerImg.style.transition = 'none';
      bannerImg.style.transform = 'translateX(100%)';
      setTimeout(() => {
        bannerImg.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s';
        bannerImg.style.transform = 'translateX(0)';
        bannerImg.style.opacity = '1';
      }, 20);
    }, 600);
  }, 3000);
}

// Banner slider animation (slide-in/out)
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startAutoSlide() {
    timer = setInterval(nextSlide, 3500);
  }
  function stopAutoSlide() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
});

// Highlight active category button
function setActiveCategoryBtn() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category') || 'general';
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (cat === 'general') {
    document.querySelector('.category-btn[onclick*="general"]')?.classList.add('active');
  } else if (cat === 'work') {
    document.querySelector('.category-btn[onclick*="work"]')?.classList.add('active');
  } else if (cat === 'gaming') {
    document.querySelector('.category-btn[onclick*="gaming"]')?.classList.add('active');
  }
}
document.addEventListener('DOMContentLoaded', setActiveCategoryBtn);
