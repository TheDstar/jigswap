

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
                <div class="signup-container-form">
                    <div class="signup-form__group">
                        <label for="username">Pseudonyme</label>
                        <input type="text" name="username" id="username" required>
                        <p id="error-message"></p>
                    </div>
                    <div class="signup-form__group">
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" required>
                    </div>
                    <div class="signup-form__group">
                        <label for="confirm_password">Confirme le mot de passe</label>
                        <input type="password" name="confirm_password" required>
                    </div>
                </div>
                <button type="submit">Suivant ></button>
            </form>
        </div>
    </div>

    <script src="assets/js/signup.js"></script>
</body>
</html>