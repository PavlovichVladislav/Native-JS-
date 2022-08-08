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

export default calc;