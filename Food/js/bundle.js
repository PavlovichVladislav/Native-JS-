/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


const cards = () => {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(obj => {
                menuContainer.append(createCard(obj)); 
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const forms = (modalWindow, modalTimer) => {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что - то пошло не так...',
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            debugger;
            e.preventDefault();
           
            const loadingScreen = document.createElement('img');
            loadingScreen.src = message.loading;
            loadingScreen.classList.add('loadingScreen');
            form.insertAdjacentElement('afterend', loadingScreen);
            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(response => {
                console.log(response);
                showNoticeModal(message.success);
                loadingScreen.remove();
            }).catch(() => {
                showNoticeModal(message.failure);
            }).finally(() => {
                form.reset();
                console.log('finally');
            })
        })
    }

    function showNoticeModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalWindow, modalTimer);

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
            (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalWindow);
            prevModalDialog.classList.remove('hide');
        }, 2000)
    }

    forms.forEach(item => {
        bindPostData(item);
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
let notOpened = true;

function closeModal(modal) {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.documentElement.style.overflow = 'visible';
}

function openModal(modal, modalTimerId) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
    notOpened = false;
    if (modalTimerId) {
        console.log('clear');
        clearTimeout(modalTimerId);
    } 
}

const modalWindow = (modalSelector, triggerSelector, modalTimerId) => {
    const modalWindow = document.querySelector(modalSelector),
          modalTriggers = document.querySelectorAll(triggerSelector);

    modalTriggers.forEach( triger => {
        triger.addEventListener('click', () => {
            openModal(modalWindow, modalTimerId);
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
            openModal(modalWindow, modalTimerId);
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider); 

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = (tabSelector, tabsContentSelector, tabsParentSelector, activeClass) => {
    const tabs = document.querySelectorAll(tabSelector),
          tabsCards = document.querySelectorAll(tabsContentSelector),
          tabsParrent = document.querySelector(tabsParentSelector);

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
        tabs.forEach( tab => tab.classList.remove(activeClass))
        tabs[i].classList.add(activeClass);
    }

    tabsParrent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabSelector.replace(/\./g, ""))) {
            tabs.forEach((tab, i) => {
                if (e.target == tab) {
                    selectTab(i);
                    showMenuCard(i);
                }
            })
        }
    })

    showMenuCard();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = (timerSelector, deadline) => {
    function getTimeRemainings(endTime) {
        let days, hours, minutes, seconds;
        let total = (new Date(endTime).getTime() - new Date().getTime());

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

    setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => { 
    const modal = document.querySelector('.modal');
    const modalTimer = setTimeout(() => {(0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__.openModal)(modal, modalTimer)}, 5000);
    const deadline = '2022-08-23';

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-triger=modal]', modalTimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', deadline);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(modal, modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider-wrapper',
        slideField: '.offer__slider-inner',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        current: '#current',
        total: '#total'
    });
})




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map