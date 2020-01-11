// JAVASCRIPT
var movie;
var ticker=0;
var deleteTicker;
function displayMovieInfo() {

    // movie = "Aladin"
    // $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
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
        // debugger
        console.log(ticker);
        $(".card-image"+ticker).attr("src", imgURL);

        // Putting the entire movie above the previous movies
        $(".insideCard"+ticker).append(movieDiv);
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
        $("#title"+ticker).text(response.results[0].name);
        var locationsDiv = $("<div id='locations' style ='border: solid 3px black'>")
        console.log(ticker);
        $(".card-content"+ticker).append(locationsDiv);
        for (var i = 0; i < response.results[0].locations.length; i++){
            var newResponse = $("<p>").text(i+1 + " " + response.results[0].locations[i].display_name);
            $("#locations").append(newResponse);
        }
    }).then(function(){
        ticker++;
    });
    
}

function deleteOldest(){
    deleteTicker = ticker - 4;
    console.log(deleteTicker);
    $("#cardNumber"+deleteTicker).remove();
}

function createCard(){
    console.log(ticker + " ticker count at card creation");
    var card = $("<div class='card column' id='cardNumber"+ticker+"'><div class='card-image'><figure class='image is-5by3'><img class='card-image"+ticker+"' src='' alt='Placeholder image'></figure></div> <div class='card-content"+ticker+"'><p class='title is-4' id='title"+ticker+"'></p><div class='content insideCard"+ticker+"'></div></div></div>");
    $("#resultsRow").prepend(card);

    deleteOldest();
}

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    $("#resultsDiv").removeClass("hide");
    movie = $("#titleInput").val().trim();
    createCard();
    displayMovieInfo();
    utellyCall();
});

$("#clearBtn").on("click", function(event){
    // event.preventDefault();
    $("#resultsRow").empty();
    $("#resultsDiv").addClass("hide");
})
