$(document).ready(function () {
	
    var data = new Array();
    out = $.getJSON("getRestaurants", function(jd){
        for(i in jd){
            data[i] = jd[i];
            //console.log(jd[i]);
            var row = $('<tr></tr>');
            var name = $('<td>'+data[i]['name']+'</td>');
            var address = $('<td>'+data[i]['address']+'</td>');

            $("#restaurants").append(row);
            row.append(name);
            row.append(address);
        }

        /*$("button").click(function() {
            $.ajax("");
        });*/

    });
    
});


