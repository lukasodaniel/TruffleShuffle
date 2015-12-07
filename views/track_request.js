$(document).ready(function () {
    var data = new Array();
    var restaurants = getRestaurants();
        
    var requestTable = $("#mine");
    
    out = $.getJSON("getReqestsByRequester", function(jd){

        for(i in jd){
            var order = jd[i];
            //console.log("requester", order);

            var row = $('<tr></tr>');
            var address = $('<td style="padding-left:2%; font-style:italic">'+order.DeliveryAddress+'</td>');
            var restaurant = $('<td>'+restaurants[order['RestaurantID']].name+'</td>');
            var details = $('<td style="padding-left:2%;">'+order.OrderDetails+'</td>');
            var requester = $('<td style="padding-left:2%;">'+order.Requester+'</td>');
            var status = $('<td>'+order.OrderStatus+'</td>')
            var fulfillButton = $('<td><button id='+order.id+' style="color: #F7A48D; background: none; margin: 2%; border: none;">Order has been fulfilled?</button></td>')
            //var button = $('<button id='+data[i].id+'>Take Order</button>');
            //var id = data[i].id;
            

            requestTable.append(row);
            //row.append(requester);
            row.append(restaurant);
            row.append(details);
            row.append(address);
            row.append(status);
            row.append(fulfillButton);
        }

        $("button").click(function() {
            console.log("clicked!!");
            var b = $(this);
            var row1 = $('<tr id="row'+order.id+'"></tr>');
            $.ajax("/closeOrder",
                {
                data : {
                    id : $(this).attr('id')
                    },
                type : "POST",
                success: function(data) {
                    b.css('background-color','#66ff99');
                    b.text("Order successfully closed");
                    console.log("success");
                    row1.toggle("drop");
                },
                error: function() {
                    b.css('background-color','red');
                    b.text("Error: please refresh");
                    console.log("fail");
                }
            });
        });

        /*$("button").click(function() {
            $.ajax("");
        });*/

    });
    
    var deliverTable = $("#other");

    out = $.getJSON("getReqestsByDeliverer", function(data){
        for(i in data){
            var order = data[i];
            var phone;
                 
            var row = $('<tr id="row'+order.id+'"></tr>');
            var address = $('<td style="padding-left:2%; font-style:italic">'+order.DeliveryAddress+'</td>');
            var restaurant = $('<td>'+restaurants[order['RestaurantID']].name+'</td>');
            var details = $('<td style="padding-left:2%;">'+order.OrderDetails+'</td>');
            var phoneNumber = $('<td class="phone" id="' + order.Requester + '" style="padding-left:2%;"></td>');
            // phoneNumber.text((function(){
                
            //     return phone;
            //     //return "INSERT GETTER HERE";
            // })());

            var fulfillButton = $('<td><button id='+order.id+' style="color: #F7A48D; background: none; margin: 2%; border: none;">Order has been fulfilled?</button></td>')
            //var button = $('<button id='+data[i].id+'>Take Order</button>');
            //var id = data[i].id;
            

            deliverTable.append(row);
            //row.append(requester);
            row.append(restaurant);
            row.append(details);
            row.append(address);
            row.append(phoneNumber);
            row.append(fulfillButton);
        }

        $(".phone").each(function() {
            var current = $(this);
            $.ajax('/getUserPhone',
                {
                    data : {
                        phone : $(this).attr('id')
                    },
                    
                    type : "POST",

                    success: function(data){
                        console.log(data);
                        current.text(data);
                    }
                });});

        /*$("button").click(function() {
            $.ajax("");
        });*/

        $("button").click(function() {
            console.log("clicked!!");
            var b = $(this);
            var row2 = $('#row'+this.id);
            $.ajax("/closeOrder",
                {
                data : {
                    id : $(this).attr('id')
                    },
                type : "POST",
                success: function(data) {
                    b.css('background-color','#66ff99');
                    b.text("Order Successfully Closed");
                    console.log("success");
                    row2.toggle("drop");
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

