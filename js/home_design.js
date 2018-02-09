FORM_MODE = 1;


$( document ).ready(function() {
    var h1 = "h1";
    var but = "#joinus";
    $(h1).hide();
    $(h1).slideDown(500, function () {
        $(but).show(0, function () {
            $(but).addClass("zoom");
        });
    });
    $("#signin").click(function () {
        if(FORM_MODE!=2){
            $("#form-signin").slideDown(500);
            $("#form-signup").slideUp(500);
            FORM_MODE=2;
        }
    });
    $("#signup").click(function () {
        if(FORM_MODE!=1){
            $("#form-signup").slideDown(500);
            $("#form-signin").slideUp(500);
            FORM_MODE=1;
        }

    });
});

function displayLoginForm() {
    $("#form-signin").slideUp(500);
    //$("#form-signup").slideDown(500);
}

function displaySignupForm() {
    $("#form-signin").slideUp(500);
    //$("#form-signup").slideDown(500);
}