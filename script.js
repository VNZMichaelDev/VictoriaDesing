// Variables globales
let mobileMenuOpen = false;
let particles = [];
let canvas, ctx;

// Datos de las obras de arte
const artworks = [
    {
        id: 1,
        title: "Digital Dreams",
        image: "https://picsum.photos/400/400?random=1",
        likes: 42,
        views: 128,
    },
    {
        id: 2,
        title: "Neon Nights",
        image: "https://picsum.photos/400/400?random=2",
        likes: 38,
        views: 95,
    },
    {
        id: 3,
        title: "Cyber Soul",
        image: "https://picsum.photos/400/400?random=3",
        likes: 51,
        views: 167,
    },
    {
        id: 4,
        title: "Future Vision",
        image: "https://picsum.photos/400/400?random=4",
        likes: 29,
        views: 73,
    },
];

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    populateGallery();
    setupScrollBehavior();
});

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        closeMobileMenu();
    }
}

// Toggle del menú móvil
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileNav.classList.add('active');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
}

// Cerrar menú móvil
function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenuOpen = false;
    mobileNav.classList.remove('active');
    menuIcon.className = 'fas fa-bars';
}

// Inicializar sistema de partículas
function initParticles() {
    canvas = document.getElementById('particles');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    // Redimensionar canvas cuando cambie el tamaño de ventana
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
}

// Redimensionar canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Crear partículas
function createParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 75 : 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            colorIndex: i % 3
        });
    }
}

// Animar partículas
function animateParticles() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const colors = [
        'rgba(0, 255, 150, ',
        'rgba(34, 211, 238, ',
        'rgba(16, 185, 129, '
    ];
    
    particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Efecto de parpadeo
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        // Dibujar partícula
        const color = colors[particle.colorIndex];
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${particle.opacity})`;
        ctx.fill();
        
        // Efecto glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
    
    requestAnimationFrame(animateParticles);
}

// Poblar galería con obras de arte
function populateGallery() {
    const artworkGrid = document.getElementById('artwork-grid');
    
    artworks.forEach(artwork => {
        const artworkCard = createArtworkCard(artwork);
        artworkGrid.appendChild(artworkCard);
    });
}

// Crear tarjeta de obra de arte
function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card';
    
    card.innerHTML = `
        <div class="artwork-image">
            <img src="${artwork.image}" alt="${artwork.title}" class="artwork-img" loading="lazy">
            <div class="artwork-overlay">
                <h3 class="artwork-title">${artwork.title}</h3>
                <div class="artwork-stats">
                    <div class="artwork-stat">
                        <i class="fas fa-heart"></i>
                        <span>${artwork.likes}</span>
                    </div>
                    <div class="artwork-stat">
                        <i class="fas fa-eye"></i>
                        <span>${artwork.views}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Configurar comportamiento de scroll
function setupScrollBehavior() {
    // Cerrar menú móvil al hacer scroll
    window.addEventListener('scroll', function() {
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Añadir efecto parallax sutil al hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-img');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Optimización para dispositivos táctiles
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Prevenir zoom en inputs en iOS
document.addEventListener('touchstart', function() {}, true);

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Manejo de errores para imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x400/1a1a1a/22d3ee?text=Victoria+Design';
    }
}, true);

// Función para mejorar el rendimiento en móviles
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Reducir la frecuencia de animación en móviles
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Ejecutar optimizaciones
document.addEventListener('DOMContentLoaded', function() {
    optimizeForMobile();
    setupLazyLoading();
});

// Manejo de orientación en móviles
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        resizeCanvas();
        createParticles();
    }, 100);
});

// Prevenir comportamientos no deseados en móviles
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.mobile-nav')) {
        e.preventDefault();
    }
}, { passive: false });

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustes específicos para móviles
if (isMobile()) {
    document.body.classList.add('mobile-device');
    
    // Desactivar hover effects en móviles
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .artwork-card:hover .artwork-overlay {
                opacity: 0;
            }
            .artwork-card:active .artwork-overlay {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}