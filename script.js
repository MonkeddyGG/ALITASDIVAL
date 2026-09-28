document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. Menú Móvil (Hamburger Animado)
       ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    /* =========================================
       3. Animaciones Reveal al hacer Scroll
       ========================================= */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        reveal.style.opacity = "0";
        revealObserver.observe(reveal);
    });

    /* =========================================
       4. Despliegue de Menú Oficial (Acordeón)
       ========================================= */
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const menuDropdown = document.getElementById('menu-dropdown-content');

    if (toggleMenuBtn && menuDropdown) {
        toggleMenuBtn.addEventListener('click', () => {
            menuDropdown.classList.toggle('open');

            // Animación del ícono de la flecha
            const icon = toggleMenuBtn.querySelector('i');
            if (menuDropdown.classList.contains('open')) {
                icon.style.transform = 'rotate(180deg)';
                // Scroll suave hacia la imagen para que el usuario la vea directamente
                setTimeout(() => {
                    menuDropdown.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }

    /* =========================================
       5. Lightbox para Galería
       ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            let imgSrc = '';
            if (e.currentTarget.tagName === 'IMG') {
                imgSrc = e.currentTarget.src;
            } else if (e.currentTarget.previousElementSibling && e.currentTarget.previousElementSibling.tagName === 'IMG') {
                imgSrc = e.currentTarget.previousElementSibling.src;
            }

            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        body.style.overflow = 'auto';
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* =========================================
       6. Carrusel tipo Cartas (Cada 4 segundos)
       ========================================= */
    const heroSlides = document.querySelectorAll('.carousel-slide');
    let currentHeroSlide = 0;

    if (heroSlides.length > 0) {
        setInterval(() => {
            // Remueve clase activa de la imagen actual
            heroSlides[currentHeroSlide].classList.remove('active');

            // Avanza a la siguiente imagen, volviendo a cero si llega al límite
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;

            // Aplica la clase a la nueva imagen
            heroSlides[currentHeroSlide].classList.add('active');
        }, 4000); // 4000 ms = 4 segundos (ideal para interfaces web rápidas)
    }

});