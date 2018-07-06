//contains the complete dataset
var datasetArr = [];

//array of inspected li elements
var inspecting = [];

//search object
searchObj = {
  string: "",
};


//Gets the json and pushes objects to datasetArr.
//updates the list and sets current result array to match the datasetArr.
function getSchools() {
   var promise = getJSON("https://open.sesam.io/sesam-node/api/datasets/skoler_med_kodetimen/entities");
   var promValue;
   promise.then(function(value) {
     console.log("promise returned successfully");

     for (var i = 0, arrLength = value.length; i < arrLength; i++) {

       if (value[i].locality == "Bergen" || value[i].locality == "Stord" || value[i].locality == "Odda" || value[i].locality == "Os" || value[i].locality == "Askøy") {
         var inArray = containsValue(value[i].school, datasetArr); //checks if the school/club is already listed, if so ignores it.
         if(inArray == false) {
         datasetArr.push(value[i]);
       } else {
         console.log(i + " already in array");
       }
       }
     }

     console.log(datasetArr);
     results = datasetArr;
     updateList(datasetArr);
   });
}


//checks if the school/club is already listed, if so ignores it.
function containsValue(val, arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].school == val) {
            return true;
        }
    }
    return false;
}

//updates ol list with search results.
function updateList(incArr) {
  var result = incArr;
  document.getElementById("list").innerHTML = "";
  var olStart = "<ol>";
  var olEnd = "</ol>";
  var liList = "";
  console.log(result);
  for (var i = 0, arrLength = result.length; i < arrLength; i++) {
    var  school = result[i];
    var details = "<ul class=\"details\" id=\"d" + i + "\">" +
                    "<li>" + "Adresse: " +school.address + "</li>" +
                    "<li>" + "Elever: " + school.students + "</li>" +
                    "<li>" + "Kommune: " + school.locality + "</li>" +
                    "<li>" + "Id: " + school._id + "</li>" +
                  "</ul>";

    liList = liList + "<li id=\"" + i + "\" " + "onClick=\"displaySchool(this.id)\"" + ">" + school.school + "<p class=\"arrow\" id=\"a" + i + "\">&#10094;</p>" + "</li> " + details;
  }
  document.getElementById("list").innerHTML = olStart + liList + olEnd;
  prevLiEl = document.getElementById("0");
}


//Gets the search string and adds it to the search object.
//Searches the dataset.
function setSearchStr() {
  searchObj.string = document.getElementById('searchStr').value.toUpperCase();
  console.log(searchObj.string);
  search(datasetArr);
}



//Checks if the search string matches any items from the datasetArr
//If they do they are added to the results and the list is updated.
//also sets the select value back to all.
function search(incArr){
  var array = incArr;
  results = [];
  var select = document.getElementById("sted");
  select.value = "all";

  for (var i = 0, arrLength = array.length; i < arrLength; i++) {
    var school = array[i];
    var schoolName = school.school.toUpperCase();
    var schoolAddr = school.address.toUpperCase();
    f2 = true;
    f3 = true;
    var match = true;
    console.log("looping item: " + i);

      //Uses indexOf to see if the string matches the fields in the searchObj.
      if (schoolName.indexOf(searchObj.string) == -1) {
          f2 = false;
      }
      if (schoolAddr.indexOf(searchObj.string) == -1) {
          f3 = false;
      }
      if (f2 == true || f3 == true) {
        match = true;
      } else {
        match = false;
      }
      if (match == true) {
          results.push(school);
        }
    }
    updateList(results);
  }


//sorts the list alphabetically.
function sortAlphabetically() {
  console.log(results);
  results.sort(function(a, b){
    console.log("sorting");
    if(a.school < b.school) return -1;
    if(a.school > b.school) return 1;
    return 0;
  });
  console.log(results);
  updateList(results);
}


//sorts the list after amount of students, high to low.
function sortStudentically() {
  console.log(results);
  results.sort(function(a, b){
    console.log("sorting");
    console.log(parseInt(a.school) + " : " + parseInt(b.school));
    if(parseInt(a.students, 10) < parseInt(b.students, 10)) return 1;

    if(parseInt(a.students, 10) >parseInt(b.students, 10)) return -1;
    return 0;
  });
  console.log(results);
  updateList(results);
}

//sorts the list after amount of students, low to high.
function sortStudenticallyRising() {
  console.log(results);
  results.sort(function(a, b){
    console.log("sorting");
    console.log(parseInt(a.school) + " : " + parseInt(b.school));
    if(parseInt(a.students, 10) < parseInt(b.students, 10)) return -1;

    if(parseInt(a.students, 10) >parseInt(b.students, 10)) return 1;
    return 0;
  });
  console.log(results);
  updateList(results);
}


//filters list by place
function setPlace(){
  results = [];
  var select_id = document.getElementById("sted");
  var x = select_id.options[select_id.selectedIndex].value;

  if (x == "all") {
    updateList(datasetArr);
    results = datasetArr;
  } else {
    for (var i = 0, arrLength = datasetArr.length; i < arrLength; i++) {
      if(datasetArr[i].locality == x) {
        results.push(datasetArr[i]);
      }
    }
    updateList(results);
  }
}

//creates a sub-list which displays additional info about the school/club selected
function displaySchool(id) {
  var details = document.getElementById("d" + id);
  var arrow = document.getElementById("a" + id);
  if(inspecting.includes(id)) {
    inspecting = inspecting.filter(function(e) { return e != id; });
    details.style.display = "none";
    arrow.style.transform = "rotate(270deg)";
  } else {
    details.style.display = "block";
    inspecting.push(id);
    arrow.style.transform = "rotate(90deg)";
  }
}
