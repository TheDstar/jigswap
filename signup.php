<?php

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once __DIR__ . '/vendor/autoload.php';
    session_start();

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

    // Récupérer les données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Vérifier si le mot de passe et la confirmation sont identiques
    if ($password !== $confirm_password) {
        $_SESSION['chosen_username'] = $username;
        $_SESSION['chosen_password'] = $password;
        $_SESSION['chosen_confirm_password'] = $confirm_password;
        header('Location: signup.php?e=password');
        exit();
    } else {
        // Hacher le mot de passe
        $password = password_hash($password, PASSWORD_DEFAULT);
        
        if($_SESSION['chosen_username']) {
            unset($_SESSION['chosen_username']);
        };
        if($_SESSION['chosen_password']) {
            unset($_SESSION['chosen_password']);
        };
        if($_SESSION['chosen_confirm_password']) {
            unset($_SESSION['chosen_confirm_password']);
        };

        $_SESSION['valid_username'] = $username;
        $_SESSION['valid_password'] = $password;

        header('Location: signup2.php');
    }
};
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, viewport-fit=cover">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>Inscription - Jigswap</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/signup.css">
    <link rel="manifest" href="manifest.json">
    <link href="assets/fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="assets/fontawesome/css/brands.css" rel="stylesheet">
    <link href="assets/fontawesome/css/solid.css" rel="stylesheet">
</head>
<body>
    <div class="signup-container">
        <div class="signup-container__top">
            <h2>Inscription (1/3)</h2>
        </div>

        <div class="signup-container__body">
            <form action="signup.php" method="post">
            <?php if(isset($_GET['e']) && $_GET['e'] === "password") { session_start(); } ?>
                <div class="signup-container-form">
                    <div class="signup-form__group">
                        <label for="username">Pseudonyme</label>
                        <input type="text" name="username" id="username" <?php if(isset($_GET['e']) && $_GET['e'] === "password") { ?>value="<?= $_SESSION['chosen_username'] ?>"<?php } ?> required>
                        <p id="error-message"></p>
                    </div>
                    <div class="signup-form__group">
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" <?php if(isset($_GET['e']) && $_GET['e'] === "password") { ?>value="<?= $_SESSION['chosen_password'] ?>"<?php } ?> required>
                        <?php if(isset($_GET['e']) && $_GET['e'] === "password") { ?><p id="error-message">Les mots de passe ne correspondent pas.</p><?php } ?>
                    </div>
                    <div class="signup-form__group">
                        <label for="confirm_password">Confirme le mot de passe</label>
                        <input type="password" name="confirm_password" <?php if(isset($_GET['e']) && $_GET['e'] === "password") { ?>value="<?= $_SESSION['chosen_confirm_password'] ?>"<?php } ?> required>
                        <?php if(isset($_GET['e']) && $_GET['e'] === "password") { ?><p id="error-message">Les mots de passe ne correspondent pas.</p><?php } ?>
                    </div>
                </div>
                <button type="submit">Suivant ></button>
            </form>
        </div>
    </div>

    <script src="assets/js/signup.js"></script>
</body>
</html>