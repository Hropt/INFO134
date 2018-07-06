//search object
searchObj = {
  string: "",
  openAt: undefined,
  open: undefined,
  male: undefined,
  female: undefined,
  wheelchair: undefined,
  stellerom: undefined,
  mPrice: undefined,
  free: undefined,
};

//is advanced search activated
var advOptOn = false;

//contains the complete dataset
var datasetArr = [];


/*
Uses a promise to return the JSON array from the specified link.
Places the objects in the returned array to datasetArr.
displays the objects in the array by calling search(datasetArr) and updateMarkers(datasetArr).
*/
function getToilets() {
   var promise = getJSON("https://hotell.difi.no/api/json/bergen/dokart?");
   var promValue;
   promise.then(function(value) {
     console.log("promise returned successfully");
     promValue = value.entries;
     for (var i = 0, arrLength = promValue.length; i < arrLength; i++) {
        datasetArr.push(promValue[i]);
     }
     results = datasetArr;
     updateList(datasetArr);
     updateMarkers(datasetArr);
   });
}


//Toggles advanced options
function toggleOpt(){
  document.getElementById("advancedOptions").classList.toggle("is-active");
  var button = document.getElementById("advancedSearch");

  if (advOptOn == false) {
    advOptOn = true;
    button.innerHTML = 'Nullstill';

  } else { //resets values from advanced search menu
    advOptOn = false;
    button.innerHTML = 'Avansert søk';
    document.getElementById("open").checked = false;
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    document.getElementById("wheelchair").checked = false;
    document.getElementById("stellerom").checked = false;
    document.getElementById("free").checked = false;
    document.getElementById('maxPrice').value="";

    setOpenNow();
    setMale();
    setFemale();
    setWheelchair();
    setStellerom();
    setMaxPrice();
    setFree();
    search();
  }
}

//Setter for searchObj values. Runs search() or advanced search depending on the string after setting the search string.
//Runs every time the search input field is changed.
function setSearchStr() {
  searchObj.string = document.getElementById('searchStr').value.toUpperCase();
  console.log(searchObj.string);
  if (searchObj.string.indexOf(":") > -1) {
    advancedSearch();
  } else { //resets the advanced options after removing :
    setOpenNow();
    setMale();
    setFemale();
    setWheelchair();
    setStellerom();
    setMaxPrice();
    setFree();
    search();
    search(datasetArr);
  }
}


/*
Splits string, place words with : into advanced option array and other words into search string array.
For each string in advanced option array, check if it matches any of the advanced search options and turn them on if they do.
Builds new search string from search string array.
Runs search with advanced options on and new search string.
*/
function advancedSearch () {
    var regexPris = /PRIS:[0-9]+/gm;
    var regexTid = /ÅPEN:[0-9]+/gm;
    var searchStrArr = searchObj.string.split(" ");
    var advOptionString = [];
    var keywordArr = [];

    for (var i = 0, arrLength = searchStrArr.length; i < arrLength; i++) {
      if (searchStrArr[i].indexOf(":") == -1) {
        keywordArr.push(searchStrArr[i]);
      } else {
        advOptionString.push(searchStrArr[i]);
      }
      console.log("advanced option strings: " + advOptionString);
      console.log("keyword strings: " + keywordArr);
    }

    searchObj.string = keywordArr.join(" ");
    console.log("searchObj.string: " + searchObj.string);

    for (var i = 0, arrLength = advOptionString.length; i < arrLength; i++) {
      console.log("advanced search");
      if(advOptionString[i] == "KJØNN:MANN") {
        searchObj.male = true;
        console.log("mann");
        advOptOn = true;
      }
      if (advOptionString[i] == "KJØNN:KVINNE") {
        searchObj.female = true;
        console.log("kvinne");
        advOptOn = true;
      }

      if (advOptionString[i] == "PRIS:GRATIS") {
        searchObj.free = true;
        console.log("gratis");
        advOptOn = true;
      }
      if (advOptionString[i].match(regexPris)) {
        searchObj.mPrice = advOptionString[i].substring(5);
        console.log("pris: " + advOptionString[i].substring(5));
        advOptOn = true;
      }
      if (advOptionString[i] == "ÅPEN:NÅ") {
        searchObj.open = true;
        console.log("åpen nå");
        advOptOn = true;
      }
      if (advOptionString[i].match(regexTid)) {
        searchObj.openAt = advOptionString[i].substring(5);
        console.log("åpen xx");
        advOptOn = true;
      }
      if (advOptionString[i] == "RULLESTOL:JA") {
        searchObj.wheelchair = true;
        console.log("rullestol på");
        advOptOn = true;
      }
      if (advOptionString[i] == "STELLEROM:JA") {
        searchObj.stellerom = true;
        console.log("stellerom på");
        advOptOn = true;
      }
  }
  search(datasetArr);
}


