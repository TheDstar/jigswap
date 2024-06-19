document.addEventListener('DOMContentLoaded', function() {
    const puzzleContainer = document.querySelector('.puzzle-grid');
    const piecesContainer = document.querySelector('.pieces-container');
    const timerElement = document.querySelector('.timer');
    const puzzlePieces = JSON.parse(localStorage.getItem('puzzlePieces'));

    let isDragging = false;
    let currentPiece = null;
    let currentX;
    let currentY;
    let timerInterval;
    let startTime;

    function createPuzzlePieceContainer(src) {
        const container = document.createElement('div');
        container.classList.add('puzzle-piece-container');
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('puzzle-piece-image');
        container.appendChild(img);
        return container;
    }

    for (let i = 0; i < 16; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        puzzleContainer.appendChild(piece);
    }

    puzzlePieces.forEach(piece => {
        const pieceContainer = createPuzzlePieceContainer(piece);
        piecesContainer.appendChild(pieceContainer);

        pieceContainer.addEventListener('touchstart', dragStart, { passive: true });
        pieceContainer.addEventListener('touchend', dragEnd);
        pieceContainer.addEventListener('touchmove', drag, { passive: true });

        pieceContainer.addEventListener('mousedown', dragStart);
        pieceContainer.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseleave', dragEnd);
    });

    function dragStart(e) {
        if (e.target.tagName !== 'IMG') return; // Ensure only image elements trigger the drag

        isDragging = true;
        currentPiece = e.target.parentNode;

        if (e.type === 'mousedown') {
            currentX = e.clientX - currentPiece.offsetLeft;
            currentY = e.clientY - currentPiece.offsetTop;
        } else {
            currentX = e.touches[0].clientX - currentPiece.offsetLeft;
            currentY = e.touches[0].clientY - currentPiece.offsetTop;
        }

        currentPiece.style.position = 'absolute';
        currentPiece.style.zIndex = '1000';
    }

    function dragEnd(e) {
        isDragging = false;
        if (currentPiece) {
            currentPiece.style.zIndex = '1';
        }
        currentPiece = null;
    }

    function drag(e) {
        if (isDragging && currentPiece) {
            e.preventDefault();
            if (e.type === 'mousemove') {
                currentPiece.style.left = `${e.clientX - currentX}px`;
                currentPiece.style.top = `${e.clientY - currentY}px`;
            } else {
                currentPiece.style.left = `${e.touches[0].clientX - currentX}px`;
                currentPiece.style.top = `${e.touches[0].clientY - currentY}px`;
            }

            if (isPuzzleCompleted()) {
                stopTimer();
                window.location.href = 'success.html';
            }
        }
    }

    function isPuzzleCompleted() {
        const puzzlePieces = Array.from(puzzleContainer.children);
        const sortedPieces = puzzlePieces.slice().sort((a, b) => {
            return a.style.left.split('px')[0] - b.style.left.split('px')[0];
        });

        for (let i = 0; i < sortedPieces.length; i++) {
            const piece = sortedPieces[i];
            const expectedLeft = (i % 4) * (puzzleContainer.offsetWidth / 4);
            const expectedTop = Math.floor(i / 4) * (puzzleContainer.offsetHeight / 4);

            if (
                parseInt(piece.style.left.split('px')[0], 10) !== expectedLeft ||
                parseInt(piece.style.top.split('px')[0], 10) !== expectedTop
            ) {
                return false;
            }
        }

        return true;
    }

    function startTimer() {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        timerElement.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(value) {
        return value.toString().padStart(2, '0');
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    startTimer();
});
