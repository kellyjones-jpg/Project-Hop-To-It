var map;
var la = 39.7392
var ln = -104.9903
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

var initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: la, lng: ln },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: { lat: la, lng: ln },
    map: map
  });
}

$("#myBtn").on("click", function () {
  la = parseFloat($(this).attr("h"), 10);
  ln = parseFloat($(this).attr("v"), 10);
  (document.getElementById("map")).style.display = "block";
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: la, lng: ln },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: { lat: la, lng: ln },
    map: map
  });
});

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

////////////////////////beer api/////////////////////////

$("#search").on('click', function () {
  event.preventDefault();
  // console.log("button was clicked");

  var cityInput = $('#search-input').val();
  // cityInput = cityInput.split(' ');
  // cityInput = cityInput.join('-');
  console.log("city input: " + cityInput);


  var APIkey = "cd3220993a88c09168f7e658ad27b100";
  var breweryQuery = "http://beermapping.com/webservice/loccity/" + APIkey + "/" + cityInput + "&s=json";
  var mapQuery = "https://beermapping.com/?lat=41.91034&lon=-87.67597&z=5"

  //call brewery API
  $.ajax({
    url: breweryQuery,
    method: "GET"
  }).then(function (response) {

    for (var i = 0; i < 20; i++) {

      //get random brewery
      var rb = response[Math.floor(Math.random() * response.length)];

      //random brewery address
      var rbAddress = (rb.street + " " + rb.city + " " + rb.state);

      //random brewery website
      var URLstring = ""
      var URLstring = JSON.stringify(rb.url);
      var newURLstring = URLstring.substring(1, URLstring.length);
      var rbURL = 'https://' + newURLstring;

      //  $("<div>", {id: 'foo', class: 'a', }).appendTo("#box");
      if (i % 2 == 0) {
        var newDiv = $("<div>", { class: "styledDiv" });
      }
      else {
        var newDiv = $("<div>", { class: "antiStyledDiv" });
      }

      var newH = $("<h4>", { class: "header" }).text(rb.name);
      var newA = $("<a>", { target: "_blank", href: rbURL, class: "link" }).text("visit website");
      var newP = $("<p>", { class: "paragraph" }).text(rbAddress + " | ");
      newP.append(newA);

      newDiv.append(newH, newP);
      $("#brewery-list").append(newDiv);


      //console log random brewery info
      console.log("Name: " + rb.name + " | URL: " + rb.url + " | Address: " + rbAddress);


      //  $("#brewery-list").append(rb.name + "<br>" + rbAddress + " | " + rbURL + "<br>");

      /////////////////////////////google geocoding API////////////////////
      googleAPIkey = "AIzaSyAP6OXI1t3xgoiRrS2RrYY-pmOjKYFnyNU"
      geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View+CA&key=" + googleAPIkey;

      rbAddress = rbAddress.split(' ');
      rbAddress = rbAddress.join('+');
      console.log("hopefully this worked+++++++++: " + rbAddress)
      breweryGeocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + rbAddress + "&key=" + googleAPIkey;

      console.log(geocodeURL);

      $.ajax({
        url: breweryGeocodeURL,
        method: "GET"
      }).then(function (response) {
        console.log("google geocode api working: " + breweryGeocodeURL);



      });



    }

  });

});