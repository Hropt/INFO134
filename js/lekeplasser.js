//contains the complete dataset
var datasetArr = [];



//gets the json array and places the objects into the datasetArr.
//then updates the list and markers.
function getPlaygrounds() {
   var promise = getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?");
   var promValue;
   promise.then(function(value) {
     console.log("promise returned successfully");

     promValue = value.entries;

     for (var i = 0, arrLength = promValue.length; i < arrLength; i++) {
       datasetArr.push(promValue[i]);
     }

     updateList(datasetArr);
     updateMarkers(datasetArr);
   });
}


//Creates the ol list displaying the different playgrounds.
function updateList(incArr) {
  var result = incArr;
  document.getElementById("list").innerHTML = "";
  var olStart = "<ol>";
  var olEnd = "</ol>";
  var liList = "";

  for (var i = 0, arrLength = result.length; i < arrLength; i++) {
    var  playground = result[i];
    liList = liList + "<li id=\"" + i + "\" " + "onClick=\"markerFocus(this.id); displayLi(this.id)\"" + ">" + playground.navn + "</li> ";
  }

  document.getElementById("list").innerHTML = olStart + liList + olEnd;
  prevLiEl = document.getElementById("0");
}


//Pans the map to the marker belonging to the ol-list item clicked
function markerFocus(id) {
  var location = datasetArr[id];
  map.panTo({lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)});
}


//updates markers when the list is updated
function updateMarkers (newMarkers) {
  console.log("updating markers")
  console.log(newMarkers);
  var results = newMarkers;
  setMapOnAll(null);
  markerArr = [];

  for (var i = 0, arrLength = results.length; i < arrLength; i++) {
    var  item = results[i];
    var label = i + 1;
    var marker = new google.maps.Marker({
    position: {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)},
    map: map,
    title: item.plassering,
    label: label.toString()
  });
  markerArr.push(marker);
  setMapOnAll(map);
  }

}
