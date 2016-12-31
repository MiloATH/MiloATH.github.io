var board;
var CORNERS = [
	[0, 0],
	[0, 2],
	[2, 0],
	[2, 2]
];
var SIDES = [
	[1, 0],
	[0, 1],
	[1, 2],
	[2, 1]
];
var bot = "x";
var p1 = "o";
var userTurn = false;
var round = 1;

function check(brd) { //return symbol of player that won. o.w. "".
	var filled = true;
	var winning3 = [];
	for (var i = 0; i < brd.length; i++) { //check for 3 in a row/col
		if (brd[i][0] !== "" && brd[i][0] == brd[i][1] && brd[i][1] == brd[i][2]) {
			winning3 = [
				[i, 0],
				[i, 1],
				[i, 2]
			];
			return [brd[i][0], winning3];
		}
		if (brd[0][i] !== "" && brd[0][i] == brd[1][i] && brd[1][i] == brd[2][i]) {
			winning3 = [
				[0, i],
				[1, i],
				[2, i]
			];
			return [brd[0][i], winning3];
		}
		for (var j = 0; j < brd[i].length; j++) {
			if (brd[i][j] === "") {
				filled = false;
				break;
			}
		}
	}
	if (brd[0][0] == brd[1][1] && brd[1][1] == brd[2][2] && brd[1][1] !== "") {
		winning3 = [
			[0, 0],
			[1, 1],
			[2, 2]
		];
		return [brd[1][1], winning3];
	}
	if (brd[0][2] == brd[1][1] && brd[1][1] == brd[2][0] && brd[1][1] !== "") {
		winning3 = [
			[0, 2],
			[1, 1],
			[2, 0]
		];
		return [brd[1][1], winning3];
	}
	if (filled) {
		return ["Draw", winning3];
	}
	return ["", winning3];
}

function oneAway(brd, player) { //returns an array of moves that would give the player 3 in a row.
	ret = [];
	for (var i = 0; i < brd.length; i++) {
		if ((+(brd[i][0] == player) + +(brd[i][1] == player) + +(brd[i][2] == player)) == 2 &&
			(+(brd[i][0] == "") + +(brd[i][1] == "") + +(brd[i][2] == "")) == 1) {
			ret.push(brd[i][0] != player ? [i, 0] : brd[i][1] != player ? [i, 1] : [i, 2]);
		}
		if ((+(brd[0][i] == player) + +(brd[1][i] == player) + +(brd[2][i] == player)) == 2 &&
			(+(brd[0][i] == "") + +(brd[1][i] == "") + +(brd[2][i] == "")) == 1) {
			ret.push(brd[0][i] != player ? [0, i] : brd[1][i] != player ? [1, i] : [2, i]);
		}
	}
	if ((+(brd[0][0] == player) + +(brd[1][1] == player) + +(brd[2][2] == player)) == 2 &&
		(+(brd[0][0] == "") + +(brd[1][1] == "") + +(brd[2][2] == "")) == 1) {
		ret.push(brd[0][0] != player ? [0, 0] : brd[1][1] != player ? [1, 1] : [2, 2]);
	}
	if ((+(brd[0][2] == player) + +(brd[1][1] == player) + +(brd[2][0] == player)) == 2 &&
		(+(brd[0][2] == "") + +(brd[1][1] == "") + +(brd[2][0] == "")) == 1) {
		ret.push(brd[0][2] != player ? [0, 2] : brd[1][1] != player ? [1, 1] : [2, 0]);
	}
	return ret;
}

function AIMove() {
	var nextMove = oneAway(board, bot); //Check if one away from winning
	if (nextMove.length >= 1) {
		return nextMove[0];
	}
	nextMove = oneAway(board, p1); //block enemy from winning
	if (nextMove.length >= 1) {
		return nextMove[0];
	}
	nextMove = fork(board, bot); //check two moves ahead for fork
	if (nextMove.length >= 2) {
		return nextMove[0];
	}
	nextMove = fork(board, p1); //check two moves ahead for enemy fork
	if (nextMove.length >= 2) {
		return nextMove[0];
	}
	if (board[1][1] === "") { //play center
		return [1, 1]
	}
	var retOps = [];
	if (board[0][0] == p1 && board[2][2] === "") { //play opposite corner
		retOps.push([2, 2]);
	}
	if (board[2][2] == p1 && board[0][0] === "") { //play opposite corner
		retOps.push([0, 0]);
	}
	if (board[2][0] == p1 && board[0][2] === "") { //play opposite corner
		retOps.push([0, 2]);
	}
	if (board[0][2] == p1 && board[2][0] === "") { //play opposite corner
		retOps.push([2, 0]);
	}
	if (retOps.length >= 1) {
		return retOps[Math.floor(Math.random() * retOps.length)];
	}
	for (var c in CORNERS) {
		if (board[c[0]][c[1]] === "") {
			retOps.push(c);
		}
	}
	if (retOps.length >= 1) {
		return retOps[Math.floor(Math.random() * retOps.length)];;
	}
	for (c in SIDES) {
		if (board[c[0]][c[1]] === "") {
			retOps.push(c);
		}
	}
	if (retOps.length >= 1) {
		return retOps[Math.floor(Math.random() * retOps.length)];
	}
	return [];
}

