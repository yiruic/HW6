// Initial array of artists
      var artists = ["Ed Sheeran", "Coldplay", "Sam Smith", "Sia", "Amy Winehouse"];

// Function for displaying artist data
      function renderButtons() {

        $("#artists-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < artists.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          var a = $("<button>");

          // Adding a class
          a.addClass('artist');

          // Adding a data-attribute with a value of the movie at index i
          a.attr("name", artists[i]);

          // Providing the button's text with a value of the movie at index i
          a.text(artists[i]);

          // Adding the button to the HTML
          $('#artists-view').append(a); 
          }
        }
      // This function handles events where one button is clicked
      $("#add-artist").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var artist = $("#artist-input").val().trim();
        // The artist from the textbox is then added to our array
        artists.push(artist);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
    



    // Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var artist = $(this).attr("data-artist");
    

      // Storing our giphy API URL for a searched artist image
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=jszR2M7ux83PUtTDzZzD7ZjZOM77lLqk";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var artistImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              artistImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(artistImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
      });