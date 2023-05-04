<!-- fichier servant à gérer l'authentification côté serveur -->
<?php
session_start();

if (isset($_POST['login']) && isset($_POST['password'])) {
    $login = $_POST['login'];
    $password = $_POST['password'];

    $login_data = json_decode(file_get_contents('../data/login.json'), true);

    $user = null;
    foreach ($login_data['users'] as $u) {
        if ($u['login'] === $login) {
            $user = $u;
            break;
        }
    }

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user;

        // Si le statut de l'utilisateur est "responsable", rediriger vers inter.php
        if ($user['status'] === 'responsable') {
            header('Location: inter.php');
        } else {
            header('Location: ' . $user['status'] . '.php');
        }
        
        exit;
    } else {
        header('Location: ../index.php?error=invalid_credentials');
        exit;
    }
} else {
    header('Location: ../index.php');
    exit;
}
