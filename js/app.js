$(document).ready(function() {
  // welcomeScreen();
  // google maps;
  $('input').val(''); 
    
  $('#search-btn').click(function() {
    searchRestaurants();
  });

  $('#search-btn').prop('disabled', true);
  $('input').keyup(function(e) {
    emptyInput();
    if (e.which === 13) {
      searchRestaurants();
    }
  });

  $('#clear-btn').click(function() {
    clearResults();
  });
});

function getUserInput() {
  return $('input').val();
}

function emptyInput() {
  if ($.trim(getUserInput()).length === 0) {
    $('#search-btn').prop('disabled', true);
  } else {
    $('#search-btn').prop('disabled', false);
  }
}

function clearResults() {
  $('img').map(function() {
    $(this).show();
    $('#no-results').empty();
  });
  $('input').val(''); 
  emptyInput();
}

function searchRestaurants() {
  showResults();
  $('input').val('');
  emptyInput(); 
}

function showResults() {
  var restaurants = getRestaurants();

  if (restaurants.length > 0) {
    $('img').map(function() {
      $(this).hide();
    });

    $(restaurants).map(function(index, value) {
      $('img').map(function() {
        var imgSrc = this.src;
        var indexOfAssets = imgSrc.indexOf("assets");
        var imgSrc = imgSrc.slice(indexOfAssets);
  
        if (imgSrc === value.image) {
          $(this).show();
        } 
      });
    });
  }
}

function getRestaurants() {
  var aux = [];
  $(restaurantes).map(function(index,value) {
    if (getUserInput() === value.name) {
      aux[0] = value;
      $('#no-results').empty();
    } 

    if (getUserInput() === value.type) {
      aux.push(value);
      $('#no-results').empty();
    }
  });

  if (aux.length === 0) {
    $('img').map(function() {
      $(this).hide();
    });
    $('#no-results').html('<p>Não encontramos nenhum resultado com esse nome</p>');
  }
  return aux;
}