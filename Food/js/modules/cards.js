import { getData } from "../services/services";

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

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(obj => {
                menuContainer.append(createCard(obj)); 
            });
        });
}

export default cards;