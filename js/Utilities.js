/**
 * Created by antoineguillory on 25/03/2018.
 */
function getModelRoad(){
    var txt = $("#modelmap").text();
    var posarr = [];
    var arr = txt.split("-");
    arr.forEach(function(t){
        var subarr = t.split(";");
        posarr.push(new Pos(subarr[0], subarr[1]));
    });
    return posarr;
}