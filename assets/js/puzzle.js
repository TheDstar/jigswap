const puzzleContainer = document.querySelector('.puzzle-grid');
const piecesContainer = document.querySelector('.pieces-container');
const puzzlePieces = JSON.parse(localStorage.getItem('puzzlePieces'));

// Fonction pour créer un élément de pièce de puzzle
function createPuzzlePiece(src) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('puzzle-piece-image');
    piece.appendChild(img);
    return piece;
}

// Fonction pour créer un conteneur de pièce de puzzle
function createPuzzlePieceContainer(src) {
    const container = document.createElement('div');
    container.classList.add('puzzle-piece-container');
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('puzzle-piece-image');
    container.appendChild(img);
    return container;
}

// Remplir la grille de puzzle avec des pièces vides
for (let i = 0; i < 16; i++) {
    const piece = createPuzzlePiece();
    puzzleContainer.appendChild(piece);
}

// Créer les pièces de puzzle à partir des données stockées
// Créer les pièces de puzzle à partir des données stockées
puzzlePieces.forEach(piece => {
    const pieceContainer = createPuzzlePieceContainer(piece);
    piecesContainer.appendChild(pieceContainer);

    // Ajoutez des gestionnaires d'événements pour permettre le déplacement des pièces
    pieceContainer.addEventListener('touchstart', dragStart, { passive: true });
    pieceContainer.addEventListener('touchend', dragEnd);
    pieceContainer.addEventListener('touchmove', drag, { passive: true });

    pieceContainer.addEventListener('mousedown', dragStart);
    pieceContainer.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseleave', dragEnd); // Ajoutez cet événement pour gérer le cas où la souris quitte la fenêtre
});

function dragStart(e) {
    isDragging = true;
    currentPiece = e.target.parentNode;

    if (e.type === 'mousedown') {
        currentX = e.clientX - currentPiece.offsetLeft;
        currentY = e.clientY - currentPiece.offsetTop;
    } else {
        currentX = e.touches[0].clientX - currentPiece.offsetLeft;
        currentY = e.touches[0].clientY - currentPiece.offsetTop;
    }
}

function dragEnd(e) {
    isDragging = false;
    currentPiece = null;
}

function drag(e) {
    if (isDragging && currentPiece) {
        e.preventDefault();
        currentPiece.style.position = 'absolute';

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

const timerElement = document.querySelector('.timer');
let timerInterval;
let startTime;

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