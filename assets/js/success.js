document.addEventListener('DOMContentLoaded', function() {
    const completionTimeElement = document.getElementById('completion-time');
    const elapsedTime = localStorage.getItem('puzzleCompletionTime');

    if (elapsedTime) {
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        completionTimeElement.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    } else {
        completionTimeElement.textContent = 'No completion time recorded';
    }

    function padZero(value) {
        return value.toString().padStart(2, '0');
    }
});
