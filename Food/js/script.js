window.addEventListener('DOMContentLoaded', () => {
    // tabs 

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsCards = document.querySelectorAll('.tabcontent'),
          tabsParrent = document.querySelector('.tabcontainer');

    tabsCards.forEach( card => card.classList.add('fade'));

    const showMenuCard = (i = 0) => {
        tabsCards.forEach(card => {
            card.classList.add('hide');
            card.classList.remove('show');
        })

        tabsCards[i].classList.remove('hide');
        tabsCards[i].classList.add('show');
    }

    const selectTab = (i) => {
        tabs.forEach( tab => tab.classList.remove('tabheader__item_active'))
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParrent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (e.target == tab) {
                    selectTab(i);
                    showMenuCard(i);
                }
            })
        }
    })

    showMenuCard();

    // timer 
    const deadline = new Date(2022, 6, 23, 17).getTime();

    function getTimeRemainings(endTime) {
        let days, hours, minutes, seconds;
        let total = (endTime - new Date().getTime());

        if (total <= 0) {
            days = 0,
            minutes = 0,
            seconds = 0,
            hours = 0;
        } else {
            days = Math.floor(total/86400000),
            hours = Math.floor((total/3600000)%24),
            minutes = Math.floor((total/60000)%60);
            seconds = Math.floor((total/1000)%60);
        }
              
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }
    
    function validateTime(time) {
        if (time < 10) {
            return `0${time}`
        }
        return time;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerIntrval = setInterval(updateClock, 1000);

        function updateClock() {
            const time = getTimeRemainings(endTime);

            if (time.total <= 0) {
                clearInterval(timerIntrval);
            } 

            days.textContent = validateTime(time.days);
            hours.textContent = validateTime(time.hours);
            minutes.textContent = validateTime(time.minutes);
            seconds.textContent = validateTime(time.seconds);
        }

        updateClock();

    }

    setClock('.timer', deadline);

    // modalWindow

    const modalWindow = document.querySelector('.modal'),
          modalTriggers = document.querySelectorAll('[data-triger=modal]');

    let notOpened = true,
        modalTimer;

    function closeModal(modal) {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.documentElement.style.overflow = 'visible';
    }

    function openModal(modal) {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.documentElement.style.overflow = 'hidden';
        notOpened = false;
        clearTimeout(modalTimer);
    }

    modalTriggers.forEach( triger => {
        triger.addEventListener('click', () => {
            openModal(modalWindow);
        })
    })

    modalWindow.addEventListener('click', (e) => {
        if (e.target && e.target == modalWindow) {
            closeModal(modalWindow);
        }

        if (e.target && e.target.classList.contains('modal__close')){
            closeModal(modalWindow);
        }
    })

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalWindow);
        }
    })

    document.addEventListener('scroll', () => {
        if ((document.documentElement.scrollHeight - 
            document.documentElement.clientHeight) <= 
            document.documentElement.scrollTop && notOpened) 
        {
            openModal(modalWindow);
        }
    })

    // modalTimer = setTimeout(() => {openModal(modalWindow)}, 5000);

    // menu cards

    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            
        }

        return await res.json();
    };

    function createCard({img, altimg, title, descr, price}) {
        const div = document.createElement('div');
            div.classList.add('menu__item');
            div.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `
        return div;
    }

    const menuContainer = document.querySelector('.menu__field .container');

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(obj => {
                menuContainer.append(createCard(obj)); 
            });
        });
    
    
    // Forms 

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что - то пошло не так...',
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            body:  data,
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            }
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
           
            const loadingScreen = document.createElement('img');
            loadingScreen.src = message.loading;
            loadingScreen.classList.add('loadingScreen');
            form.insertAdjacentElement('afterend', loadingScreen);
            
            const formData = new FormData(form);

            console.log(formData.entries());
            console.log(Object.fromEntries(formData.entries()));

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(response => {
                console.log(response);
                showNoticeModal(message.success);
                loadingScreen.remove();
            }).catch(() => {
                showNoticeModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        })
    }

    function showNoticeModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal(modalWindow);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content" >
                <div class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            closeModal(modalWindow);
            prevModalDialog.classList.remove('hide');
        }, 2000)
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    // slider

    const prevSlide = document.querySelector('.offer__slider-prev'),
          nextSlide = document.querySelector('.offer__slider-next'),
          currentSlide = document.querySelector('#current'),
          totalSlides = document.querySelector('#total'),
          slider = document.querySelector('.offer__slider-wrapper');
          slides = document.querySelector('.offer__slider-inner');
          slidesCount = document.querySelectorAll('.offer__slide').length;

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

    showSlide = index => {
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

        for (li of navigate.children) {
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

    // calorie calculator

    const result = document.querySelector('.calculating__result span');
    let sex, 
        height, 
        weight, 
        age, 
        ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', 1.375);
    }
    
    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector); 

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }
            if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            }
        })


    }

    function caclTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '-';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.floor((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
        } else {
            result.textContent = Math.floor((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
        }
    }

    function getStaticInformation(parentSelector, activeClass) {
        const wrapper = document.querySelector(parentSelector);

        wrapper.addEventListener('click', (e) => {
            if (e.target !== wrapper) {
                for (btn of e.target.parentElement.children) {
                    btn.classList.remove(activeClass);
                }
                e.target.classList.add(activeClass);
            }

            if(e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else if (e.target.hasAttribute('data-gender')) {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }
            caclTotal();
        })
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            caclTotal();
        })
    }

    initLocalSetting('#gender>div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose.calculating__choose_big>div', 'calculating__choose-item_active');

    getStaticInformation('.calculating__choose', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose.calculating__choose_big', 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    caclTotal();
})



