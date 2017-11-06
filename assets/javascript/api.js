
search_List = ["Totoro", "Howl's Moving Castle", "Laputa", "Spirited Away", "Princess Mononoke", "Kiki's Delivery Service"]

function appendButton(searching) {
    var tempButton = $("<button class='buttons'>" + searching + "</button>");
    $("#buttons-go-here").append(tempButton);
}

for (var i = 0; i < search_List.length; i++) {
    appendButton(search_List[i]);
}


$("button").on("click", function () {

    var search = "Studio Ghibli " + $(this).text();
    var apiKey = "68u77PTQxsgzgzvFmXriPw0LslrK4f5c";
    var limit = 10;


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=" + apiKey + "&limit=" + limit;

    console.log(search);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).
        done(function (response) {
            var results = response.data;
            $("#pics-go-here").empty();
            console.log(results);

            for (i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='item'>");
                var rating = $("<p>Rating: " + results[i].rating + "</p>");
                var imageGif = $("<img>");

                imageGif.attr("src", results[i].images.fixed_height_still.url);
                imageGif.attr("data-still", results[i].images.fixed_height_still.url);
                imageGif.attr("data-animate", results[i].images.fixed_height.url);
                imageGif.attr("status", "still");
                imageGif.addClass("gif");

                gifDiv.append(rating);
                gifDiv.append(imageGif);
                $("#pics-go-here").append(gifDiv);

            }
           
            $(".gif").on("click", function () {
                var thisButton = $(this);
            
                if (thisButton.attr("status") === "still") {
                    thisButton.attr("status", "animate");
                    thisButton.attr("src", thisButton.data("animate"))
                }
            
                else {
                    thisButton.attr("status", "still");
                    thisButton.attr("src", thisButton.data("still"))
                }
            })
        })
})





