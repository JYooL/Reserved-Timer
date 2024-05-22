document.addEventListener('DOMContentLoaded', () => {
    const addTimerButton = document.getElementById('add-timer');
    const timerList = document.getElementById('timer-list');

    // URL에서 타이머 설정을 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const startTimeParam = urlParams.get('startTime');
    if (startTimeParam) {
        createTimer(generateRandomId(), new Date(startTimeParam));
    }

    addTimerButton.addEventListener('click', () => {
        const startTime = document.getElementById('start-time').value;
        if (startTime) {
            const timerId = generateRandomId();
            createTimer(timerId, new Date(startTime));
            // URL에 타이머 설정 추가
            const newUrl = `${window.location.origin}${window.location.pathname}?startTime=${encodeURIComponent(startTime)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
    });

    function createTimer(id, startTime) {
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
                <p>시작 시간: ${startTime.toLocaleString()}</p>
            </div>
        `;
        timerList.appendChild(timerElement);
        startTimer(id, startTime);
    }

    function startTimer(id, startTime) {
        const timerElement = document.getElementById(id);
        const fillElement = timerElement.querySelector('.fill');
        const interval = setInterval(() => {
            const now = new Date();
            const elapsed = now - startTime;
            const seconds = elapsed / 1000;
            const degrees = (seconds / 60) * 360; // assuming a 60-second timer for demo
            fillElement.style.transform = `rotate(${degrees}deg)`;
            if (degrees >= 360) {
                clearInterval(interval);
                fillElement.style.transform = 'rotate(360deg)';
            }
        }, 1000);
    }

    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }
});
