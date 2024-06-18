// Function to request camera permission
function requestCameraPermission() {
    // Vérifier si le navigateur prend en charge la fonctionnalité de la caméra
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Demander l'autorisation d'accéder à la caméra
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // L'utilisateur a autorisé l'accès à la caméra, rediriger vers camera.html
                window.location.href = 'camera.html';
            })
            .catch(function(error) {
                // L'utilisateur a refusé l'accès à la caméra ou une erreur s'est produite
                document.querySelector('.errorMessage').innerHTML = error;
            });
    } else {
        // Le navigateur ne prend pas en charge la fonctionnalité de la caméra
        console.error('Le navigateur ne prend pas en charge la caméra.');
    }
}

// Add event listener to the camera permission button
document.querySelector('#camera-permission-button').addEventListener('click', requestCameraPermission);