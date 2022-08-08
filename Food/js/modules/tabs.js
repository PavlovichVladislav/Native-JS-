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

export default tabs;
