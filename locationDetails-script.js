


    const urlParams = new URLSearchParams(window.location.search);
      const cityName = urlParams.get('city');

      if (cityName) {
        const place = JSON.parse(localStorage.getItem('selectedPlace'));
        const locationDataDiv = document.getElementById('locationData');
        const locationNameDiv = document.getElementById('locationName');
        locationNameDiv.innerHTML=`Here are the popular guides in ${place.name}`
        

        const cityFolder = encodeURIComponent(cityName.replace(/ /g, '_'));

        // Function to fetch and display city info
        function fetchCityInfo(fileType) {
          return fetch(`data/${cityFolder}/info.${fileType}`)
            .then(response => {
              if (!response.ok) throw new Error('Network response was not ok');
              return response[fileType === 'json' ? 'json' : 'text']();
            })
            .then(cityInfo => {
              if (fileType === 'json') {
                cityInfo = `
                  <p>${cityInfo.description}</p>
                  <p><strong>Population:</strong> ${cityInfo.population}</p>
                  <p><strong>Area:</strong> ${cityInfo.area}</p>
                `;
              }
              if (place) {
                // here will be the information
              } else {
                locationDataDiv.innerText = 'No location data available.';
              }
            });
        }

        // Try fetching info.json first, if it fails, fallback to info.txt, and if both fail show an error message
        fetchCityInfo('json')
          .catch(() => fetchCityInfo('txt'))
          .catch(() => {
            locationDataDiv.innerText = 'Sorry, we do not have any information on this city.';
          });
      } else {
        document.getElementById('locationData').innerText = 'No city name provided.';
      }