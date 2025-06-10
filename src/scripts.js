document.addEventListener('DOMContentLoaded', function() {
    const fadeElement = document.querySelector('.fade-in');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Fix for mobile viewport height calculation, especially for Safari
    function setVHVariable() {
        // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the --vh variable on initial load
    setVHVariable();
    
    // Update the --vh variable on window resize
    window.addEventListener('resize', setVHVariable);
    
    // Update the --vh variable on orientation change
    window.addEventListener('orientationchange', setVHVariable);
    
    // Function to check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Handle responsive view changes
    let isCurrentlyMobile = isMobile();
    let isScrollingInitialized = false;
    
    function handleViewChange() {
        const newMobileState = isMobile();
        
        if (newMobileState !== isCurrentlyMobile) {
            isCurrentlyMobile = newMobileState;
            
            if (isCurrentlyMobile && isScrollingInitialized) {
                // Switch to mobile view - stop scrolling
                document.body.style.height = 'auto';
                const contentContainer = document.querySelector('.scroll-container');
                if (contentContainer) {
                    contentContainer.style.transform = 'none';
                }
                isScrollingInitialized = false;
            } else if (!isCurrentlyMobile && !isScrollingInitialized) {
                // Switch to desktop view - start scrolling
                initScrolling();
                isScrollingInitialized = true;
            }
        }
    }
    
    // Listen for resize events to handle responsive changes
    window.addEventListener('resize', handleViewChange);
    window.addEventListener('orientationchange', handleViewChange);
    
    // Function to check if an image is cached
    function isImageCached(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    // Get all images on the page
    const images = document.querySelectorAll('img');
    
    // Check if we need to preload anything
    let needsPreloading = false;
    
    // If there are no images, or all images are already cached, skip the loading screen
    if (images.length === 0) {
        needsPreloading = false;
    } else {
        // Check if any image needs loading
        for (const img of images) {
            if (!isImageCached(img)) {
                needsPreloading = true;
                break;
            }
        }
    }
    
    if (!needsPreloading) {
        // No images to load, hide preloader immediately but still show fade-in animation
        loadingScreen.classList.add('hidden');
        // Small delay to let any cached content settle, then show fade-in
        setTimeout(() => {
            fadeElement.classList.add('visible');
            // Start sentence animation immediately with fade-in
            animateRevealables();
            // Only initialize scrolling on desktop
            if (!isMobile()) {
                initScrolling();
                isScrollingInitialized = true;
            } else {
                initMobileView();
            }
        }, 100); // Very short delay just for the fade-in effect
        return;
    }
    
    // If we need to preload images, set up the image promises
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

    // Wait for all images to load
    Promise.all(imagePromises)
        .then(() => {
            // Small delay to ensure everything is ready and loading screen is visible for a minimum time
            setTimeout(() => {
                // Hide loading screen
                loadingScreen.classList.add('hidden');
                // Show content with fade-in effect
                setTimeout(() => {
                    fadeElement.classList.add('visible');
                    // Start sentence animation immediately with fade-in
                    animateRevealables();
                    // Only initialize scrolling on desktop
                    if (!isMobile()) {
                        initScrolling();
                        isScrollingInitialized = true;
                    } else {
                        initMobileView();
                    }
                }, 300); // Slight delay before showing content after loading screen fades out
            }, 800); // Minimum time to show loading screen
        })
        .catch(() => {
            // If there's any error, hide loading screen and show content anyway
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                fadeElement.classList.add('visible');
                // Start sentence animation immediately with fade-in
                animateRevealables();
                // Only initialize scrolling on desktop
                if (!isMobile()) {
                    initScrolling();
                    isScrollingInitialized = true;
                } else {
                    initMobileView();
                }
            }, 300);
        });
});

// Mobile view initialization - static content without scrolling animation
function initMobileView() {
    const contentContainer = document.querySelector('.scroll-container');
    
    if (!contentContainer) {
        console.warn('Scrolling elements not found');
        return;
    }
    
    // Make content visible without animation
    contentContainer.style.opacity = 1;
    
    // Reset body height to auto for normal scrolling
    document.body.style.height = 'auto';
}

// Original scrolling implementation
function initScrolling() {
    const contentContainer = document.querySelector('.scroll-container');
    const content = document.querySelector('.scroll-content');
    
    if (!contentContainer || !content) {
        console.warn('Scrolling elements not found');
        return;
    }
    
    let clonedContent = content.cloneNode(true);
    contentContainer.appendChild(clonedContent);

    // Set scroll dimensions
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

    // Initialize scrolling
    init();
    contentContainer.style.opacity = 1;
    scroll();
}

// Copenhagen time display function
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

// Revealable animation function
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

// Work images animation function
function showWorkImages() {
    const workImages = document.querySelector('.work-images');
    
    if (workImages) {
        workImages.classList.add('show');
        setTimeout(() => {
            showMetadata();
        }, 100);
    }
}

// Metadata animation function
function showMetadata() {
    const workMeta = document.querySelector('.work-meta');
    
    if (workMeta) {
        workMeta.classList.add('show');
    }
}

// Update time immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
    updateCopenhagenTime();
    setInterval(updateCopenhagenTime, 1000);
});
