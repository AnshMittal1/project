      
      
      let autocomplete;
      let selectedPlace;

      function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'), {types: ['(cities)']});

        autocomplete.addListener('place_changed', function() {
          selectedPlace = autocomplete.getPlace();
          if (!selectedPlace.geometry) {
            window.alert("No details available for input: '" + selectedPlace.name + "'");
            return;
          }

          localStorage.setItem('selectedPlace', JSON.stringify(selectedPlace));
        });

        document.getElementById('searchButton').addEventListener('click', function() {
          if (!selectedPlace || !selectedPlace.geometry) {
            window.alert("Please select a location from the suggestions.");
            return;
          }

          window.location.href = `locationDetails.html?city=${encodeURIComponent(selectedPlace.name)}`;
        });
      }

      document.addEventListener("DOMContentLoaded", function() {
        initAutocomplete();
      });