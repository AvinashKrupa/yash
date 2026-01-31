// ===== HAMBURGER MENU ===== 
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // Active link highlighting
  highlightActiveLink();
  window.addEventListener('hashchange', highlightActiveLink);
});

function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const sections = document.querySelectorAll('section > .container > div');
  
  cards.forEach(card => {
    observer.observe(card);
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FORM HANDLING =====
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validate form
  if (!validateForm(data)) {
    return;
  }

  // Show success message
  showSuccessMessage(form);
  form.reset();

  // Log data (in production, this would be sent to a server)
  console.log('Form submitted:', data);
}

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;

  if (!data.name || data.name.trim() === '') {
    alert('Please enter your name');
    return false;
  }

  if (!data.email || !emailRegex.test(data.email)) {
    alert('Please enter a valid email address');
    return false;
  }

  if (data.phone && !phoneRegex.test(data.phone)) {
    alert('Please enter a valid phone number');
    return false;
  }

  if (!data.message || data.message.trim() === '') {
    alert('Please enter your message');
    return false;
  }

  return true;
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background-color: #d1fae5;
    color: #065f46;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid #10b981;
    animation: fadeIn 0.3s ease-in;
  `;
  successDiv.textContent = 'Thank you! We have received your inquiry. Our team will contact you shortly.';
  
  form.parentNode.insertBefore(successDiv, form);

  setTimeout(() => {
    successDiv.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => successDiv.remove(), 300);
  }, 5000);
}

// Attach form handlers
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
});

// ===== NAVIGATION LINK HANDLERS =====
function navigateTo(page) {
  window.location.href = page;
}

// ===== UTILITY FUNCTIONS =====
function addAnimationDelay(elements, delayMs = 100) {
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * delayMs}ms`;
  });
}

// Apply staggered animation to cards on page load
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.animation = `fadeIn 0.6s ease-in forwards`;
      card.style.animationDelay = `${index * 100}ms`;
    });
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

// Fallback for older browsers
if (!Object.fromEntries) {
  Object.fromEntries = function(iterable) {
    return [...iterable].reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});
  };
}
