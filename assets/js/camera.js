const videoElement = document.getElementById('camera-video');
const errorMessage = document.getElementById('error-message');

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