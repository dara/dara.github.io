// Preloader functionality
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    if (preloader && mainContent) {
        preloader.classList.add('fade-out');
        mainContent.classList.add('loaded');
        
        // Remove preloader from DOM after transition
        setTimeout(() => {
            preloader.remove();
        }, 800);
    }
}

function waitForAllAssets() {
    const images = document.querySelectorAll('img');
    const totalAssets = images.length;
    let loadedAssets = 0;

    if (totalAssets === 0) {
        // No images to load, hide preloader immediately
        hidePreloader();
        return;
    }

    function checkAllLoaded() {
        loadedAssets++;
        if (loadedAssets === totalAssets) {
            // Add a small delay to ensure smooth transition
            setTimeout(hidePreloader, 300);
        }
    }

    images.forEach(img => {
        if (img.complete) {
            checkAllLoaded();
        } else {
            img.addEventListener('load', checkAllLoaded);
            img.addEventListener('error', checkAllLoaded); // Handle broken images
        }
    });
}

function showWorkImages() {
    const workImages = document.querySelectorAll('.work-images');
    const workMeta = document.querySelectorAll('.work-meta');
    
    workImages.forEach(images => images.classList.add('show'));
    workMeta.forEach(meta => meta.classList.add('show'));
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
    setTimeout(showWorkImages, totalRevealableDelay);
}

function updateCopenhagenTime() {
    const copenhagenTime = document.getElementById('copenhagen-time');
    if (!copenhagenTime) return;
    
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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    waitForAllAssets();
    
    // Initialize other functionality after a short delay to ensure smooth loading
    setTimeout(() => {
        animateRevealables();
        updateCopenhagenTime();
        setInterval(updateCopenhagenTime, 1000);
    }, 500);
});
