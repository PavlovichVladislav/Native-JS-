import { closeModal, openModal } from "./modalWindow";
import { postData } from "../services/services";

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

            postData('http://localhost:3000/requests', json)
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
        openModal(modalWindow, modalTimer);

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
}

export default forms;