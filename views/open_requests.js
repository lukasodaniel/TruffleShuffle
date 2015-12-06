$(document).ready(function () {
    var data = new Array();
    var restaurant = $.get("/getRestaurants");
    console.log(restaurant);
    out = $.getJSON("getAllOpenRequests", function(jd){
        for(i in jd){
            data[i] = jd[i];
            console.log(jd[i]);
            var row = $('<tr></tr>');
            var address = $('<td>'+data[i].DeliveryAddress+'</td>');
            var details = $('<td>'+data[i].OrderDetails+'</td>');
            var requester = $('<td>'+data[i].Requester+'</td>');
            var pickupButton = $('<td><button>Take OrderDetails</button></td>')

            $("#openRequests").append(row);
            row.append(address);
            row.append(requester);
            row.append(details);
            row.append(pickupButton);
        }
    });
    console.log(data);
    //console.log(out.responseJSON);
});

