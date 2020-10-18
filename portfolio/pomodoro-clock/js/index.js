var work = true;
var started = false; //false if stopped. true if going.
var fadeTime = 100;
var workT = 1500000; //25 minutes
var breakT = 300000; //5 minutes
var oneMin = 60000; //convert milliseconds to minutes. One minute in milliseconds
//var maxTime = 100;//hmmm do I need a max?
var timeLeft = 1;
var stoppedMidway = false;
var timeinterval;
$(".plusWork").on('click', function() {
	if (!started) {
		workT += oneMin;
		$(".work").text(workT / oneMin);
		updateClock();
	}
});

$(".minusWork").on('click', function() {
	if (!started) {
		workT -= oneMin;
		workT = workT > oneMin ?  workT : oneMin;
		$(".work").text(workT / oneMin);
		updateClock();
	}
});

$(".plusBreak").on('click', function() {
	if (!started) {
		breakT += oneMin;
		$(".break").text(breakT / oneMin);
		updateClock();
	}
});

$(".minusBreak").on('click', function() {
	if (!started) {
		breakT -= oneMin;
		breakT = breakT > oneMin ? breakT : oneMin;
		$(".break").text(breakT / oneMin);
		updateClock();
	}
});
$(".clock").on('click', function() {
	if (!started) { //start timer
		started = true;
		if (stoppedMidway) {
			timer(timeLeft);
		}
		else {
			timer(work ? workT : breakT);
		}
	}
	else { //stop timer
		clearInterval(timeinterval);
		started = false;
		animationStop();
	}
});

function timer(time) {
	var end = new Date(Date.parse(new Date()) + time);
	animation();
	initializeClock('clock', end);
}

function initializeClock(c, endtime) {
	var clock = document.getElementById(c);
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateDig() {
		var t = remainingTime(endtime);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if (t.left <= 0) {
			clearInterval(timeinterval);
			work = !work;
			timer(work ? workT : breakT);
		}
		else if (!started) {
			clearInterval(timeinterval);
			timeLeft = t.left;
			stoppedMidway = true;
		}
	}
	updateDig();
	timeinterval = setInterval(updateDig, 1000);
}

function remainingTime(end) {
	var left = Date.parse(end) - Date.parse(new Date());
	var days = Math.floor(left / 86400000);
	var hrs = Math.floor((left / 3600000) % 24);
	var mins = Math.floor((left / 60000) % 60);
	var secs = Math.floor((left / 1000) % 60);
	return {
		'left': left,
		'days': days,
		'hours': hrs,
		'minutes': mins,
		'seconds': secs
	};
}

function animation() {
	var classes = 'clockAnim';
	if (work) {
		classes += ' clockWork';
	}
	else {
		classes += ' clockBreak';
	}
	$('.clock').addClass(classes);
	$('.input').fadeOut(fadeTime);
}

function animationStop() {
	$('.clock').removeClass('clockAnim clockWork clockBreak');
	$('.input').fadeIn(fadeTime);
}

function updateClock() {
	if (!started) {
		timeLeft = work ? workT : breakT;
		stoppedMidway = false;
		$('.minutes').text(timeLeft / oneMin);
		$('.seconds').text('00');
	}
}
