// Script.js - Funcionalidad completa corregida

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del cambio de idioma
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsES = document.querySelectorAll('.lang-es');
    const elementsEN = document.querySelectorAll('.lang-en');
    
    // Función para cambiar idioma
    function changeLanguage(lang) {
        // Actualizar botones activos
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Mostrar/ocultar elementos según el idioma
        if (lang === 'es') {
            elementsES.forEach(el => el.classList.remove('hidden'));
            elementsEN.forEach(el => el.classList.add('hidden'));
        } else {
            elementsES.forEach(el => el.classList.add('hidden'));
            elementsEN.forEach(el => el.classList.remove('hidden'));
        }
        
        // Guardar preferencia en localStorage (si está disponible)
        try {
            localStorage.setItem('preferred-language', lang);
        } catch (e) {
            // Silenciosamente ignorar si localStorage no está disponible
        }
    }
    
    // Event listeners para los botones de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.dataset.lang;
            changeLanguage(selectedLang);
        });
    });
    
    // Cargar idioma guardado o usar español por defecto
    try {
        const savedLang = localStorage.getItem('preferred-language') || 'es';
        changeLanguage(savedLang);
    } catch (e) {
        // Si localStorage no está disponible, usar español por defecto
        changeLanguage('es');
    }
    
    // Smooth scroll para los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animación de entrada para las tarjetas de características
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a las tarjetas
    const cards = document.querySelectorAll('.feature-card, .benefit-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Funcionalidad para el botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // El enlace ya tiene el href correcto, solo agregamos analytics si es necesario
            console.log('WhatsApp button clicked');
        });
    }
    
    // Actualizar enlaces de WhatsApp según el idioma actual
    function updateWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
        
        whatsappLinks.forEach(link => {
            const baseUrl = link.href.split('?')[0];
            let message = '';
            
            if (currentLang === 'es') {
                message = 'Hola, quiero solicitar un chatbot con IA para mi empresa. ¿Podrías darme más información?';
            } else {
                message = 'Hello, I want to request an AI chatbot for my business. Could you give me more information?';
            }
            
            link.href = `${baseUrl}?text=${encodeURIComponent(message)}`;
        });
    }
    
    // Actualizar enlaces de WhatsApp cuando cambie el idioma
    const originalChangeLanguage = changeLanguage;
    changeLanguage = function(lang) {
        originalChangeLanguage(lang);
        updateWhatsAppLinks();
    };
    
    // Inicializar enlaces de WhatsApp
    updateWhatsAppLinks();
    
    // Manejar el cambio de tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalcular posiciones si es necesario
            console.log('Window resized');
        }, 250);
    });
    
    // Prevenir el comportamiento por defecto en algunos enlaces
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // Animación para los puntos de escritura en el chat preview
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.16}s`;
    });
    
    // Efecto hover mejorado para los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('Script cargado correctamente - Todas las funcionalidades inicializadas');
});