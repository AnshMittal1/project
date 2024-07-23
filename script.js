      
      
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



      document.getElementById('openLoginPopup').addEventListener('click', function() {
        document.getElementById('loginPopup').style.display = 'flex';
    });
    
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('loginPopup').style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('loginPopup')) {
            document.getElementById('loginPopup').style.display = 'none';
        }
    });


    const buttons = document.querySelectorAll('button.bt');

    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
    
      btn.addEventListener('click', function(event) {
        event.target.classList.toggle('active');
      });
    }    