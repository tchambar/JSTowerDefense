$(document).ready(function() {
    var h1 = "h1";
    var but = "#game";
    $(h1).hide();
    $(h1).fadeIn(300, function () {
        $(but).show(0, function () {
            $(but).addClass("zoom");
        });
    });
    $("#faqbtn").click(function () {
            $.get("html/faq.html", function(data) {
                $("#faq").html(data);
            });
            $("#faq").fadeIn(500);
    });
});

