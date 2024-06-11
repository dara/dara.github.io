// document.addEventListener('scroll', function () {
//     const titles = document.querySelectorAll('.sticky-title');
//     titles.forEach((title, index) => {
//         const rect = title.getBoundingClientRect();
//         if (rect.top <= 0) {
//             title.classList.add('active');
//             if (index > 0) {
//                 titles[index - 1].classList.remove('active');
//             }
//         } else {
//             title.classList.remove('active');
//         }
//     });
// });

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
