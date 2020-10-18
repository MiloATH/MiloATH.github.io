var getQuote = false;

$(document).ready(newQuote);
var tweetLink = "https://twitter.com/intent/tweet?text=";

function tweet() {
    console.log(tweetLink);
    var feats = "location=yes,height=450,width=520,scrollbars=yes,status=yes";
    var win = window.open(tweetLink, "_blank", feats);
}

function newQuote() {
    $(".loading").css({
        "visibility": "visible",
        "animation": "rot .5s linear infinite"
    });
    if (!getQuote) {
        getQuote = true;
        $.ajax({
            headers: {
                Accept: "application/json",
            },
            url: 'https://random-quote-generator.glitch.me/',
            success: function(res) {
                res = res[0];
                $(".text").slideUp(400, function() {
                    $('#quote').text(" " + res.quote);
                    $('#author').text("-" + res.author);
                    $("#quote").addClass("fa-quote-left");
                }).slideDown(400);
                tweetLink = "https://twitter.com/intent/tweet?text=" + encodeURI(res.quote + " -" + res.author);
                getQuote = false;
                $(".loading").css({
                    "visibility": "hidden",
                });
            }
        });
    }
}
