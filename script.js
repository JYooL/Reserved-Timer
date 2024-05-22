document.addEventListener('DOMContentLoaded', () => {
    const addTimerButton = document.getElementById('add-timer');
    const timerList = document.getElementById('timer-list');
    const modal = document.getElementById('timer-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const setTimerButton = document.getElementById('set-timer');
    const activeTimersList = document.getElementById('active-timers');
    let startTime;
    let timerDuration;
    let timerName;

    // URL에서 타이머 설정을 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const startTimeParam = urlParams.get('startTime');
    if (startTimeParam) {
        createTimer(generateRandomId(), '기본 타이머', new Date(startTimeParam), 60); // Default duration 60 seconds
    }

    addTimerButton.addEventListener('click', () => {
        startTime = document.getElementById('start-time').value;
        if (startTime) {
            modal.style.display = 'flex';
        }
    });

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    setTimerButton.addEventListener('click', () => {
        timerName = document.getElementById('timer-name').value;
        timerDuration = parseInt(document.getElementById('duration').value, 10);
        if (startTime && timerDuration > 0 && timerName) {
            const timerId = generateRandomId();
            createTimer(timerId, timerName, new Date(startTime), timerDuration);
            const newUrl = `${window.location.origin}${window.location.pathname}?startTime=${encodeURIComponent(startTime)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            modal.style.display = 'none';
        }
    });

    function createTimer(id, name, startTime, duration) {
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timerElement.id = id;
        timerElement.innerHTML = `
            <div class="timer-circle">
                <div class="progress">
                    <div class="fill"></div>
                </div>
            </div>
            <div class="timer-info">
                <p>타이머 ID: ${id}</p>
                <p>이름: ${name}</p>
                <p>시작 시간: ${startTime.toLocaleString()}</p>
                <p>지속 시간: ${duration}초</p>
            </div>
        `;
        timerList.appendChild(timerElement);
        startTimer(id, name, startTime, duration);
    }

    function startTimer(id, name, startTime, duration) {
        const timerElement = document.getElementById(id);
        const fillElement = timerElement.querySelector('.fill');
        const activeTimerItem = document.createElement('li');
        activeTimerItem.id = `active-${id}`;
        activeTimerItem.innerText = `${name}: ${duration}초 남음`;
        activeTimersList.appendChild(activeTimerItem);

        const interval = setInterval(() => {
            const now = new Date();
            const elapsed = (now - startTime) / 1000;
            const remaining = Math.max(0, duration - elapsed);
            const degrees = (elapsed / duration) * 360;
            fillElement.style.transform = `rotate(${degrees}deg)`;
            activeTimerItem.innerText = `${name}: ${Math.ceil(remaining)}초 남음`;

            if (remaining <= 0) {
                clearInterval(interval);
                fillElement.style.transform = 'rotate(360deg)';
                activeTimerItem.innerText = `${name}: 완료`;
            }
        }, 1000);
    }

    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }
});
