$(document).ready(function() {

  var firstSeach = true;
  var searchTerm;
  var suggestions = ['tree', 'flower', 'bird', 'puppy', 'cat', 'mad', 'happy', 'perfect', 'alone', 'movie', 'Bob Ross', 'ice cream', 'snow', 'rain', 'teen', '30', '20', 'girl', 'family', 'mom', 'dad', 'telephone', 'tv', 'house'];

  suggestBtn();

  $('#searchButton').on("click", function() {
    searchTerm = $('#searchField').val();
    ajaxCall();
  })

  $(document).on("keypress", function() {
    if(event.which == 13) {
      searchTerm = $('#searchField').val();
      ajaxCall();
    }
  })

  $('button').on("click", function() {
    searchTerm = $(this).html();
    ajaxCall();
  })

  function suggestBtn() {
    for(var i = 0; i < 6; i++) {
      $('#suggestions').append('<button>');
      $('#suggestions button:last-child').addClass('btn btn-default');
      $('#suggestions button:last-child').html(suggestions[i]);
    }
  }

  function ajaxCall() {
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

    $('#pastSearches').append('<button>');
    $('#pastSearches button:last-child').addClass('btn btn-default');
    $('#pastSearches button:last-child').html(searchTerm);

    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).done(function(response) {
      for(var i = 0; i < 12; i++) {
        var fixedImage = response.data[i].images.fixed_height_still.url;
        var rating = response.data[i].rating;
        $('#results').append('<div>');
        $('#results > div').addClass('gif');
        $('#results').children('div').eq(i).append('<img src="'+fixedImage+'">');
        $('.gif').eq(i).append("<div class='hover'>");
        $(".hover").eq(i).append("<p>"+rating+"</p>");
      }

      $('.gif').on("click", function() {
        var index = $(".gif").index(this);
        var playImage = response.data[index].images.fixed_height.url;
        $('#play, #back').removeClass('disable');
        $('.main').addClass('disable');
        $('#results').css('display', 'none');
        $('#play').append('<div>');
        $('#play').addClass('movie');
        $('.movie').append("<img src='"+playImage+"'>");
      })

      $('.gif').hover(
        function() {
          var index = $('.gif').index(this);
          $('.hover').eq(index).css('display', 'inline-block');
        },
        function() {
          var index = $('.gif').index(this);
          $('.hover').eq(index).css('display', 'none');
        });

      $('#back').on("click", function() {
        $('#play img').remove();
        $('#play, #back').addClass('disable');
        $('.main').removeClass('disable');
        $('#results').css('display', 'block');
      })

    })
  }

})