function fork(brd, player) {
	var ret = [];
	for (var i = 0; i < brd.length; i++) {
		for (var j = 0; j < brd[0].length; j++) {
			if (brd[i][j] === "") {
				brd[i][j] = player;
				ret = ret.concat(oneAway(brd, player));
				brd[i][j] = "";
			}
		}
	}
	ret = removeDupl(ret);
	return ret;
}

function removeDupl(arr) { //removes dupplicates, not space efficient, but space needed is <=9
	var added = {};
	var ret = [];
	for (var i = 0; i < arr.length; i++) {
		if (added[arr[i]] === undefined) {
			added[arr[i]] = true;
			ret.push(arr[i]);
		}
	}
	return ret;
}

function move(play, player) {
	board[play[0]][play[1]] = player;
	var id = "#" + (play[0] * 3 + play[1] + 1);
	$(id).text(player);
	$(id).addClass(player);
}

$('#X').on('click', function() {
	$('.board').hide();
	$('.board').removeClass('hide');
	$('.out').show();
	$('.start-screen').fadeOut(500, function() {
		$('.board').fadeIn(500);
	});
	bot = "O";
	p1 = "X";
	main();
});

$('#O').on('click', function() {
	$('.board').hide();
	$('.board').removeClass('hide');
	$('.out').show();
	$('.start-screen').fadeOut(500, function() {
		$('.board').fadeIn(500);
	});
	bot = "X";
	p1 = "O";
	main();
})

function main() {
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""]
	];
	for (var i = 1; i <= board.length * board[0].length; i++) {
		var item = $('#' + i);
		item.text("");
		item.removeClass("X O");
	}
	move(AIMove(), bot);
	userTurn = true;
}

function userPlay(play) {
	if (board[play[0]][play[1]] == "") {
		userTurn = false;
		move(play, p1);
		var chk = check(board);
		if (chk[0] == "") {
			var aim = AIMove();
			move(aim, bot);
			chk = check(board);
			if (chk[0] == "") {
				userTurn = true;
			}
			else {
				over(chk);
			}
		}
		else {
			over(chk)
		}
	}
	else {
		$('.notify').fadeIn(1000, function() {
			$('.notify').fadeOut(2000, function() {})
		});
	}
}

function over(gameWon) {
	var name = (gameWon[0] == bot) ? "Won by AI" : "Draw"; //I know you can't win, but just in case.
	for (var i = 0; i < gameWon[1].length; i++) {
		$('#' + (gameWon[1][i][0] * 3 + gameWon[1][i][1] + 1)).removeClass('out');
	}
	$(".scoreboard").prepend("<h2>Round " + round + ": " + name + "</h2>");
	round++;
	$('.out').fadeOut(2000, function() { //Not ideal
		for (var i = 0; i < gameWon[1].length; i++) {
			$('#' + (gameWon[1][i][0] * 3 + gameWon[1][i][1] + 1)).addClass('out').hide();
		}
		$('.start-screen').fadeIn(500, function() {
			main();
		});
	});
}

$("#1").on('click', function() {
	if (userTurn) {
		userPlay([0, 0]);
	}
});
$("#2").on('click', function() {
	if (userTurn) {
		userPlay([0, 1]);
	}
});
$("#3").on('click', function() {
	if (userTurn) {
		userPlay([0, 2]);
	}
});
$("#4").on('click', function() {
	if (userTurn) {
		userPlay([1, 0]);
	}
});
$("#5").on('click', function() {
	if (userTurn) {
		userPlay([1, 1]);
	}
});
$("#6").on('click', function() {
	if (userTurn) {
		userPlay([1, 2]);
	}
});
$("#7").on('click', function() {
	if (userTurn) {
		userPlay([2, 0]);
	}
});
$("#8").on('click', function() {
	if (userTurn) {
		userPlay([2, 1]);
	}
});
$("#9").on('click', function() {
	if (userTurn) {
		userPlay([2, 2]);
	}
});
