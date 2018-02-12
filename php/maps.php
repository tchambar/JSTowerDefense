<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Choix de la Map</title>
    <link rel="stylesheet" type="text/css" href="../css/home.css">
    <link rel="icon" href="../img/gamepad.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/home_design.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<h1>Choix de la carte</h1>
<?php
    include_once("./credentials.php");
    $dbh = new PDO('mysql:host=mysql-antgui.alwaysdata.net;dbname=antgui_sql', $user, $mdp);
    $stmt = $dbh->query('SELECT * FROM MAPS');
    while ($row = $stmt->fetch()) {
        $ico = $row['MAP_ICON'];
        echo "<img class=\"mapsicons\" src=\"../img/$ico\" alt=\"$ico\"/>";
        echo $row['MAP_MODEL'] . "\n";
        echo $row['MAP_NAME'] . "\n";
    }
    $dbh = null;
    $stmt = null;
?>
<h2>En cours de construction</h2>
<footer>
    <?php
        include_once("../html/footer.html");
    ?>
</footer>
</body>
</html>