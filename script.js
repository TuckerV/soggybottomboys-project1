// JAVASCRIPT
var movie;

function displayMovieInfo() {

    // movie = "Aladin"
    // $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");

        // Storing the rating data
        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        movieDiv.append(pOne);

        // Storing the release year
        var released = response.Released;

        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Released: " + released);

        // Displaying the release year
        movieDiv.append(pTwo);

        // Storing the plot
        var plot = response.Plot;

        // Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + plot);

        // Appending the plot
        movieDiv.append(pThree);

        // Retrieving the URL for the image
        var imgURL = response.Poster;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        // movieDiv.append(image);
        $(".card-image").attr("src", imgURL);

        // Putting the entire movie above the previous movies
        $(".insideCard").append(movieDiv);
    });
}


function utellyCall(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term="+ movie +"&country=uk",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "bf012d91demsh0ba427a25254120p156415jsneea3b96d469b"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        $(".title").text(response.results[0].name);
        var locationsDiv = $("<div id='locations' style ='border: solid 3px black'>")
        $(".card-content").append(locationsDiv);
        for (var i = 0; i < response.results[0].locations.length; i++){
            var newResponse = $("<p>").text(i+1 + " " + response.results[0].locations[i].display_name);
            $("#locations").append(newResponse);
        }
    });
}

function createCard(){
    var card = $("<div class='card'><div class='card-image'><figure class='image is-5by3'><img class='card-image' src='https://bulma.io/images/placeholders/500x300.png' alt='Placeholder image'></figure></div> <div class='card-content'><p class='title is-4'></p><div class='content insideCard'></div></div></div>");
    $("#resultsDiv").prepend(card);
}

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    $("#resultsDiv").removeClass("hide");
    movie = $("#titleInput").val().trim();
    createCard();
    displayMovieInfo();
    utellyCall();
});
