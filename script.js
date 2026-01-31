/**
 * PIA — Personal Intelligence Assistant
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Scroll-triggered Animations
    // ========================================
    const animateElements = document.querySelectorAll(
        '.value-card, .life-card, .tool-card, .who-card, .section-header, .stack-card, .reflection-quote, .focus-banner, .connect-card, .profile-image-wrapper'
    );
    
    // Add animation class to elements
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Header Background on Scroll
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    const handleScroll = () => {
        const scrollY = window.pageYOffset;
        
        // Add/remove scrolled class for additional styling
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
    };
    
    // Throttle scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ========================================
    // Card Hover Effects Enhancement
    // ========================================
    const cards = document.querySelectorAll('.value-card, .life-card, .tool-card, .who-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transitionDelay = '0ms';
        });
    });
    
    // ========================================
    // Typewriter Effect for Hero (Optional Enhancement)
    // ========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add initial animation class
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(-10px)';
        heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 100);
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            heroDescription.style.opacity = '1';
        }, 600);
    }
    
    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) {
        heroMeta.style.opacity = '0';
        heroMeta.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            heroMeta.style.opacity = '1';
        }, 800);
    }
    
    // ========================================
    // Parallax Effect for Background
    // ========================================
    const bgGlow = document.querySelector('.bg-glow');
    
    if (bgGlow && !window.matchMedia('(pointer: coarse)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            
            bgGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }
    
    // ========================================
    // Easter Egg: Konami Code
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add a fun effect when Konami code is entered
        document.body.style.animation = 'glitch 0.3s ease';
        
        const cherry = document.createElement('div');
        cherry.textContent = '🍒 SYSTEM OVERRIDE 🍒';
        cherry.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Syne', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: #FF6B35;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
            z-index: 9999;
            pointer-events: none;
            animation: fadeInUp 0.5s ease, fadeOut 0.5s ease 2s forwards;
        `;
        
        document.body.appendChild(cherry);
        
        setTimeout(() => {
            cherry.remove();
            document.body.style.animation = '';
        }, 2500);
    }
    
    // Add fadeOut keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
        
        @keyframes glitch {
            0%, 100% { filter: none; }
            20% { filter: hue-rotate(90deg); }
            40% { filter: hue-rotate(180deg); }
            60% { filter: hue-rotate(270deg); }
            80% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Voice Player
    // ========================================
    const audio = document.getElementById('pia-voice');
    const playBtn = document.getElementById('play-btn');
    const progressFill = document.getElementById('progress-fill');
    const audioTime = document.getElementById('audio-time');
    const progressBar = document.querySelector('.progress-bar');
    
    if (audio && playBtn) {
        // Track if duration is valid
        let durationValid = false;
        
        // Format time in mm:ss
        const formatTime = (seconds) => {
            if (!isFinite(seconds) || isNaN(seconds)) return '--:--';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        // Centralized function to update duration display
        const updateDurationDisplay = () => {
            if (isFinite(audio.duration) && !isNaN(audio.duration) && audio.duration > 0) {
                durationValid = true;
                audioTime.textContent = `0:00 / ${formatTime(audio.duration)}`;
                return true;
            }
            return false;
        };
        
        // Update time display when metadata loaded
        audio.addEventListener('loadedmetadata', updateDurationDisplay);
        
        // Also try on canplaythrough for some browsers
        audio.addEventListener('canplaythrough', updateDurationDisplay);
        
        // Fallback: try on durationchange event
        audio.addEventListener('durationchange', updateDurationDisplay);
        
        // Set initial placeholder
        audioTime.textContent = '0:00 / --:--';
        
        // ROBUST DURATION LOADING STRATEGY:
        // Step 1: Check if duration is already available immediately
        if (!updateDurationDisplay()) {
            // Step 2: Force metadata reload with audio.load()
            // This triggers the browser to fetch metadata even if already cached
            audio.load();
            
            // Re-check after forcing load (some browsers may have it synchronously)
            if (!updateDurationDisplay()) {
                // Step 3: Set timeout fallback - check duration after 500ms
                setTimeout(() => {
                    if (!updateDurationDisplay()) {
                        // Step 4: Last resort - ensure preload is set to metadata and reload
                        // This handles cases where browser didn't properly preload
                        audio.preload = 'metadata';
                        audio.load();
                        
                        // Final check after forced preload reload
                        setTimeout(updateDurationDisplay, 100);
                    }
                }, 500);
            }
        }
        
        // Toggle play/pause
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.classList.add('playing');
            } else {
                audio.pause();
                playBtn.classList.remove('playing');
            }
        });
        
        // Update progress bar and time
        audio.addEventListener('timeupdate', () => {
            // Only update if duration is valid
            if (isFinite(audio.duration) && !isNaN(audio.duration)) {
                durationValid = true;
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = `${progress}%`;
                audioTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            } else {
                progressFill.style.width = '0%';
            }
        });
        
        // Reset when audio ends
        audio.addEventListener('ended', () => {
            playBtn.classList.remove('playing');
            progressFill.style.width = '0%';
            audioTime.textContent = `0:00 / ${formatTime(audio.duration)}`;
        });
        
        // Seek on progress bar click
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                if (isFinite(audio.duration) && !isNaN(audio.duration)) {
                    const rect = progressBar.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    audio.currentTime = pos * audio.duration;
                }
            });
        }
    }
    
    console.log('%c🍒 PIA initialized', 'color: #FF6B35; font-size: 14px; font-weight: bold;');
    console.log('%cPersonal Intelligence Assistant at your service', 'color: #a0a0a8; font-size: 12px;');
});
