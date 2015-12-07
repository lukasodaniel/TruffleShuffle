$(document).ready(function () {
    var data = new Array();
    var restaurants = getRestaurants();
    out = $.getJSON("getAllOpenRequests", function(jd){
        for(i in jd){
            data[i] = jd[i];
            var row = $('<tr></tr>');
            var address = $('<td style="font-style:italic">'+data[i].DeliveryAddress+'</td>');
            var restaurant = $('<td>'+restaurants[data[i]['RestaurantID']].name+'</td>');
            var details = $('<td>'+data[i].OrderDetails+'</td>');
            var requester = $('<td>'+data[i].Requester+'</td>');
            var pickupButtonEntry = $('<td></td>')
            var pickupButton = $('<td><button id='+data[i].id+' style="">Take Order</button></td>')
            var button = $('<button id='+data[i].id+'>Take Order</button>');
            var id = data[i].id;

            $("#openRequests").append(row);
            row.append(requester);
            row.append(restaurant);
            row.append(details);
            row.append(address);
            row.append(pickupButton);
            //pickupButtonEntry.append(button);


        }

        $("button").click(function() {
            var b = $(this);
            $.ajax("/pickupOrder",
                {
                data : {
                    id : $(this).attr('id')
                    },
                type : "POST",
                success: function(data) {
                    b.css('background-color','#66ff99');
                    b.text("Picked up order");
                    console.log("success");
                },
                error: function() {
                    b.css('background-color','red');
                    b.text("Error: please refresh");
                    console.log("fail");
                }
            });
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

