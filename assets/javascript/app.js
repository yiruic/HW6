// Initial array of artists
      var artists = ["Ed Sheeran", "Arctic Monkeys", "Sam Smith", "Sia", "Amy Winehouse"];


  // Function for displaying artist data
      function renderButtons() {

        $("#artists-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < artists.length; i++) {

          // console.log(i);

          // Then dynamicaly generating buttons for each movie in the array.
          var a = $("<button>");

          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", artists[i]);

          // Providing the button's text with a value of the movie at index i
          a.text(artists[i]);

          // Adding the button to the HTML
          $('#artists-view').append(a); 
          };
        };

        // This function handles events where one button is clicked
        $("#add-artist").on("click", function(event) {
          // event.preventDefault() prevents the form from trying to submit itself.
          // We're using a form so that the user can hit enter instead of clicking the button if they want
          event.preventDefault();

          // This line will grab the text from the input box
          var artistInput = $("#artist-input").val().trim();
          // The artist from the textbox is then added to our array

          artists.push(artistInput);
          console.log(artistInput);
          console.log(artists);

          // calling renderButtons which handles the processing of our movie array
          renderButtons();
        });



      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
    

    // Event listener for all button elements
    $(document).on("click", "button", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var artistButton = $(this).attr("data-name");

      // Storing our giphy API URL for a searched artist image
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artistButton + "&api_key=jszR2M7ux83PUtTDzZzD7ZjZOM77lLqk&limit=5";
      
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          console.log(queryURL);

          console.log(response);

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

              // Creating a div with the class "item"
              var gifDiv = $("<div>", 'item');

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
          });
        });


//pausing GIFs
$("<img>").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("src");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });