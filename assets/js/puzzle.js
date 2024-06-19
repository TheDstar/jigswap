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
puzzlePieces.forEach(piece => {
    const pieceContainer = createPuzzlePieceContainer(piece);
    piecesContainer.appendChild(pieceContainer);

    // Ajoutez des gestionnaires d'événements pour permettre le déplacement des pièces
    pieceContainer.addEventListener('mousedown', dragStart);
    pieceContainer.addEventListener('mouseup', dragEnd);
});

let isDragging = false;
let currentPiece = null;

function dragStart(e) {
    isDragging = true;
    currentPiece = e.target.parentNode;
}

function dragEnd(e) {
    isDragging = false;
    currentPiece = null;
}

document.addEventListener('mousemove', drag);

function drag(e) {
    if (isDragging && currentPiece) {
        currentPiece.style.position = 'absolute';
        currentPiece.style.left = `${e.clientX - currentPiece.offsetWidth / 2}px`;
        currentPiece.style.top = `${e.clientY - currentPiece.offsetHeight / 2}px`;
    }
}