// GMHEI — small UI helpers
(function () {
    'use strict';

    // ---------- Mobile navigation ----------
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('is-open');
            toggle.classList.toggle('is-active');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.classList.remove('is-active');
            });
        });
    }

    // ---------- Reveal-on-scroll ----------
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll(
            '.feature-card, .mv-card, .value-card, .expert-card, .expert-detail-card'
        ).forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            observer.observe(el);
        });
    }

    // ---------- Gentle drift on hero mesh ----------
    const hero = document.querySelector('.hero');
    const mesh = document.querySelector('.hero-mesh');
    const lines = document.querySelector('.hero-lines svg');

    if (hero && mesh && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hero.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mesh.style.transform   = `translate(${x * -22}px, ${y * -22}px)`;
            mesh.style.transition  = 'transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            if (lines) {
                lines.style.transform  = `translate(${x * -10}px, ${y * -10}px)`;
                lines.style.transition = 'transform 0.9s cubic-bezier(0.22,1,0.36,1)';
            }
        });
        hero.addEventListener('mouseleave', function () {
            mesh.style.transform = 'translate(0, 0)';
            if (lines) lines.style.transform = 'translate(0, 0)';
        });
    }
})();
