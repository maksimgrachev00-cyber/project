// Show a placeholder block for photos that haven't been added yet
document.querySelectorAll('.img-tile img').forEach((img) => {
  const showPlaceholder = () => {
    const tile = img.closest('.img-tile');
    if (!tile || tile.classList.contains('img-tile--empty')) return;
    tile.classList.add('img-tile--empty');
    const fileName = img.getAttribute('src').split('/').pop();
    const placeholder = document.createElement('div');
    placeholder.className = 'img-tile__placeholder';
    placeholder.innerHTML = `
      <span class="ph-icon">+</span>
      <span class="ph-name">${fileName}</span>
    `;
    tile.appendChild(placeholder);
  };
  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  } else {
    img.addEventListener('error', showPlaceholder);
  }
});

// Sticky header shrink on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-active');
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
  });
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  observer.observe(el);
});

// Wiggle the headphones photo in the specs section while the user
// has stopped scrolling and is reading the description
const specsSection = document.getElementById('specs');
const specsPhoto = document.querySelector('.specs-photo');
if (specsSection && specsPhoto) {
  let specsVisible = false;
  let idleTimer = null;

  const specsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        specsVisible = entry.isIntersecting;
        if (!specsVisible) {
          clearTimeout(idleTimer);
          specsPhoto.classList.remove('is-wiggling');
        }
      });
    },
    { threshold: 0.4 }
  );
  specsObserver.observe(specsSection);

  const onSpecsScroll = () => {
    clearTimeout(idleTimer);
    specsPhoto.classList.remove('is-wiggling');
    if (specsVisible) {
      idleTimer = setTimeout(() => {
        specsPhoto.classList.add('is-wiggling');
      }, 700);
    }
  };
  document.addEventListener('scroll', onSpecsScroll, { passive: true });
}
