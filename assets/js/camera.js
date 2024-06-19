function divideImageIntoPuzzlePieces(imageData) {
    const puzzlePieces = [];
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
        const pieceWidth = img.width / 4;
        const pieceHeight = img.height / 4;

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const canvas = document.createElement('canvas');
                canvas.width = pieceWidth;
                canvas.height = pieceHeight;
                const context = canvas.getContext('2d');
                context.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                puzzlePieces.push(canvas.toDataURL('image/jpeg'));
            }
        }

        console.log('test réussi');

        // Enregistrez les pièces de puzzle dans le stockage local ou envoyez-les au serveur
        localStorage.setItem('puzzlePieces', JSON.stringify(puzzlePieces));

        console.log('Pièces du puzzle enregistrées :', JSON.parse(localStorage.getItem('puzzlePieces')));

        // Redirigez l'utilisateur vers la page puzzle.html
        window.location.href = 'puzzle.html';
    };
    img.onerror = () => {
        console.error('Une erreur est survenue lors du chargement de l\'image');
    };
}