/*
Setters for advanced options on the search object.
Each function runs when it is changed by the user.
*/

function setOpenAt() {
  searchObj.openAt = timeString;
  var timeString = document.getElementById("hours").value + addZero(document.getElementById("minutes").value);
  console.log("input time: " + timeString);
  searchObj.openAt = timeString;
  search(datasetArr);
}

function setOpenNow() {
  if (document.getElementById('open').checked) {
            searchObj.open = true;
  } else {
    searchObj.open = undefined;
  }
  search(datasetArr);
}

function setMale() {
  if (document.getElementById('male').checked) {
            searchObj.male = true;
  } else {
    searchObj.male = undefined;
  }
  console.log(searchObj.male);
  search(datasetArr);
}

function setFemale() {
  if (document.getElementById('female').checked) {
            searchObj.female = true;
  } else {
    searchObj.female = undefined;
  }
  console.log(searchObj.female);
  search(datasetArr);
}

function setWheelchair() {
  if (document.getElementById('wheelchair').checked) {
            searchObj.wheelchair = true;
  } else {
    searchObj.wheelchair = undefined;
  }
  console.log(searchObj.wheelchair);
  search(datasetArr);
}

function setStellerom() {
  if (document.getElementById('stellerom').checked) {
            searchObj.stellerom = true;
  } else {
    searchObj.stellerom = undefined;
  }
  console.log(searchObj.stellerom);
  search(datasetArr);
}

function setFree() {
  if (document.getElementById('free').checked) {
            searchObj.free = true;
  } else {
    searchObj.free = undefined;
  }
  console.log(searchObj.free);
  search(datasetArr);
}

function setMaxPrice() {
  var str = document.getElementById('maxPrice').value;
  searchObj.mPrice = parseInt(str);
  console.log("max price: " + searchObj.mPrice);
  search(datasetArr);
}

