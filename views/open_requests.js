$(document).ready(function () {
    var data = new Array();
    var restaurant = $.get("/getRestaurants");
    console.log(restaurant);
    out = $.getJSON("getAllOpenRequests", function(jd){
        for(i in jd){
            data[i] = jd[i];
            console.log(jd[i]);
            var row = $('<tr></tr>');
            var details = $('<td style="padding-left:2%;">'+data[i].OrderDetails+'</td>');
            var requester = $('<td style="padding-left:2%;">'+data[i].Requester+'</td>');
            var address = $('<td style="padding-left:2%; font-style:italic">'+data[i].DeliveryAddress+'</td>');
            var pickupButton = $('<td><button style="color: #F7A48D; background: none; margin: 2%; border: none;">Take Order</button></td>')

            $("#openRequests").append(row);
            row.append(requester);
            row.append(details);
            row.append(address);
            row.append(pickupButton);
        }
    });
    console.log(data);
    //console.log(out.responseJSON);
});

