<?php
require_once __DIR__ . '/vendor/autoload.php';

// Charger les variables d'environnement depuis le fichier .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Connexion à la base de données
$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer le nom d'utilisateur envoyé par la requête AJAX
$username = $_POST["username"];

// Préparer et exécuter la requête SQL
$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Vérifier si le nom d'utilisateur existe déjà
if ($result->num_rows > 0) {
    echo "taken";
} else {
    echo "available";
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>