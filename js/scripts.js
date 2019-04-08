// Business Logic for AddressBook ---------
function LocationList() {
  this.places = [],
  this.currentId = 0
}

LocationList.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}

LocationList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

LocationList.prototype.findPlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        return this.places[i];
      }
    }
  };
  return false;
}

LocationList.prototype.deletePlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        delete this.places[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Place(name, date,landmarks) {
  this.name = name,
  this.date = date,
  this.landmarks = landmarks
}

// User Interface Logic ---------
var placesList = new LocationList();

function displayLocationDetails(locationToDisplay) {
  var locationsList = $("ul#place");
  var htmlForLocation = "";
  locationToDisplay.places.forEach(function(place) {
    htmlForLocation += "<li id=" + place.id + ">" + place.name + "</li>";
  });
  locationsList.html(htmlForLocation);
};

function showPlaceInfo(id) {
  var place = placesList.findPlace(id);
  $("#show-contact").show();
  $(".field1").html(place.name);
  $(".field2").html(place.date);
  $(".field3").html(place.landmarks);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + id + ">Delete</button>");
}

function attachListeners() {
  $("ul#place").on("click", "li", function() {
    showPlaceInfo(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    placesList.deletePlace(this.id);
    $("#show-contact").hide();
    displayLocationDetails(placesList);
  });
};

$(document).ready(function() {
  attachListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var arr = [];
    for(var i = 1;i<=3;i++)
    {
      arr.push($("input#field"+i).val());
      $("input#field"+i).val("");
    }
    var newPlace = new Place(arr[0], arr[1], arr[2]);
    placesList.addPlace(newPlace);
    displayLocationDetails(placesList);
  })
})
