const lat = document.getElementById("lat");
const long = document.getElementById("long");
const nameTZ = document.getElementById("nameTZ");
const offsetSTD = document.getElementById("offsetSTD");
const offsetSTDSeconds = document.getElementById("offsetSTDSeconds");
const offsetDST = document.getElementById("offsetDST");
const offsetDSTSeconds = document.getElementById("offsetDSTSeconds");
const country = document.getElementById("country");
const postcode = document.getElementById("postcode");
const city = document.getElementById("city");
const resultlat = document.getElementById("resultlat");
const resultlong = document.getElementById("resultlong");
const resultnameTZ = document.getElementById("resultnameTZ");
const resultoffsetSTD = document.getElementById("resultoffsetSTD");
const resultoffsetSTDSeconds = document.getElementById(
  "resultoffsetSTDSeconds"
);
const resultoffsetDST = document.getElementById("resultoffsetDST");
const resultoffsetDSTSeconds = document.getElementById(
  "resultoffsetDSTSeconds"
);
const resultcountry = document.getElementById("resultcountry");
const resultpostcode = document.getElementById("resultpostcode");
const resultcity = document.getElementById("resultcity");
const button = document.getElementById("button");
const resultContainer = document.getElementById("resultContainer");
const address = document.getElementById("address");
const errorId = document.getElementById("errorId");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat.innerHTML = position.coords.latitude;
  long.innerHTML = position.coords.longitude;
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=b7093bc26ec7418b91ce92517e047e04`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      nameTZ.innerHTML = data.results[0].timezone.name;
      offsetSTD.innerHTML = data.results[0].timezone.offset_STD;
      offsetSTDSeconds.innerHTML = data.results[0].timezone.offset_STD_seconds;
      offsetDST.innerHTML = data.results[0].timezone.offset_DST;
      offsetDSTSeconds.innerHTML = data.results[0].timezone.offset_DST_seconds;
      country.innerHTML = data.results[0].country;
      postcode.innerHTML = data.results[0].postcode;
      city.innerHTML = data.results[0].state_district;
    });
}

getLocation();

function showResult(e) {
  errorId.innerHTML = "";
  e.preventDefault();
  let inputAddress = address.value;
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${inputAddress}&format=json&apiKey=b7093bc26ec7418b91ce92517e047e04`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resultContainer.style.visibility = "visible";
      resultnameTZ.innerHTML = data.results[0].timezone.name;
      resultlat.innerHTML = data.results[0].lat;
      resultlong.innerHTML = data.results[0].lon;
      resultoffsetSTD.innerHTML = data.results[0].timezone.offset_STD;
      resultoffsetSTDSeconds.innerHTML =
        data.results[0].timezone.offset_STD_seconds;
      resultoffsetDST.innerHTML = data.results[0].timezone.offset_DST;
      resultoffsetDSTSeconds.innerHTML =
        data.results[0].timezone.offset_DST_seconds;
      resultcountry.innerHTML = data.results[0].country;
      resultpostcode.innerHTML = data.results[1].postcode;
      resultcity.innerHTML = data.results[2].city;
    })
    .catch((error) => {
      console.log("error");
      errorId.style.visibility = "visible";
      resultContainer.style.visibility = "hidden";
      errorId.innerHTML = "Timezone could not be found!";
    });
}

button.addEventListener("click", showResult);
