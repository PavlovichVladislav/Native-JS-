import tabs from './modules/tabs';
import modalWindow from './modules/modalWindow';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modalWindow'

window.addEventListener('DOMContentLoaded', () => { 
    const modal = document.querySelector('.modal');
    const modalTimer = setTimeout(() => {openModal(modal, modalTimer)}, 5000);
    const deadline = '2022-08-23';

    tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    modalWindow('.modal', '[data-triger=modal]', modalTimer);
    timer('.timer', deadline);
    cards();
    calc();
    forms(modal, modalTimer);
    slider({
        container: '.offer__slider-wrapper',
        slideField: '.offer__slider-inner',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        current: '#current',
        total: '#total'
    });
})