/*
Goes through the toilet array to see if they match the searchObj and if so adds them to results array.
First checks street/placement, then checks if advanced options are used, and checks each.
*/
function search(incArr){
  var array = incArr;
  results = [];
  console.log("starting search");
  console.log(searchObj);

  for (var i = 1, arrLength = array.length; i < arrLength; i++) {
    var toalett = array[i];
    f2 = true;
    f3 = true;
    f4 = true;
    var match = true;
    var time = new Date();

      //Uses indexOf to see if the string matches the fields in the searchObj.
      if (toalett.adresse.indexOf(searchObj.string) == -1) {
          f2 = false;
        //  console.log(toalett.plassering + " " + f2);
      }

      if (toalett.plassering.indexOf(searchObj.string) == -1) {
          f3 = false;
          //console.log(f3);
      }

      if (toalett.place.indexOf(searchObj.string) == -1) { //does not work, don't know why
          f4 = false;
          //console.log(f4);
      }

      if (f2 == true || f3 == true || f4 == true) {
        match = true;
        //console.log(toalett.plassering + " " + match);
      } else {
        match = false;
      }

      if(advOptOn == true) { // Checks advanced options, sets match as false if they do not match.
        if(typeof searchObj.from === "undefined") {
        } else {
          var str = toalett.tid_hverdag.substring(0, 2) + toalett.tid_hverdag.substring(3, 5);
          var num = parseInt(str);
          console.log("åpner = " + num);

          if(searchObj.from <= num) {
            match = false;
          }
        }

        if(typeof searchObj.to === "undefined") {
        } else {
          var str = toalett.tid_hverdag.substring(8, 10) + toalett.tid_hverdag.substring(11, 13);
          var num = parseInt(str);

          if(searchObj.to >= num) {
            match = false;
          }
        }

        if(typeof searchObj.male === "undefined") {
        } else {
            if(toalett.herre != "1") {
              match = false;
          }
        }

        if(typeof searchObj.female === "undefined") {
        } else {
            if(toalett.dame != "1") {
              match = false;
          }
        }

        if(typeof searchObj.wheelchair === "undefined") {
        } else {
            if(toalett.rullestol != "1") {
              match = false;
          }
        }

        if(typeof searchObj.stellerom === "undefined") {
        } else {
            if(toalett.stellerom != "1") {
              match = false;
          }
        }

        if(typeof searchObj.free === "undefined") {
        } else {
            if(toalett.pris != "0") {
              match = false;
          }
        }

        if(typeof searchObj.mPrice === "undefined") {
        } else {

          var num = parseInt(toalett.pris);
            if (num > searchObj.mPrice) {
              match = false;
          }
        }

        if(typeof searchObj.open === "undefined") {
        } else {
          var h = time.getHours().toString();
          var m = time.getMinutes().toString();
          var hm = h + m;
          var hmInt = parseInt(hm);
          console.log(typeof hmInt);
          var check = checkTimes(time.getDay(), hmInt, toalett);

          if(check === false) {
            match = false;
          }
        }

        if(typeof searchObj.openAt === "undefined") {
        } else {
          var weekday = time.getDay();
          var hrStr = time.getHours();
          var minStr = addZero(time.getMinutes());

          var glTime = parseInt(hrStr.toString() + minStr.toString());


          if (glTime > searchObj.openAt) {
            var check = checkTimes(weekday, searchObj.openAt, toalett); // check todays times
            if(check === false) {
              match = false;
            }
          } else { // check tomorrow
            weekday = weekday + 1;
            if (weekday === 8) {
              weekday = 0;
            }
            var check = checkTimes(weekday, searchObj.openAt, toalett); // check todays times
            if(check === false) {
              match = false;
            }
          }
        }

      }
      if (match == true) {
          results.push(toalett);
      }
    }
  updateList(results);
  updateMarkers(results);
}


//Checks time and returns true if the time matches the searchObj, false if it does not.
function checkTimes(day, hours, toalett) {
  console.log("hours: " + hours + " - " + "search: " + searchObj.open);

  var open = 0;
  var close = 0;
  var doesMatch = true;
  if(day === 6) { //check saturday
    open = parseInt(toalett.tid_lordag.substring(0, 2) + toalett.tid_lordag.substring(3, 5));
    close = parseInt(toalett.tid_lordag.substring(8, 10) + toalett.tid_lordag.substring(11, 13));

    if(hours < open || hours > close) {
      doesMatch = false;
    }
  } else if (day === 0) { // check sunday
    open = parseInt(toalett.tid_sondag.substring(0, 2) + toalett.tid_sondag.substring(3, 5));
    close = parseInt(toalett.tid_sondag.substring(8, 10) + toalett.tid_sondag.substring(11, 13));
    if(hours < open || hours > close) {
      doesMatch = false;
    }
  } else { // check mon-fri
    open = parseInt(toalett.tid_hverdag.substring(0, 2) + toalett.tid_hverdag.substring(3, 5));
    close = parseInt(toalett.tid_hverdag.substring(8, 10) + toalett.tid_hverdag.substring(11, 13));

      if(hours < open || hours > close) {
      doesMatch = false;
      }
  }
  return doesMatch;
}


/*
Takes on an array of toilets.
Updates the list by generating an ol-list based on the array.
Resets the prevLiEl variable used for highlighting clicked toilets.
*/
function updateList(result) {
  document.getElementById("list").innerHTML = "";
  var olStart = "<ol>";
  var olEnd = "</ol>";
  var liList = "";

  for (var i = 0, arrLength = result.length; i < arrLength; i++) {
  var  toalett = result[i];
  console.log(i);
  liList = liList + "<li id=\"" + i + "\" " + "onClick=\"markerFocus(this.id); displayLi(this.id)\"" + ">" + toalett.plassering + "</li> ";
  }
  document.getElementById("list").innerHTML = olStart + liList + olEnd;
  prevLiEl = document.getElementById("0");
}


