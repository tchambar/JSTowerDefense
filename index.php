<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>JSTowerDefense</title>
    <link rel="stylesheet" type="text/css" href="css/home.css">
    <link rel="icon" href="img/gamepad.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/home_design.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <h1>JSTowerDefense</h1>
    <div id="game">
        <div id="playdiv" class="btn">
            <button id="playbtn" onclick="window.location.href='php/maps.php';" >Play <i class="fa fa-gamepad"></i></button>
        </div>
        <div id="faqdiv" class="btn">
            <button id="faqbtn">F.A.Q <i class="fa fa-question-circle-o"></i></button>
        </div>
    </div>
    <div id="faq">

    </div>
    <footer>
    <?php
        include("html/footer.html");
    ?>
    </footer>
</body>
</html>