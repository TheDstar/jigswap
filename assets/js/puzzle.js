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
    let piecesPlaced = 0;

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
            if (isPieceInPlace(currentPiece)) {
                currentPiece.style.zIndex = '1';
                currentPiece.style.pointerEvents = 'none';
                piecesPlaced++; // Incrémenter piecesPlaced si la pièce est bien placée
            } else {
                currentPiece.style.zIndex = '1';
            }
            // Vérifier si toutes les pièces sont placées
            if (piecesPlaced === 16) {
                stopTimer();
                window.location.href = 'success.html';
            }
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
        }
    }

    function isPieceInPlace(piece) {
        const pieceIndex = Array.from(puzzleContainer.children).indexOf(piece);
        const expectedLeft = (pieceIndex % 4) * (puzzleContainer.offsetWidth / 4);
        const expectedTop = Math.floor(pieceIndex / 4) * (puzzleContainer.offsetHeight / 4);

        const pieceRect = piece.getBoundingClientRect();
        const containerRect = puzzleContainer.getBoundingClientRect();

        const actualLeft = pieceRect.left - containerRect.left;
        const actualTop = pieceRect.top - containerRect.top;

        return (
            Math.abs(actualLeft - expectedLeft) < 20 && // Augmenter la tolérance
            Math.abs(actualTop - expectedTop) < 20
        );
    }

    function isPuzzleCompleted() {
        const puzzlePieces = Array.from(puzzleContainer.children);
        for (let i = 0; i < puzzlePieces.length; i++) {
            if (!isPieceInPlace(puzzlePieces[i])) {
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
