/**
 * Created by antoineguillory on 25/03/2018.
 */
function getModelRoad(){
    var txt = $("#modelmap").text();
    var road = [];
    var arr = txt.split("-");
    arr.forEach(function(t){
        var subroad = t.split(";");
        road.push(new Pos(subroad[0], subroad[1]));
    });
    return road;
}