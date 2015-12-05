$(function() {
	var audio_context = new (window.AudioContext || window.webkitAudioContext)() ;
	var source = audio_context.createBufferSource();
	var request = new XMLHttpRequest();
	
request.open('GET', 'stingtheme.mp3', true);
request.responseType = 'arraybuffer';

request.onload = function(){
	var audioData = request.response;
	audio_context.decodeAudioData(audioData, function(buffer){
		source.buffer = buffer;
		source.connect(audio_context.destination);
	}, function(e){console.log("wow error swag");});
}
	request.send();

	var songPlaying = false;
	$("#truffleShuffleBoy").click(function(){
			source.start(audio_context.currentTime);
			$(document).snow({ SnowImage: "truffleshuffle_opt.gif" });
			songPlaying = true;
	});

});