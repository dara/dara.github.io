document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.scroll-container');
    
    if (scrollContainer) {
        scrollContainer.style.opacity = '1';
    }
    
    function setVHVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVHVariable();
    window.addEventListener('resize', setVHVariable);
    window.addEventListener('orientationchange', setVHVariable);
    
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    let isCurrentlyMobile = isMobile();
    
    function handleViewChange() {
        const newMobileState = isMobile();
        
        if (newMobileState !== isCurrentlyMobile) {
            isCurrentlyMobile = newMobileState;
            
            if (isCurrentlyMobile) {
                document.body.style.height = 'auto';
                const contentContainer = document.querySelector('.scroll-container');
                if (contentContainer) {
                    contentContainer.style.transform = 'none';
                }
            }
        }
    }
    
    window.addEventListener('resize', handleViewChange);
    window.addEventListener('orientationchange', handleViewChange);

    // Start animations immediately since we're using lazy loading
    if (scrollContainer) {
        scrollContainer.style.opacity = '1';
    }
    animateRevealables();
    animateSections();
});

function showWorkImages() {
    const workImages = document.querySelectorAll('.work-images');
    workImages.forEach(images => {
        images.classList.add('show');
    });
    
    const workMeta = document.querySelectorAll('.work-meta');
    workMeta.forEach(meta => {
        meta.classList.add('show');
    });
}

function animateRevealables() {
    const revealables = document.querySelectorAll('.revealable');
    
    if (revealables.length === 0) return;
    
    revealables.forEach((revealable, index) => {
        setTimeout(() => {
            revealable.classList.add('animate');
        }, index * 100);
    });
    
    const totalRevealableDelay = revealables.length * 100 + 700;
    setTimeout(() => {
        showWorkImages();
    }, totalRevealableDelay);
}

function updateCopenhagenTime() {
    const copenhagenTime = document.getElementById('copenhagen-time');
    if (copenhagenTime) {
        const now = new Date();
        const options = {
            timeZone: 'Europe/Copenhagen',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const timeString = now.toLocaleTimeString('en-US', options);
        copenhagenTime.textContent = `GMT+1 ${timeString}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCopenhagenTime();
    setInterval(updateCopenhagenTime, 1000);
});

function animateSections() {
    const sections = document.querySelectorAll('.works section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load images in the section
                const images = entry.target.querySelectorAll('img');
                images.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                // Add animation class after a small delay to ensure images are loaded
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    // Calculate the base position for the first section
    const firstSection = sections[0];
    const firstSectionRect = firstSection.getBoundingClientRect();
    const baseTriggerPoint = firstSectionRect.top + window.innerHeight * 0.3;

    // Check initial visibility and animate immediately if needed
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        
        // Use the base trigger point for consistency
        const isVisible = sectionTop < baseTriggerPoint;
        
        if (isVisible) {
            // Load images immediately for visible sections
            const images = section.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            
            // Add animation class after a small delay
            setTimeout(() => {
                section.classList.add('animate');
            }, 100);
        } else {
            observer.observe(section);
        }
    });
}
