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

export default timer;