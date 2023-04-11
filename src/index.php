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
        <img id="logo" src="../ressources/webCal.png" alt="Logo">
        <h1>Connexion</h1>
        <?php if (isset($_GET['error']) && $_GET['error'] === 'invalid_credentials'): ?>
            <p class="error-message">Login ou mot de passe incorrect</p>
        <?php endif; ?>
        <form id="loginForm" action="php/authenticate.php" method="post">
            <input type="text" id="login" name="login" placeholder="login" required><br><br>
            <input type="password" id="password" name="password" placeholder="mot de passe" required><br><br>
            <input type="submit" value="Se connecter">
        </form>
        <p>Pas encore inscrit ? <a href="php/register.php">Créez un compte</a></p>
    </div>
</body>
</html>
