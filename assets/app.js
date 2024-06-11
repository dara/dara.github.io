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
