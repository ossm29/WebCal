<!-- Page d'accueil - connexion/inscription -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/index.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier Partagé</title>
</head>
<body>
    <div class="container">
        <h1>Connexion au calendrier partagé</h1>
        <?php if (isset($_GET['error']) && $_GET['error'] === 'invalid_credentials'): ?>
            <p class="error-message">Login ou mot de passe incorrect</p>
        <?php endif; ?>
        <form id="loginForm" action="authenticate.php" method="post">
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" required><br><br>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required><br><br>
            <input type="submit" value="Se connecter">
        </form>
        <p>Pas encore inscrit ? <a href="register.php">Créez un compte</a></p>
    </div>
</body>
</html>
