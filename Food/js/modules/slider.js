const slider = ({container, slideField, slide, nextArrow, prevArrow, current, total}) => {
    const slider = document.querySelector(container),
          slides = document.querySelector(slideField),
          prevSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow),
          currentSlide = document.querySelector(current),
          totalSlides = document.querySelector(total),
          slidesCount = document.querySelectorAll(slide).length;

    let slideIndex = 1;
    currentSlide.textContent = `0${slideIndex}`;

    const navigate = document.createElement('ul');
    navigate.classList.add('offer__navigate');

    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {slideIndex = i+1; showSlide(slideIndex)});
        navigate.appendChild(dot);
    }
    
    navigate.children[0].style.opacity = 1;
    slider.appendChild(navigate);

    function showSlide(index) {
        if (index < 1) {
            slideIndex = slidesCount;
        }

        if (index > slidesCount) {
            slideIndex = 1;
        }

        slides.style.transform = `translateX(-${(slideIndex-1)*100}%)`;

        if (slideIndex < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = `${slideIndex}`;
        }

        for (let li of navigate.children) { 
            li.style.opacity = 0.6;
        }

        navigate.children[slideIndex-1].style.opacity = 1;
    }

    if (slidesCount < 10) {
        totalSlides.textContent = `0${slidesCount}`;
    } else {
        totalSlides.textContent = `${slidesCount}`;
    }

    nextSlide.addEventListener('click', () => {showSlide(++slideIndex)})
    prevSlide.addEventListener('click', () => {showSlide(--slideIndex)})
}

export default slider; 