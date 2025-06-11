document.addEventListener('DOMContentLoaded', function() {
    const fadeElement = document.querySelector('.fade-in');
    const loadingScreen = document.getElementById('loading-screen');
    
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
    let isScrollingInitialized = false;
    
    function handleViewChange() {
        const newMobileState = isMobile();
        
        if (newMobileState !== isCurrentlyMobile) {
            isCurrentlyMobile = newMobileState;
            
            if (isCurrentlyMobile && isScrollingInitialized) {
                document.body.style.height = 'auto';
                const contentContainer = document.querySelector('.scroll-container');
                if (contentContainer) {
                    contentContainer.style.transform = 'none';
                }
                isScrollingInitialized = false;
            } else if (!isCurrentlyMobile && !isScrollingInitialized) {
                initScrolling();
                isScrollingInitialized = true;
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
    
    if (images.length === 0) {
        needsPreloading = false;
    } else {
        for (const img of images) {
            if (!isImageCached(img)) {
                needsPreloading = true;
                break;
            }
        }
    }
    
    if (!needsPreloading) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            fadeElement.classList.add('visible');
            animateRevealables();
            if (!isMobile()) {
                initScrolling();
                isScrollingInitialized = true;
            } else {
                initMobileView();
            }
        }, 100);
        return;
    }
    
    const imagePromises = Array.from(images).map(img => {
        return new Promise(resolve => {
            if (isImageCached(img)) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
            }
        });
    });

    Promise.all(imagePromises)
        .then(() => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    fadeElement.classList.add('visible');
                    animateRevealables();
                    if (!isMobile()) {
                        initScrolling();
                        isScrollingInitialized = true;
                    } else {
                        initMobileView();
                    }
                }, 300);
            }, 800);
        })
        .catch(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                fadeElement.classList.add('visible');
                animateRevealables();
                if (!isMobile()) {
                    initScrolling();
                    isScrollingInitialized = true;
                } else {
                    initMobileView();
                }
            }, 300);
        });
});

function initMobileView() {
    const contentContainer = document.querySelector('.scroll-container');
    
    if (!contentContainer) {
        console.warn('Scrolling elements not found');
        return;
    }
    
    contentContainer.style.opacity = 1;
    
    document.body.style.height = 'auto';
}

function initScrolling() {
    const contentContainer = document.querySelector('.scroll-container');
    const content = document.querySelector('.scroll-content');
    
    if (!contentContainer || !content) {
        console.warn('Scrolling elements not found');
        return;
    }
    
    let clonedContent = content.cloneNode(true);
    contentContainer.appendChild(clonedContent);

    function init() {
        document.body.style.height = `${contentContainer.getBoundingClientRect().height}px`;
    }

    window.addEventListener('resize', init);

    let target = 1;

    function scroll() {
        target = window.scrollY;

        if(target <= 0){
            target = (contentContainer.offsetHeight / 2) - 1;
            window.scrollTo(0, target);
        } else if( target >= contentContainer.offsetHeight / 2){
            target = 1;
            window.scrollTo(0, target);
        }

        target++;
        window.scrollTo(0, target);
        contentContainer.style.transform = `translateY(-${target}px)`;
        requestAnimationFrame(scroll);
    }

    init();
    contentContainer.style.opacity = 1;
    scroll();
}

function updateCopenhagenTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Copenhagen',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const timeString = now.toLocaleTimeString('en-US', options);
    const timeElement = document.getElementById('copenhagen-time');
    
    if (timeElement) {
        timeElement.textContent = `GMT+1 ${timeString}`;
    }
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

function showWorkImages() {
    const workImages = document.querySelector('.work-images');
    
    if (workImages) {
        workImages.classList.add('show');
        setTimeout(() => {
            showMetadata();
        }, 100);
    }
}

function showMetadata() {
    const workMeta = document.querySelector('.work-meta');
    
    if (workMeta) {
        workMeta.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCopenhagenTime();
    setInterval(updateCopenhagenTime, 1000);
});
