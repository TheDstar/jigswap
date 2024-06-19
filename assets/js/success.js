document.addEventListener('DOMContentLoaded', function() {
    const completionTimeElement = document.getElementById('completion-time');
    const shareButton = document.getElementById('share-button');
    const elapsedTime = localStorage.getItem('timer');

    // Display the completion time
    completionTimeElement.innerText = elapsedTime;

    shareButton.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Jigswap',
                text: `Je me suis jigswappé.e en ${elapsedTime}. Toi aussi, jigswappe-toi sur ce lien : jigswap.netlify.app`,
                url: 'https://jigswap.netlify.app'
            }).then(() => {
                console.log('Merci pour le partage!');
            }).catch(err => {
                console.error('Erreur de partage :', err);
            });
        } else {
            alert('Le partage web n\'est pas supporté sur ce navigateur. Veuillez copier le texte manuellement.');
        }
    });
});
