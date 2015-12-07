$(document).ready(function () {
    var data = new Array();
    var restaurants = getRestaurants();
        
    var requestTable = $("#mine");
    
    out = $.getJSON("getReqestsByRequester", function(jd){

        for(i in jd){
            var order = jd[i];
            console.log("requester", order);

            var row = $('<tr></tr>');
            var address = $('<td style="padding-left:2%; font-style:italic">'+order.DeliveryAddress+'</td>');
            var restaurant = $('<td>'+restaurants[order['RestaurantID']].name+'</td>');
            var details = $('<td style="padding-left:2%;">'+order.OrderDetails+'</td>');
            var requester = $('<td style="padding-left:2%;">'+order.Requester+'</td>');
            var status = $('<td>'+order.OrderStatus+'</td>')
            var pickupButton = $('<td><button id='+order.id+' style="color: #F7A48D; background: none; margin: 2%; border: none;">Take Order</button></td>')
            //var button = $('<button id='+data[i].id+'>Take Order</button>');
            //var id = data[i].id;
            

            requestTable.append(row);
            //row.append(requester);
            row.append(restaurant);
            row.append(details);
            row.append(address);
            row.append(status);
        }

        /*$("button").click(function() {
            $.ajax("");
        });*/

    });
    
    var deliverTable = $("#mine");

    out = $.getJSON("getReqestsByDeliverer", function(data){
        console.log("uhhf");
        for(i in data){
            var order = data[i];
                 

        }

        /*$("button").click(function() {
            $.ajax("");
        });*/

    });

    
    
});


var getRestaurants = function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'getRestaurants',
        'dataType': "json",
        'success': function (data) {
            //console.log(data);
            json = data;
        }
    });
    var out = new Object();
    for(var i = 0; i < json.length; i++){
        var id = json[i]['id'];
        out[id] = json[i];
    }
    return out;
}

