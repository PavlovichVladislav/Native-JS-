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
            console.log(notOpened);
            openModal(modalWindow);
        }
    })

    modalTimer = setTimeout(() => {openModal(modalWindow)}, 5000);

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

})

