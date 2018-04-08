/**
 * Created by antoineguillory on 25/03/2018.
 */
function getModelRoad(){
    var txt = $("#modelmap").text();
    var road = [];
    var arr = txt.split("-");
    arr.forEach(function(t){
        var subroad = t.split(";");
        road.push(new Pos(new Number(subroad[0]), new Number(subroad[1])));
    });
    return road;
}

function random_bool() {
    return (Math.random() >= 0.5);
}
