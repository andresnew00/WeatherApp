window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescrition = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  var mykey = config.MY_KEY;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api =
        `${proxy}https://api.darksky.net/forecast/` + mykey + `/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescrition.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for Celsius
          let celsius = (temperature - 32 * (5 / 9));
          // Set icon
          setIcons(icon, document.querySelector(".icon"));
          //Celsius / Farenheit Change
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
