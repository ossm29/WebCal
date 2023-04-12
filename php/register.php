<!-- Page du formulaire d'inscription -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/index.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription au calendrier partagé</title>
</head>
<body>
    <div class="container">
        <h1>Inscription</h1>
        <?php if (isset($_GET['error']) && $_GET['error'] === 'login_taken'): ?>
            <p class="error-message">Le login est déjà utilisé, veuillez en choisir un autre</p>
        <?php endif; ?>
        <form id="registerForm" action="register_user.php" method="post">
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" required><br><br>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required><br><br>
            <label for="status">Statut:</label>
            <select id="status" name="status" required>
                <option value="etudiant">Étudiant</option>
                <option value="prof">Professeur</option>
                <option value="admin">Administrateur</option>
            </select><br><br>
            <input type="submit" value="S'inscrire">
        </form>
    </div>
</body>
</html>
