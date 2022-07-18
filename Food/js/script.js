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
          modalTriggers = document.querySelectorAll('[data-triger=modal]'),
          closeBtn = modalWindow.querySelector('.modal__close');
    let notOpened = true;
    let modalTimer;

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

    closeBtn.addEventListener('click', () => {
        closeModal(modalWindow);
    })

    modalWindow.addEventListener('click', (e) => {
        if (e.target == modalWindow) {
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
})

// menu cards

const menyArray = [
    {
        img: 'img/tabs/vegy.jpg',
        alt: 'vegy',
        title: 'Меню "Фитнес"',
        descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше 
                свежих овощей и фруктов. Продукт активных и здоровых людей. Это 
                абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        cost: 229,
    },
    {
        img: "img/tabs/elite.jpg",
        alt: 'elite',
        title: 'Меню “Премиум”',
        descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
                но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - 
                ресторанное меню без похода в ресторан!`,
        cost: 550,
    },
    {
        img: "img/tabs/post.jpg",
        alt: "post",
        title: 'Меню "Постное"', 
        descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие 
                продуктов животного происхождения, молоко из миндаля, овса, кокоса или 
                гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        cost: 430
    },
]

class MenuCard {
    constructor({img, alt, title, descr, cost}) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.cost = cost;
    }

    createCard() {
        const div = document.createElement('div');
        div.classList.add('menu__item');
        div.innerHTML = `
            <img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
            </div>
        `
        return div;  
    }
}

const menuContainer = document.querySelector('.menu__field .container');

menyArray.forEach(item => {
    menuContainer.append(new MenuCard(item).createCard());
})