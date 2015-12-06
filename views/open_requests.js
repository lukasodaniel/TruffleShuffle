$(document).ready(function () {
    var data = new Array();
    var restaurants = getRestaurants();
    out = $.getJSON("getAllOpenRequests", function(jd){
        for(i in jd){
            data[i] = jd[i];
            //console.log(jd[i]);
            var row = $('<tr></tr>');
            var address = $('<td>'+data[i].DeliveryAddress+'</td>');
            //console.log(restaurants[data[i]['RestaurantID']])
            var restaurant = $('<td>'+restaurants[data[i]['RestaurantID']].name+'</td>');
            var details = $('<td>'+data[i].OrderDetails+'</td>');
            var requester = $('<td>'+data[i].Requester+'</td>');
            var pickupButtonEntry = $('<td></td>')
            var button = $('<button id='+data[i].id+'>Take Order</button>');
            console.log(data[i].id);
            var id = data[i].id;

            $("#openRequests").append(row);
            row.append(address);
            row.append(restaurant);
            row.append(requester);
            row.append(details);
            row.append(pickupButtonEntry);
            pickupButtonEntry.append(button);


        }

        $("button").click(function() {
            $.ajax("");
        });

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

var takeOrder = function(orderId){
    console.log(orderId)
}

