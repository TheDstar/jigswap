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
        const blob = dataURItoBlob(imageData);
        const imageUrl = URL.createObjectURL(blob);
        img.src = imageUrl;
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
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    takePhotoButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.width;
        canvas.height = videoElement.height;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

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