//Pans the map to the marker belonging to the ol-list item clicked
function markerFocus(id) {
  console.log(id);
  console.log(results);
  var location = results[id];
  map.panTo({lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)});
}


//updates markers when the results list is updated
function updateMarkers (newMarkers) {
  console.log("updating markers")
  console.log(newMarkers);
  var results = newMarkers;
  setMapOnAll(null);
  markerArr = [];

  for (var i = 0, arrLength = results.length; i < arrLength; i++) {
    var  toalett = results[i];
    var label = i + 1;
    var marker = new google.maps.Marker({
    position: {lat: parseFloat(toalett.latitude), lng: parseFloat(toalett.longitude)},
    map: map,
    title: toalett.plassering,
    label: label.toString()
  });
  markerArr.push(marker);
  setMapOnAll(map);
  }
}

//adds a 0 to minutes to maintain the right format.
function addZero(i) {
  if(i < 10) {
    i = "0" + i;
  }
  return i;
}


//FAVOURITE BELOW

/*
Uses getJSON to get the toilet JSON.
*/
function getTList() {
   var promise = getJSON("https://hotell.difi.no/api/json/bergen/dokart?");
   var promValue;
   promise.then(function(value) {

     promValue = value.entries;
     for (var i = 0, arrLength = promValue.length; i < arrLength; i++) {
        datasetArr.push(promValue[i]);
     }
     setSelectList(datasetArr);
     findClosest();
   });
}

//creates the select element and adds the options from the datasetArr.
function setSelectList(array) {
  var div = document.getElementById("select");
  var list = document.createElement("select");
  list.id = "favList";
  div.appendChild(list);
  list.addEventListener(
     'change',
     function() { findClosest(); },
     false
  );
  for (var i = 0, arrLength = array.length; i < arrLength; i++) {
  var option = document.createElement("option");
  var  toalett = array[i];
  option.value = toalett.id;
  option.text = toalett.plassering;
  list.appendChild(option);
  }
}




/*
Gets the selected option.
Goes through the array of toilet objects, calls getDistance and keeps the object if it is closer than the current closest object.
Then displays the two objects.
*/
function findClosest() {
  results = [];
  var closestIndex;
  var select_id = document.getElementById("favList");
  var x = select_id.options[select_id.selectedIndex].value - 1;
  var favToilet = datasetArr[x];
  var c1 = [favToilet.latitude, favToilet.longitude]; //haversine

  var closestToilet;
  var closest = [0, 99999999];

  for (var i = 0, arrLength = datasetArr.length; i < arrLength; i++) {
    var toilet = datasetArr[i];
    var c2 = [toilet.latitude, toilet.longitude]; // haversine

    var distance = getDistance(c1, c2);

    if (distance > 0) {

      if(distance < closest[1]) {
        closest = [i, distance];
        closestIndex = i;
        console.log(closest);
      }
    }
  }

  document.getElementById("favP").innerHTML = favToilet.plassering;
  document.getElementById("favAdr").innerHTML = favToilet.adresse;

  document.getElementById("closestP").innerHTML = datasetArr[closest[0]].plassering;
  document.getElementById("closestAdr").innerHTML = datasetArr[closest[0]].adresse;
  document.getElementById("closestDist").innerHTML = "Avstand: " + closest[1] + " meter.";

  results = [favToilet, datasetArr[closestIndex]];
  updateMarkers(results);
  markerFocus(0);
}




//gets the distance between two coordinates using the haversine formula.
function getDistance(coord1, coord2) {
    var lat1 = coord1[0];
    var lon1 = coord1[1];
    var lat2 = coord2[0];
    var lon2 = coord2[1];

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    distance = (12742 * Math.asin(Math.sqrt(a))) * 1000; // 2 * R; R = 6371 km
    return Math.round(distance);
}
