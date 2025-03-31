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
        // Hide loading screen immediately and show content
        loadingScreen.classList.add('hidden');
        fadeElement.classList.add('visible');
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
                }, 300); // Slight delay before showing content after loading screen fades out
            }, 800); // Minimum time to show loading screen
        })
        .catch(() => {
            // If there's any error, hide loading screen and show content anyway
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                fadeElement.classList.add('visible');
            }, 300);
        });
});
