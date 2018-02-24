<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>JSTowerDefense</title>
        <link rel="stylesheet" type="text/css" href="../css/home.css">
        <link rel="icon" href="../img/gamepad.png">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="../js/testgame.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <?php
            if(isset($_POST["choixmap"])) {
                echo "<p>Map choisie : " . $_POST["choixmap"] . "</p>";
                echo '<img id="'.$_POST['choixmap'].'" class="mapsicons" src="../img/'.$_POST['choixmap'].'" alt="une map"/>';
                echo "<canvas id='gameCanvas' width=\"256\" height=\"256\"></canvas>";
            } else {
                echo "<p>Aucune map choisie...</p>";
            }
        ?>
        <canvas id="testcanvas" width="500" height="500" style="z-index: 1">

        </canvas>
    </body>
</html>
