$(document).ready(function () {
    console.log("ready!");



    var topics = ["Dogs", "Cats", "Birds", "Lions"];

    function displaytopicInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=vqrHAjf6lQWX7tH5y6TbrT30Q6qkO7un&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            // Creating a div to hold the topic
            var topicDiv = $("<div class='topic'>");
            var results = response.data;
         
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var rating = results[i].rating;
                    var imgUrl = results[i].images.fixed_height.url
                    var image = $("<img>").attr("src", imgUrl);
                    var pRating = $("<p>").text("Rating: " + rating);
                    topicDiv.append(image);
                    topicDiv.append(pRating);
                    $("#topics-view").prepend(topicDiv);
                }
            }

        });

    }

    // Function for displaying topic data
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a topic button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "topic-btn"
    $(document).on("click", ".topic-btn", displaytopicInfo);
    renderButtons();


});