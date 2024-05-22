var currentTimerIndex = 0;
var totalDuration = 0;
var durations = [80*60*1000, 100*60*1000, 30*60*1000, 30*60*1000, 70*60*1000];
var messages = ["첫 번째 타이머 시작", "두 번째 타이머 시작", "세 번째 타이머 시작", "네 번째 타이머 시작", "다섯 번째 타이머 시작"];

function startTimer(duration, message) {
    var start = Date.now();
    var timer = setInterval(function() {
        var elapsed = Date.now() - start;
        drawProgressCircle(elapsed, duration);
        if (elapsed >= duration) {
            clearInterval(timer);
            alert(message + ' 종료');
            currentTimerIndex++;
            if (currentTimerIndex < durations.length) {
                nextTimer();
            }
        }
    }, 1000);
}

function nextTimer() {
    startTimer(durations[currentTimerIndex], messages[currentTimerIndex]);
}

function setTimers() {
    var inputDate = document.getElementById('dateInput').value;
    var targetDate = new Date(inputDate + "T21:00:00");
    var currentDate = new Date();
    var millisecondsToStart = targetDate - currentDate;

    if (millisecondsToStart > 0) {
        setTimeout(nextTimer, millisecondsToStart);
        alert("타이머가 설정되었습니다.");
    } else {
        alert("유효하지 않은 날짜입니다.");
    }
}

function drawProgressCircle(elapsed, duration) {
    var canvas = document.getElementById("progressCircle");
    var context = canvas.getContext("2d");
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = canvas.width / 2 - 10;
    var progress = elapsed / duration;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, Math.PI * 1.5, Math.PI * (1.5 + 2 * progress), false);
    context.lineWidth = 10;
    context.strokeStyle = '#00ff00';
    context.stroke();
}
