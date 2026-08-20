document.addEventListener('DOMContentLoaded', () => {

  /* ==================================================
     1. HERO SLIDESHOW & PROGRESS BAR
  ================================================== */
  const slides = document.querySelectorAll('.intro-slide');
  const messages = document.querySelectorAll('.intro-message');
  const progressBar = document.getElementById('progressBar');
  const currentSlideNum = document.querySelector('.progress-current');
  
  let currentSlide = 0;
  const slideIntervalTime = 5000; // 5 Seconds
  let slideProgress = 0;
  let progressTimer;

  function updateSlideshow() {
    slides.forEach(slide => slide.classList.remove('active'));
    messages.forEach(msg => msg.classList.remove('active'));

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('active');
    if (messages[currentSlide]) {
      messages[currentSlide].classList.add('active');
    }

    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    resetProgressBar();
  }

  function resetProgressBar() {
    clearInterval(progressTimer);
    slideProgress = 0;
    if (progressBar) progressBar.style.width = '0%';

    progressTimer = setInterval(() => {
      slideProgress += 2;
      if (progressBar) progressBar.style.width = `${slideProgress}%`;
      if (slideProgress >= 100) {
        clearInterval(progressTimer);
        updateSlideshow();
      }
    }, slideIntervalTime / 50);
  }

  resetProgressBar();

  // Scroll smooth to gallery on button click
  const enterBtn = document.getElementById('enterGallery');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ==================================================
     2. FILTERING SYSTEM
  ================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.gallery-card');
  const featuredStory = document.querySelector('.featured-story');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      if (featuredStory) {
        const featuredCat = featuredStory.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === featuredCat) {
          featuredStory.style.display = 'grid';
        } else {
          featuredStory.style.display = 'none';
        }
      }
    });
  });

  /* ==================================================
     3. LIGHTBOX INTERACTIVITY
  ================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDescription');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const currentImgNum = document.getElementById('currentImage');

  let activeCollection = [];
  let currentLightboxIdx = 0;

  function buildCollection() {
    activeCollection = [];
    
    // Include featured story if visible
    if (featuredStory && featuredStory.style.display !== 'none') {
      activeCollection.push({
        src: featuredStory.querySelector('img').src,
        title: featuredStory.querySelector('h2').textContent,
        category: featuredStory.querySelector('.story-category').textContent,
        desc: featuredStory.querySelector('p').textContent
      });
    }

    // Include grid cards
    cards.forEach(card => {
      if (card.style.display !== 'none') {
        activeCollection.push({
          src: card.querySelector('img').src,
          title: card.querySelector('h3').textContent,
          category: card.querySelector('.gallery-tag').textContent,
          desc: card.querySelector('p').textContent
        });
      }
    });
  }

  function openLightbox(index) {
    buildCollection();
    if (activeCollection.length === 0) return;

    currentLightboxIdx = index;
    updateLightboxContent();
    lightbox.classList.add('active');
  }

  function updateLightboxContent() {
    const item = activeCollection[currentLightboxIdx];
    lightboxImg.src = item.src;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightboxDesc.textContent = item.desc;
    if (currentImgNum) {
      currentImgNum.textContent = String(currentLightboxIdx + 1).padStart(2, '0');
    }
  }

  // Event Listeners for opening Lightbox
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx + (featuredStory ? 1 : 0)));
  });

  if (featuredStory) {
    const openBtn = featuredStory.querySelector('.story-open');
    if (openBtn) {
      openBtn.addEventListener('click', () => openLightbox(0));
    }
  }

  // Lightbox Controls
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentLightboxIdx = (currentLightboxIdx + 1) % activeCollection.length;
      updateLightboxContent();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentLightboxIdx = (currentLightboxIdx - 1 + activeCollection.length) % activeCollection.length;
      updateLightboxContent();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  });
});