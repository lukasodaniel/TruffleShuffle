$(document).ready(function () {
    var data = new Array();
    var restaurants = getRestaurants();
    out = $.getJSON("getAllOpenRequests", function(jd){
		if (jd.length > 0){
			var tableHeaders = "<thead><tr><th>Requester</th><th>Restaurant Requested</th><th>Order Details</th><th>Delivery Address</th><th>Pickup</th></tr></thead>";
			$("#openRequests").append(tableHeaders);
		}
		else{
			$("#noRequestsMessage").css("font-size","15px");
			$("#noRequestsMessage").html("There are no open requests at the moment.");
		}
        for(i in jd){
            data[i] = jd[i];
            var row = $('<tr></tr>');
            var address = $('<td style="font-style:italic">'+data[i].DeliveryAddress+'</td>');
            var restaurant = $('<td>'+restaurants[data[i]['RestaurantID']].name+'</td>');
            var details = $('<td>'+data[i].OrderDetails+'</td>');
            var requester = $('<td>'+data[i].Requester+'</td>');
            var pickupButtonEntry = $('<td></td>')
            var pickupButton = $('<td><button id='+data[i].id+' style="border:none;">Take Order</button></td>')

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
                    b.css('background-color','#B8DA9D');
					b.css('color','black');
                    b.text("Picked up order");
                    console.log("success");
                },                
                
                error: function() {
                    b.css('background-color','crimson');
					b.css('color','white');
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

