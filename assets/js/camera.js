document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('camera-video');
    if (!videoElement) {
        console.error('Video element not found');
        return;
    }

    const takePhotoButton = document.querySelector('#take-photo-button');

    if(takePhotoButton) {
        console.log('Button found');
    }

    function divideImageIntoPuzzlePieces(imageData) {
        const puzzlePieces = [];
        console.log('Image data received:', imageData);
        const img = new Image();
        console.log('Image created');
        const blob = dataURItoBlob(imageData);
        console.log('Blob created');
        const imageUrl = URL.createObjectURL(blob);
        console.log('Image URL created');
        img.src = imageUrl;
        console.log('Image URL set');
        img.onload = () => {
            const pieceWidth = img.width / 4;
            const pieceHeight = img.height / 4;
            console.log('Image loaded');

            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    const canvas = document.createElement('canvas');
                    console.log('Canvas created');
                    canvas.width = pieceWidth;
                    canvas.height = pieceHeight;
                    console.log('Canvas dimensions set');
                    const context = canvas.getContext('2d');
                    console.log('Context created');
                    context.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                    console.log('Image drawn');
                    puzzlePieces.push(canvas.toDataURL('image/jpeg'));
                    console.log('Puzzle piece added');
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
        console.log('Button clicked');
        const canvas = document.createElement('canvas');
        console.log('Canvas created');
        canvas.width = videoElement.width;
        canvas.height = videoElement.height;
        console.log('Canvas dimensions set');
        const context = canvas.getContext('2d');
        console.log('Context created');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        console.log('Image drawn');
        const imageData = canvas.toDataURL('image/jpeg');
        console.log('Image data created');

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