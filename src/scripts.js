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
    animateRevealables();
    updateCopenhagenTime();
    setInterval(updateCopenhagenTime, 1000);
});
