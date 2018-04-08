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
    <script src="../js/Enemy.js"></script>
    <script src="../js/Tower.js"></script>
    <script src="../js/Utilities.js"></script>
    <script src="../js/Game.js"></script>
    <script src="../js/testgame.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div id="info">
<?php
if(isset($_POST["choixmap"])) {
    //Affichage de la map dans le canvas
    echo "<p>Map choisie : " . $_POST["choixmap"] . "</p>";
    echo '<img id="mapimg" class="mapsicons" style="display:none;" src="../img/'.$_POST['choixmap'].'" alt="une map"/>';

    //Valeurs du modèle
    $txt = str_replace("png","txt",$_POST["choixmap"]);
    $handle = fopen("../txt/".$txt,"r");
    echo "<p id='modelmap' style='display:none'>";
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
<p class="info">Argent : <span id="wallet"></span>€</p>
<p class="info">Vies restantes :<span id="life"></span></p>
<p class="info">Vague n°<span id="wave"></span></p>
<div id="nextwavediv" class="btn">
    <button id="nextwave">Nouvelle vague</button>
</div>
<div id="switchtow" class="btn">
    <button id="switchtype">Changer le type de tours</button>
</div>
<p id="type"></p>
<p id="pasdargent"></p>
<p id="description" class="info">Vous êtes ici pour vous défendre.
    Les méchants (en rouge) vous
    attaque par vague !
    Cliquez pour placez des tours
    (vertes et bleus comme les gentils)
    et vous défendre !
    Tuez les tous avec leurs aides
    avant de perdre toutes vos vies !</p>
</div>
<canvas id="canvas" width="500" height="500" style="z-index: 1"></canvas>
</body>
</html>
