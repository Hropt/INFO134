//map variables
var map = null;
var bergenMarker = {lat: 60.391043, lng: 5.326882}
var markerArr = [];
var results = [];
var mobMenuOn = false;

var prevLiEl;

/*
takes on an url which is used in a XMLHttpRequest-object to either return the JSON array or null.
Uses a promise to do this asynchroniosly
*/
function getJSON(url) {
    return new Promise((resolve, reject) => {
    const xhReq = new XMLHttpRequest();
    xhReq.open("GET", url);
    xhReq.onload = () => resolve(JSON.parse(xhReq.responseText));
    xhReq.onerror = () => reject(null);
    xhReq.send();
  });
}


//highlights the color of clicked
function displayLi(id) {
  console.log("id: " + id);
  prevLiEl.style.backgroundColor = "#050505"
  var liEl = document.getElementById(id);
  liEl.style.backgroundColor = "#252525";
  prevLiEl = liEl;
}



//Google maps initializer
function initMap() {

  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    [
{
"elementType": "geometry",
"stylers": [
{
"color": "#242f3e"
}
]
},
{
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#746855"
}
]
},
{
"elementType": "labels.text.stroke",
"stylers": [
{
"color": "#242f3e"
}
]
},
{
"featureType": "administrative.locality",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#5ec8db"
}
]
},
{
"featureType": "landscape",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#5cd6dc"
}
]
},
{
"featureType": "poi",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#5cd6dc"
}
]
},
{
"featureType": "poi.business",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "poi.park",
"elementType": "geometry",
"stylers": [
{
"color": "#263c3f"
}
]
},
{
"featureType": "poi.park",
"elementType": "labels.text",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "poi.park",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#6b9a76"
}
]
},
{
"featureType": "road",
"elementType": "geometry",
"stylers": [
{
"color": "#38414e"
}
]
},
{
"featureType": "road",
"elementType": "geometry.stroke",
"stylers": [
{
"color": "#212a37"
}
]
},
{
"featureType": "road",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#9ca5b3"
}
]
},
{
"featureType": "road.arterial",
"elementType": "geometry.fill",
"stylers": [
{
"color": "#f1496b"
},
{
"weight": 1
}
]
},
{
"featureType": "road.highway",
"elementType": "geometry",
"stylers": [
{
"color": "#746855"
}
]
},
{
"featureType": "road.highway",
"elementType": "geometry.fill",
"stylers": [
{
"color": "#ee1e47"
}
]
},
{
"featureType": "road.highway",
"elementType": "geometry.stroke",
"stylers": [
{
"color": "#1f2835"
}
]
},
{
"featureType": "road.highway",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#f3d19c"
}
]
},
{
"featureType": "road.local",
"elementType": "geometry.fill",
"stylers": [
{
"color": "#f25776"
}
]
},
{
"featureType": "transit",
"elementType": "geometry",
"stylers": [
{
"color": "#2f3948"
}
]
},
{
"featureType": "transit.station",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#d59563"
}
]
},
{
"featureType": "water",
"elementType": "geometry",
"stylers": [
{
"color": "#17263c"
}
]
},
{
"featureType": "water",
"elementType": "labels.text.fill",
"stylers": [
{
"color": "#515c6d"
}
]
},
{
"featureType": "water",
"elementType": "labels.text.stroke",
"stylers": [
{
"color": "#17263c"
}
]
}
],
      {name: 'Styled Map'});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
    map = new google.maps.Map(document.getElementById('map'), {
    center: bergenMarker,
    zoom: 16,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  //updateMarkers(datasetArr);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markerArr.length; i++) {
    markerArr[i].setMap(map);

  }
}


function toggleMenu() {
  console.log("toggling");
  if(mobMenuOn == false){
  document.getElementById("nav").style.display = "flex";
  mobMenuOn = true;
} else {
  document.getElementById("nav").style.display = "none";
  mobMenuOn = false;
}
}
