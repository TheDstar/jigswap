document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('camera-video');
    if (!videoElement) {
        console.error('Video element not found');
        return;
    }

    const takePhotoButton = document.querySelector('#take-photo-button');

    function divideImageIntoPuzzlePieces(imageData) {
        const puzzlePieces = [];
        const img = new Image();
        img.onload = () => {
            const pieceWidth = img.width / 4;
            const pieceHeight = img.height / 4;
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = pieceWidth;
            tempCanvas.height = pieceHeight;
            const tempContext = tempCanvas.getContext('2d');

            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    tempContext.clearRect(0, 0, pieceWidth, pieceHeight);
                    tempContext.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                    puzzlePieces.push(tempCanvas.toDataURL('image/jpeg'));
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

        img.src = imageData; // Utilisez directement les données de l'image ici
    }

    takePhotoButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth; // Utilisez videoWidth au lieu de width
        canvas.height = videoElement.videoHeight; // Utilisez videoHeight au lieu de height
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        console.log(imageData); // Vérifiez les données imageData

        // Divisez l'image en plusieurs pièces de puzzle
        divideImageIntoPuzzlePieces(imageData);
    });

    // Check if the browser supports media devices
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Get the user's media stream with video enabled
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then((stream) => {
                // Set the video element's source to the user's media stream
                videoElement.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing media devices.', error);
            });
    } else {
        console.error('getUserMedia is not supported in this browser.');
    }
});
