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
        piece.id = `piece-${i}`; // Ajouter un ID unique à chaque pièce
        puzzleContainer.appendChild(piece);
    }

    puzzlePieces.forEach((piece, index) => {
        const pieceContainer = createPuzzlePieceContainer(piece);
        pieceContainer.id = `piece-container-${index}`; // Ajouter un ID unique à chaque conteneur de pièce
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
            const pieceIndex = parseInt(currentPiece.id.split('-')[2]); // Récupérer l'index de la pièce depuis son ID
            const expectedSlotId = `piece-${pieceIndex}`; // ID de la case attendue pour cette pièce
            const expectedSlot = puzzleContainer.querySelector(`#${expectedSlotId}`); // Sélectionner la case attendue

            if (isElementInSlot(currentPiece, expectedSlot)) {
                currentPiece.style.zIndex = '1';
                currentPiece.style.pointerEvents = 'none';
                centerPieceInSlot(currentPiece, expectedSlot);
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

    function isElementInSlot(element, slot) {
        const elementRect = element.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();

        return (
            elementRect.left >= slotRect.left &&
            elementRect.right <= slotRect.right &&
            elementRect.top >= slotRect.top &&
            elementRect.bottom <= slotRect.bottom
        );
    }

    function centerPieceInSlot(piece, slot) {
        const slotRect = slot.getBoundingClientRect();
        const pieceRect = piece.getBoundingClientRect();

        const centerX = slotRect.left + slotRect.width / 2 - pieceRect.width / 2;
        const centerY = slotRect.top + slotRect.height / 2 - pieceRect.height / 2;

        piece.style.left = `${centerX}px`;
        piece.style.top = `${centerY}px`;
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