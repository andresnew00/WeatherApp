window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescrition = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/42ab23e15a09c11608f9932cc052fb63/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary} = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescrition.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
    });
  }
});
