// Sélectionner l'élément input
const inputUsername = document.getElementById('username');
const errorMessage = document.getElementById('error-message');

// Ajouter un écouteur d'événement 'blur' sur l'input
inputUsername.addEventListener('blur', function() {
  // Récupérer la valeur de l'input
  const username = this.value;

  // Créer une instance de XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Ouvrir une connexion avec le serveur
  xhr.open('POST', 'check_username.php', true);

  // Définir l'en-tête pour envoyer les données au format JSON
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Fonction à exécuter lorsque le serveur répond
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Traiter la réponse du serveur
      const response = xhr.responseText;
      if (response === 'available') {
        errorMessage.textContent = '';
        inputUsername.classList.remove('error');
      } else {
        errorMessage.textContent = "Le nom d'utilisateur est déjà pris.";
        inputUsername.classList.add('error');
      }
    } else {
      errorMessage.textContent = 'Une erreur est survenue lors de la vérification du nom d\'utilisateur.';
    }
  };

  // Envoyer les données au serveur
  xhr.send('username=' + encodeURIComponent(username));
});