// Gallery functionality
document.addEventListener("DOMContentLoaded", () => {
  const galleryCards = document.querySelectorAll(".gallery-card")
  const navBtn = document.querySelector(".gallery-nav-btn")
  const heroBgImage = document.querySelector(".hero-bg-image")
  const navToggle = document.querySelector(".nav-toggle")
  const navLinks = document.querySelector(".nav-links")
  let currentSelected = 1

  // Image sources for background rotation
  const bgImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000000371.png-9MOYbnqBlbmMQ2afrfMjsJocIIRyHv.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000000370.png-A8n8NGcdgw7S7czAh1WYNK4bD63k9K.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000000371.png-9MOYbnqBlbmMQ2afrfMjsJocIIRyHv.jpeg",
  ]

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
    navToggle.classList.toggle("active")
  })

  // Smooth scroll for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none"
        navToggle.classList.remove("active")
      }
    })
  })

  // Gallery card selection
  galleryCards.forEach((card, index) => {
    card.addEventListener("click", function () {
      // Remove selected class from all cards
      galleryCards.forEach((c) => c.classList.remove("selected"))

      // Add selected class to clicked card
      this.classList.add("selected")
      currentSelected = index

      // Change background image based on selection
      heroBgImage.style.backgroundImage = `url('${bgImages[index]}')`

      // Apply different filters based on selection
      if (index === 0) {
        heroBgImage.style.filter = "blur(1px) hue-rotate(0deg) saturate(1.1) brightness(0.8)"
      } else if (index === 1) {
        heroBgImage.style.filter = "blur(1px) hue-rotate(320deg) saturate(1.3) brightness(0.8)"
      } else {
        heroBgImage.style.filter = "blur(1px) hue-rotate(180deg) saturate(1.2) brightness(0.8)"
      }

      // Add smooth selection animation
      this.style.transform = this.classList.contains("selected") ? "scale(1.15)" : "scale(1.1)"
      setTimeout(() => {
        this.style.transform = ""
      }, 300)
    })

    // Hover effects
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("selected")) {
        this.style.transform = "scale(0.95) translateY(-5px)"
      }
    })

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("selected")) {
        this.style.transform = ""
      }
    })
  })

  // Navigation button functionality
  navBtn.addEventListener("click", function () {
    // Add click animation first
    this.style.transform = "scale(0.9)"

    setTimeout(() => {
      currentSelected = (currentSelected + 1) % galleryCards.length

      // Remove selected class from all cards
      galleryCards.forEach((c) => c.classList.remove("selected"))

      // Add selected class to next card
      galleryCards[currentSelected].classList.add("selected")

      // Change background image
      heroBgImage.style.backgroundImage = `url('${bgImages[currentSelected]}')`

      // Apply filter based on selection
      if (currentSelected === 0) {
        heroBgImage.style.filter = "blur(1px) hue-rotate(0deg) saturate(1.1) brightness(0.8)"
      } else if (currentSelected === 1) {
        heroBgImage.style.filter = "blur(1px) hue-rotate(320deg) saturate(1.3) brightness(0.8)"
      } else {
        heroBgImage.style.filter = "blur(1px) hue-rotate(180deg) saturate(1.2) brightness(0.8)"
      }

      // Reset button transform
      this.style.transform = ""
    }, 150)
  })

  // Contact button interaction
  const contactBtn = document.querySelector(".contact-btn")
  contactBtn.addEventListener("click", function () {
    // Add click effect
    this.style.transform = "scale(0.95)"
    this.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.6), 0 4px 15px rgba(0, 0, 0, 0.5)"

    setTimeout(() => {
      this.style.transform = ""
      this.style.boxShadow = ""
    }, 200)

    // Simular envío de mensaje
    setTimeout(() => {
      alert("¡Mensaje enviado! Te contactaré pronto 🚀")
    }, 300)
  })

  // Enhanced social links hover effects
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.textShadow = "0 0 10px currentColor, 0 0 20px currentColor"
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.textShadow = ""
      this.style.transform = ""
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
      navbar.style.borderBottom = "1px solid rgba(0, 255, 255, 0.3)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)"
      navbar.style.borderBottom = "1px solid rgba(0, 255, 255, 0.2)"
    }
  })

  // Enhanced glitch effect on scroll
  let ticking = false

  function updateGlitchIntensity() {
    const scrolled = window.pageYOffset
    const glitchElements = document.querySelectorAll(".glitch-text")

    glitchElements.forEach((element, index) => {
      if (scrolled > 50) {
        const intensity = Math.min(scrolled / 500, 1)
        element.style.filter = `hue-rotate(${scrolled * 0.2}deg) saturate(${1 + intensity})`
      } else {
        element.style.filter = ""
      }
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateGlitchIntensity)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick)

  // Random glitch trigger
  function randomGlitch() {
    const glitchElements = document.querySelectorAll(".glitch-text")
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)]

    if (randomElement) {
      randomElement.classList.add("intense-glitch")
      setTimeout(() => {
        randomElement.classList.remove("intense-glitch")
      }, 200)
    }
  }

  // Trigger random glitch every 12-18 seconds
  setInterval(randomGlitch, Math.random() * 6000 + 12000)

  // Intersection Observer for smooth animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all sections for scroll animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`
    observer.observe(section)
  })

  // Enhanced neon pulse effects
  const neonElements = document.querySelectorAll(".contact-btn, .gallery-nav-btn, .logo")
  neonElements.forEach((element, index) => {
    setInterval(
      () => {
        element.style.filter = "brightness(1.3) saturate(1.2)"
        setTimeout(() => {
          element.style.filter = ""
        }, 150)
      },
      Math.random() * 4000 + 3000 + index * 1000,
    )
  })

  // Image loading optimization
  const images = document.querySelectorAll(".gallery-image")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
    img.style.transition = "opacity 0.5s ease"
  })

  // Responsive menu handling
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = "flex"
      navToggle.classList.remove("active")
    } else {
      navLinks.style.display = "none"
    }
  })
})

// CSS adicional para efectos mejorados
const style = document.createElement("style")
style.textContent = `
    .intense-glitch::before {
        animation: glitch-1 0.1s infinite !important;
        opacity: 0.9 !important;
    }
    .intense-glitch::after {
        animation: glitch-2 0.1s infinite !important;
        opacity: 0.9 !important;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
        }
    }
`
document.head.appendChild(style)
