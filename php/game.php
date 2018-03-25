<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>JSTowerDefense</title>
        <link rel="stylesheet" type="text/css" href="../css/home.css">
        <link rel="icon" href="../img/gamepad.png">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="../js/Pos.js"></script>
        <script src="../js/Entity.js"></script>
        <script src="../js/Ennemy.js"></script>
        <script src="../js/Tower.js"></script>
        <script src="../js/testgame.js"></script>
        <script src="../js/Utilities.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <?php
            if(isset($_POST["choixmap"])) {
                //Affichage de la map dans le canvas
                echo "<p>Map choisie : " . $_POST["choixmap"] . "</p>";
                echo '<img id="mapimg" class="mapsicons" style="display:none;" src="../img/'.$_POST['choixmap'].'" alt="une map"/>';

                //Valeurs du modèle
                $txt = str_replace("png","txt",$_POST["choixmap"]);
                $handle = fopen("../txt/".$txt,"r");
                echo "<p id='modelmap'>";
                if ($handle) {
                    while (($buffer = fgets($handle, 4096)) !== false) {
                        echo($buffer);
                    }
                    if (!feof($handle)) {
                        echo "Erreur: fgets() a échoué\n";
                    }
                    fclose($handle);
                }
                echo "</p>";
            } else {
                echo "<p>Aucune map choisie...</p>";
            }
        ?>
        <canvas id="testcanvas" width="500" height="500" style="z-index: 1">

        </canvas>
    </body>
</html>
