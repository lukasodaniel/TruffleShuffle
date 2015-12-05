$(document).ready(function () {
	loadOpenRequests();
});

var loadOpenRequests = function () {
    e.preventDefault();
    e.stopPropagation();

    var ajax_url = "getAllOpenRequests";

    // Set up settings for AJAX call
    var settings = {
	type: "get",
		data: data_pairs,
		success: ajax_success_handler,
		error: ajax_error_handler,
		cache: false
    }

    // Make AJAX call
    $.ajax(ajax_url, settings);
};

var ajax_success_handler = function(data, textStatus, jqXHR) {
    $('#returnstatus').html(jqXHR.status);
    $('#returntext').html(jqXHR.responseText);
};

var ajax_error_handler = function(jqXHR, textStatus, errorThown) {
    $('#returnstatus').html(jqXHR.status);
    $('#returntext').html(jqXHR.responseText);
}
