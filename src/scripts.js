document.addEventListener('DOMContentLoaded', function() {
    const fadeElement = document.querySelector('.fade-in');
    const loadingScreen = document.getElementById('loading-screen');
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
    
    function isImageCached(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    const images = document.querySelectorAll('img');
    
    let needsPreloading = false;
    
    images.forEach(img => {
        if (!isImageCached(img)) {
            needsPreloading = true;
        }
    });
    
    if (needsPreloading) {
        const preloadImages = () => {
            return new Promise((resolve) => {
                let loadedImages = 0;
                const totalImages = images.length;
                
                images.forEach(img => {
                    if (!isImageCached(img)) {
                        img.onload = () => {
                            loadedImages++;
                            if (loadedImages === totalImages) {
                                resolve();
                            }
                        };
                        img.onerror = () => {
                            loadedImages++;
                            if (loadedImages === totalImages) {
                                resolve();
                            }
                        };
                    } else {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            resolve();
                        }
                    }
                });
            });
        };
        
        preloadImages().then(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            if (fadeElement) {
                fadeElement.classList.add('visible');
            }
            if (scrollContainer) {
                scrollContainer.style.opacity = '1';
            }
            animateRevealables();
        });
    } else {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        if (fadeElement) {
            fadeElement.classList.add('visible');
        }
        if (scrollContainer) {
            scrollContainer.style.opacity = '1';
        }
        animateRevealables();
    }
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
