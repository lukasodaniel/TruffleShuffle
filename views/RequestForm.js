$( document ).ready(function() {

var options = $("[name='restaurantSelection']");
$.ajax("/getRestaurants", {
      success: function(data) {
         //$('#main').html($(data).find('#main *'));
         //$('#notification-bar').text('The page has been successfully loaded');

         //Item is the index in the array, also the ID of the restaurant
         $.each(data, function(item, value) {
        	options.append($("<option />").val(value.id).text(value.name));
    		});
      },
      error: function() {
         alert("Unable to obtain restaurants")
      }
   });
})