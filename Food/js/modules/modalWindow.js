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

export default modalWindow;
export {closeModal, openModal};