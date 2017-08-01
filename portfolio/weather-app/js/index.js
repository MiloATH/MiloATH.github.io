console.log('top');
var lon = 1.0;
var lat = 1.0;
var cel = "0 °C";
var far = "32 °F";
var useFar = true;

function useOther() {
	useFar = !useFar;
	$('#temp').text(useFar ? far : cel);
	$('#unitChange').text(useFar ? '/°C' : '/°F');
}

console.log('statring');
$.getJSON('http://ipinfo.io', function(data) {
	console.log(data);
	var ll = data.loc.split(",");
	lat = ll[0];
	lon = ll[1];
	$('#loc').text(data.city);
});
console.log('weather');
$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, function(json) {
	console.log(json);
	cel = Math.round(json.main.temp);
	far = Math.round(cel * 9 / 5 + 32) + "°F";
	cel += "°C";
	console.log(far);
	$('#temp').text(useFar ? far : cel);
	$('#describe').text(json.weather[0].main);
	$('#icon').attr('src', json.weather[0].icon);
	console.log(json);
});