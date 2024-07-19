function initAutocomplete() {

    var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});


    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
 
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });
  }




  
  document.addEventListener("DOMContentLoaded", function() {
    initAutocomplete();
  });