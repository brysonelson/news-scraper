// Grab the articles as a json
$(document).ready(function() {
$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    var posted = data[i].time.split("·")
    console.log(posted);
    // Display the apropos information on the page
    var articleDiv = $("<div class='article row'>").appendTo($("#articles"));
      articleDiv.append($("<div class='card hoverable'><div class='card-content'><span class='z-depth-2 card-title activator grey-text text-darken-4'>" 
      + "<a href='" + data[i].link + "' target='_blank'>" 
      + data[i].title 
      + "</a><i class='material-icons right card-head-icon'>more_vert</i></span><p><a href='#'><br/><br/>"
      + data[i].summary
      + "<br/><br/></a>"
      + posted[0] + " - " + posted[1]
      + "<br/><br/><button class='waves-effect waves-light btn cyan darken-1' type='submit' id='submitBtn'>Save Article</button>"
      + "</p></div><div class='card-reveal'><span class='z-depth-2 card-title grey-text text-darken-4'>"
      + "<a href='" + data[i].link + "' target='_blank'>"
      + data[i].title
      + "</a><i class='material-icons right card-head-icon'>close</i></span>" + "<br/><h5>Notes</h5>"
      + "<div class='past-notes'></div>"
      + "<div class='col s10'><div class='row'><div class='input-field col s10'><i class='material-icons prefix edit-icon'>mode_edit</i><textarea id='icon_prefix2' class='materialize-textarea'></textarea><label for='icon_prefix2'>New Note</label></div></div></div>"
      + "<button class='waves-effect waves-light btn col s2 cyan darken-1' type='submit' id='submitBtn'>Save Note</button>"
      ))
      
    
      // .append(
      //   "<a href='" 
      //   + data[i].link 
      //   + "' data-id='" 
      //   + data[i]._id 
      //   + "'><h3>" 
      //   + data[i].title 
      //   + "</h3>" 
      //   + data[i].summary + "</a><br/><br/>"
      //   + data[i].time);
      // .append("<br><button type='submit' id='submitBtn'>Submit</button>");

      // <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='images/office.jpg'/></div>
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
})
