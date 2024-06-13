document.addEventListener('DOMContentLoaded', () => {
    const clickables = document.querySelectorAll('article.post[data-information] .bento');
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');

    clickables.forEach(clickable => {
        clickable.addEventListener('click', (event) => {
            const projectInfo = event.currentTarget.parentElement.getAttribute('data-information');
            overlayContent.innerHTML = projectInfo;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    overlayContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 15);
    }
};

const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
});
