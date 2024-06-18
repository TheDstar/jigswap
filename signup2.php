<?php

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();

    // Récupérer les données du formulaire
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];

    $_SESSION['valid_first_name'] = $first_name;
    $_SESSION['valid_last_name'] = $last_name;

    header('Location: signup3.php');
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
            <h2>Inscription (2/3)</h2>
        </div>

        <div class="signup-container__body">
            <form action="signup.php" method="post">
                
                <div class="signup-container-form">
                    <div class="signup-form__group">
                        <label for="first_name">Prénom</label>
                        <input type="text" name="first_name" id="first_name" required>
                    </div>
                    <div class="signup-form__group">
                        <label for="first_name">Nom de famille</label>
                        <input type="text" name="last_name" id="last_name" required>
                    </div>
                </div>
                <button type="submit">Suivant ></button>
            </form>
        </div>
    </div>

    <script src="assets/js/signup.js"></script>
</body>
</html>