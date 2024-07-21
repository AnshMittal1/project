const urlParams = new URLSearchParams(window.location.search);
const cityName = urlParams.get('city');

if (cityName) {
  const place = JSON.parse(localStorage.getItem('selectedPlace'));
  const locationDataDiv = document.getElementById('locationData');
  const cityFolder = encodeURIComponent(cityName.replace(/ /g, '_'));

  
  function fetchCityInfo() {
    fetch(`data/${cityFolder}/info.json`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(cityInfo => {
        let guidesInfo = '';
        cityInfo.people.forEach(person => {
          guidesInfo += `
            <div class="guides">
              <img class="guide-img" src="${person.image}" alt="${person.name}">
              <div class="guide-text">
                ${person.intro}
              </div>
            </div>
          `;
        });

        const locationNameDiv = `
          <div id="locationName">Here are the popular guides in ${cityName}</div>
        `;
        const guideContainerDiv = `
          <div id="guideContainer" class="guides-container">
            ${guidesInfo}
          </div>
        `;

        locationDataDiv.innerHTML = locationNameDiv + guideContainerDiv;
      })
      .catch(() => {
        locationDataDiv.innerText = 'Sorry, we do not have any information on this city.';
      });
  }

  fetchCityInfo();
} else {
  document.getElementById('locationData').innerText = 'No city name provided.';
}








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