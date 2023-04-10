<!-- fichier qui gère la déconnexion de l'utilisateur -->
<?php
session_start();
session_destroy();
header('Location: ../index.php');
exit;
?>
