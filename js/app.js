$(document).ready(function() {
  splashFadeOut();

  showAllOptions();
  emptyInput();
  resetSelectedType();
  clickModalEvent();

  changeInputEvent();
  selectTypeEvent();
});

function splashFadeOut() {
  $('.splash').delay('2500').fadeOut(500);
  $('.app-page').delay('2500').fadeIn(700);
}

function showAllOptions() {
  clearScreen();
  $(restaurantes).map(function(index, value) {
    var createContainer = document.createElement('div');
    var restaurantName = '<h5 class="rtr-title">' + value.name + '</h5>';
    var restaurantImg = '<img class="rtr-img" data-toggle="modal" data-target="#exampleModal"  src="' + value.image + '">';
    $(createContainer).append(restaurantName);
    $(createContainer).append(restaurantImg);
    $('#show-results').append(createContainer);
  })
}

function clearScreen() {
  $('#show-results').empty();
}

function emptyInput() {
  $('input').val('');
}

function resetSelectedType() {
  $('#select-type').prop('selectedIndex',0);
}

function clickModalEvent() {
  $('#show-results img').click(function(e) {
    showModal(e);
    mapOnModal(e);
  });
}

function changeInputEvent() {
  $('input').on('input', function() {
    filterByName();
    initMap();
    clickModalEvent();
  });
}

function selectTypeEvent() {
  $('option').click(function(e) {
    filterByType(e);
    initMap();
    clickModalEvent();
  })
}

function filterByName() {
  resetSelectedType();
  clearScreen();
  var userInput = $('input').val().toLowerCase();

  $(restaurantes).map(function(index, value) {
    if (value.name.toLowerCase().indexOf(userInput) > -1) {
      var createContainer = document.createElement('div');
      var restaurantName = '<h5 class="rtr-title">' + value.name + '</h5>';
      var restaurantImg = '<img class="rtr-img" data-toggle="modal" data-target="#exampleModal"  src="' + value.image + '">';
      $(createContainer).append(restaurantName);
      $(createContainer).append(restaurantImg);
      $('#show-results').append(createContainer);
    } 
  })

  if ($('#show-results').html().trim().length === 0) {
    $('#show-results').html('<p>=( Não encontramos nenhum resultado com esse nome.</p>');
  }
}

function filterByType(e) {
  clearScreen();
  emptyInput();

  var option = e.target;
  var type = $(option).data('foodType');

  $(restaurantes).map(function(index, value) {
    if(type === value.type) {
      var createContainer = document.createElement('div');
      var restaurantName = '<h5 class="rtr-title">' + value.name + '</h5>';
      var restaurantImg = '<img class="rtr-img" data-toggle="modal" data-target="#exampleModal"  src="' + value.image + '">';
      $(createContainer).append(restaurantName);
      $(createContainer).append(restaurantImg);
      $('#show-results').append(createContainer); 
    } 
  });

  if (type === 'alltypes') {
    showAllOptions();  
  }
}

function initMap() {
  var mapOptions = {
      zoom: 15,
      center: {lat: -23.556981, lng: -46.660259},
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  var customIcon = 'https://raw.githubusercontent.com/marciapsilva/foodmap/master/assets/maps-icon-small.png';

  var marker;
  $('#show-results img').map(function(index, value) {
    var imgSrc = $(this).attr('src');

    $(restaurantes).map(function(index, value) {
      if(imgSrc === value.image) {
        marker = new google.maps.Marker({
          title: value.name,
          position: {lat: value.latitude, lng: value.longitude},
          map: map,
          icon: customIcon
        })     
      }
    })
  })
}

function showModal(e) {
  var foto = e.target;
  var imgSrc = $(foto).attr('src');

  $(restaurantes).map(function(index, value) {
    if (imgSrc === value.image) {

      if (value.type === 'arabe') {
        value.type = 'árabe';
      }

      $('#modal-title').text(value.name);
      $('#modal-img').attr('src', value.image);
      $('#modal-type').text(value.type);
      $('#modal-type').css('textTransform', 'capitalize');
      $('#modal-description').text(value.description);
    }
  })
}

function mapOnModal(e) {
  var foto = e.target;
  var imgSrc = $(foto).attr('src');

  var customIcon = 'https://raw.githubusercontent.com/marciapsilva/foodmap/master/assets/maps-icon-small.png';

  $(restaurantes).map(function(index, value) {
    if (imgSrc === value.image) {
      var mapModalOptions = {
        zoom: 18,
        center: {lat: value.latitude, lng: value.longitude},
      };
      map = new google.maps.Map(document.getElementById('modal-map'), mapModalOptions);

      marker = new google.maps.Marker({
        title: value.name,
        position: {lat: value.latitude, lng: value.longitude},
        map: map,
        icon: customIcon
      }); 
    }
  })
}