const boxContainer = document.querySelector('#box-container')
const slides = document.querySelectorAll('.box')
const nextBtn = document.querySelector('.right-btn');
const prevBtn = document.querySelector('.left-btn');

slides.forEach((slide , index) => {
    const width = slide.offsetWidth;
    slide.style.right = `${index * width}px`
})

// option
let counters = 0;

// EL btns
nextBtn.addEventListener('click' , () => {
    counters++;
    runSlider();
});

prevBtn.addEventListener('click' , () => {
    counters--;
    runSlider();
});

// run slider
function runSlider() {
    slides.forEach(function (slide){
        if (counters === slides.length ){
            counters = 0;
        }

        if (counters < 0){
            counters = slides.length - 1;
        }
        const width = slide.offsetWidth;

        boxContainer.style.transform = `translateX(${counters * width}px)`
    })
}