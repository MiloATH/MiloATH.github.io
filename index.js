$(document).ready(function(){ 
	$(".smooth").click(function(event){
		event.preventDefault();
		$("html,body").animate({scrollTop:$(this.hash).offset().top}, 600);
		$('.navbar-default a').removeClass('at');
		$(this).addClass('at');
    	});
});