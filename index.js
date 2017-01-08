//Anti spam
$(document).ready(function(){
	var gmail = ["m","o","c",".","l","i","a","m","g"];
	gmail.reverse();
	var arr = ["e","o","s","t","r","a","h","o","l","i","m"];
	arr.reverse();
	var atSymbol = String.fromCharCode(64);
	var m = "mail" + "to:" + arr.join("") + atSymbol + gmail.join("");
	console.log(m);
	$('#antispam').attr("href",m);
});

$('a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
		}
	}
});
