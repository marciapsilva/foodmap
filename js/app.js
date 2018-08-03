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
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  var latife = {lat: -23.557567, lng: -46.658615};

  var arabesco = {lat: -23.5607625, lng: -46.658615};

  var ragazzo = {lat: -23.557567, lng: -46.658615};

  var mcdonalds = {lat: -23.557567, lng: -46.658615};

  var cantina = {lat: -23.557567, lng: -46.658615};

  var popVegan = {lat: -23.557567, lng: -46.658615};

  var lovingHut = {lat: -23.557567, lng: -46.658615};

  var ajiTo = {lat: -23.557567, lng: -46.658615};

  var sushimasa = {lat: -23.557567, lng: -46.658615};

}


function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}