<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            text-align: center;
        }
        h1 {
            margin-top: 20px;
        }
        .container {
            display: flex;
            height: calc(100vh - 40px);
        }
        .left, .right {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .left {
            background-color: #f0f0f0;
        }
        .left:hover {
            background-color: #e0e0e0;
        }
        .right {
            background-color: #d0d0d0;
        }
        .right:hover {
            background-color: #c0c0c0;
        }
    </style>
</head>
<body>
    <h1>Bienvenue Responsable</h1>
    <div class="container">
        <div class="left" onclick="location.href='listes.php'">
            <p>Consulter listes</p>
        </div>
        <div class="right" onclick="location.href='responsable.php'">
            <p>Consulter calendrier</p>
        </div>
    </div>
</body>
</html>
