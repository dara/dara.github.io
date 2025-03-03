document.addEventListener('DOMContentLoaded', function() {
    const fadeElement = document.querySelector('.fade-in');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Function to check if an image is cached
    function isImageCached(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    // Get all images on the page
    const images = document.querySelectorAll('img');
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
                // Show content
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
