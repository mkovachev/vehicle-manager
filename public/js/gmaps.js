       var map,
           infowindow,
           service;
       var markers = [];

       function initMap() {
           // Sofia coordinates
           var center = {
               lat: 42.697,
               lng: 23.324
           };

           map = new google.maps.Map(document.getElementById('map'), {
               center: center,
               zoom: 12
           });

           infowindow = new google.maps.InfoWindow();
           service = new google.maps.places.PlacesService(map);
           service.nearbySearch({
               location: center,
               radius: 8000,
               type: ['car_repair']
           }, callback);


           //Add new event listener for 'right click' to search for new car repair workshops on the map
           google.maps.event.addListener(map, 'rightclick', function(event) {
               map.setCenter(event.latLng);
               clearResults(markers);

               service.nearbySearch({
                   location: event.latLng,
                   radius: 8000,
                   type: ['car_repair']
               }, callback);

           });


       }

       function callback(results, status) {
           if (status === google.maps.places.PlacesServiceStatus.OK) {
               for (var i = 0; i < results.length; i++) {
                   markers.push(createMarker(results[i]));
                   //createMarker(results[i]);
               }
           }
       }

       function createMarker(place) {
           var placeLoc = place.geometry.location;
           marker = new google.maps.Marker({
               map: map,
               position: place.geometry.location
           });

           google.maps.event.addListener(marker, 'click', function() {
               infowindow.setContent(place.name);
               infowindow.open(map, this);
           });
           return marker;
       }

       // Write function to clear results when right click is engaged
       function clearResults(markers) {
           for (var m in markers) {
               markers[m].setMap(null);
           }
           markers = [];
       }