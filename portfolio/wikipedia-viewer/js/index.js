var link = "https://en.wikipedia.org/wiki/";
$(".query").keyup(function() {
	if ($(".query").val() != '') {
		$.ajax({
			url: '//en.wikipedia.org/w/api.php',
			data: {
				srsearch: $(".query").val(),
				action: 'query',
				list: 'search',
				format: 'json'
			},
			dataType: 'jsonp',
			success: function(response) {

				var tile = "";
				var content = response.query.search;
				for (var i = 0; i < content.length; i++) {
					tile += '<div class="tile fading" onclick="openTab(\'' + encodeURI(content[i].title) + '\');"><h4><strong>' + content[i].title + '</strong></h4>';
					tile += content[i].snippet;
					tile += '</br><a class="wikiLink" href="' + link + encodeURI(content[i].title) + '" target="_blank">See page</a></div>';
					$('.pages').html(tile);
				}
			}
		});
	}
	else {
		$('.pages').html("");
	}
});

function openTab(uri) {
	console.log("a");
	var url = link + uri;
	window.open(link + uri);
}
