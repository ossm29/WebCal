<!-- fichier servant à gérer l'enregistrement des nouveaux utilisateurs-->
<?php
if (isset($_POST['login']) && isset($_POST['password']) && isset($_POST['status'])) {
    $login = $_POST['login'];
    $password = $_POST['password'];
    $status = $_POST['status'];

    $login_data = json_decode(file_get_contents('login.json'), true);

    foreach ($login_data['users'] as $u) {
        if ($u['login'] === $login) {
            header('Location: register.php?error=login_taken');
            exit;
        }
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $new_user = [
        'login' => $login,
        'password' => $password_hash,
        'status' => $status
    ];

    $login_data['users'][] = $new_user;

    file_put_contents('login.json', json_encode($login_data, JSON_PRETTY_PRINT));

    header('Location: index.php');
    exit;
} else {
    header('Location: register.php');
    exit;
}
