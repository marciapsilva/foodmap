$(document).ready(function() {
  // welcomeScreen();
  
  clearResults();
    
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
  $('#show-results img').remove();
  $('#no-results').empty();

  $(restaurantes).map(function(index, value) {

    var restaurantImg = '<img src="' + value.image + '" alt="">';
    $('#show-results').append(restaurantImg);
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
    $('#show-results img').map(function() {
      $(this).remove();
    });

    $(restaurants).map(function(index, value) {

      if(getUserInput() === value.name || getUserInput() === value.type) {
        var restaurantImg = '<img src="' + value.image + '" alt="">';
        $('#show-results').append(restaurantImg);
      }
    });
  }
}

function getRestaurants() {
  var aux = [];
  $(restaurantes).map(function(index,value) {

    var pegaInput = $('input').val();
    console.log(pegaInput);

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
    $('#show-results img').map(function() {
      $(this).remove();
    });
    $('#no-results').html('<p>Não encontramos nenhum resultado com esse nome</p>');
  }
  return aux;
}

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.557567, lng: -46.658615},
    zoom: 15
  });

  var latife = new google.maps.Marker({
    position: {lat: -23.557567, lng: -46.658615},
    map: map
  })

  var arabesco = new google.maps.Marker({
    position: {lat: -23.5607625, lng: -46.65784689999998},
    map: map
  })

  var ragazzo = new google.maps.Marker({
    position: {lat: -23.5588598, lng: -46.66152740000001},
    map: map
  })

  var mcdonalds = new google.maps.Marker({
    position: {lat: -23.558783, lng: -46.66130229999999},
    map: map
  })

  var cantina = new google.maps.Marker({
    position: {lat: -23.5587677, lng: -46.66278650000004},
    map: map
  })

  var popVegan = new google.maps.Marker({
    position: {lat: -23.5539487, lng: -46.65767779999999},
    map: map
  })

  var lovingHut = new google.maps.Marker({
    position: {lat: -23.5539487, lng: -46.65767779999999},
    map: map
  })

  var ajiTo = new google.maps.Marker({
    position: {lat: -23.5560888, lng: -46.657931700000006},
    map: map
  })

  var sushimasa = new google.maps.Marker({
    position: {lat: -23.5600095, lng: -46.66369069999996},
    map: map
  })

}


