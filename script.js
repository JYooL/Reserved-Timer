document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const startTimeParam = urlParams.get('startTime');
    const durationParam = urlParams.get('duration');
    const timerNameParam = urlParams.get('timerName');

    if (startTimeParam && durationParam && timerNameParam) {
        const startTime = new Date(startTimeParam);
        const duration = parseInt(durationParam);
        const timerName = timerNameParam;

        createTimer(startTime, duration, timerName);
    }

    function createTimer(startTime, duration, timerName) {
        const timerList = document.getElementById('timer-list');
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timerElement.innerHTML = `
            <div class="timer-info">
                <p>Name: ${timerName}</p>
                <p>Start Time: ${startTime.toLocaleString()}</p>
                <p>Duration: ${formatDuration(duration)}</p>
            </div>
        `;
        timerList.appendChild(timerElement);
    }

    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }

    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }
});
