$(document).ready(function() {

  var firstSeach = true;

  $('#searchButton').on("click", function() {
    var searchTerm = $('#searchField').val();
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+searchTerm+"&limit=12&api_key=dc6zaTOxFJmzC"

    if(firstSeach) {
      $('.main').animate({top: '20px'});
      $('.form-control').css({
        "height": "32px",
        "font-size": "14px"
      });
      $('#results, #pastSearches').fadeIn(700);
      $('#suggestions').addClass('disable');
      firstSeach = false;
    } else {
      $('#results').empty();
    }

    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).done(function(response) {
      for(var i = 0; i < 12; i++) {
        var fixedImage = response.data[i].images.fixed_height_still.url;
        $('#results').append('<div>');
        $('#results > div').addClass('gif');
        $('#results').children('div').eq(i).append('<img src="'+fixedImage+'">');
      }
    })
  })

})
