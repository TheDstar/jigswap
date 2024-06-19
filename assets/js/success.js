document.addEventListener('DOMContentLoaded', function() {
    const completionTimeElement = document.getElementById('completion-time');
    const elapsedTime = localStorage.getItem('timer');

    completionTimeElement.textContent = `${elapsedTime}`;
});
