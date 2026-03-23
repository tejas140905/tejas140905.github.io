// Reveal on Scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
};

// Header Scroll Effect
const headerScroll = () => {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.impact-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.getAttribute('data-count') || 0;
            const increment = target / speed;

            if (count < target) {
                const nextCount = Math.ceil(count + increment);
                counter.setAttribute('data-count', nextCount);
                counter.innerText = nextCount + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    headerScroll();
    animateCounters();
    mobileNav();
    typeEffect();
    newsletterHandler();
});

// Newsletter Handler
const newsletterHandler = () => {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        const originalText = button.innerText;

        if (input.value) {
            button.innerText = 'Thanks!';
            button.style.backgroundColor = 'var(--color-secondary)';
            input.value = '';
            input.disabled = true;
            button.disabled = true;

            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = '';
                input.disabled = false;
                button.disabled = false;
            }, 3000);
        }
    });
};

// Typing Effect
const typeEffect = () => {
    const text = "Sarvatah Foundation | Affordable Learning. Real Impact.";
    const h1 = document.getElementById('typing-h1');
    let i = 0;
    let isDeleting = false;
    const typingSpeed = 70;
    const deletingSpeed = 40;
    const waitTime = 3000; // Pause after typing complete

    if (!h1) return;

    const type = () => {
        const currentText = text.substring(0, i);
        h1.textContent = currentText;

        if (!isDeleting && i < text.length) {
            i++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && i > 0) {
            i--;
            setTimeout(type, deletingSpeed);
        } else if (!isDeleting && i === text.length) {
            isDeleting = true;
            setTimeout(type, waitTime);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            setTimeout(type, 500);
        }
    };

    type();
};

// Mobile Navigation
const mobileNav = () => {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        document.body.style.overflow = nav.classList.contains('is-active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('is-active');
            nav.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });
};

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});