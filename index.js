const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetail = document.querySelector(".weatherDetail");
const error404 = document.querySelector(".notFound");

search.addEventListener("click", () => {
  const apiKey = "b219b2be2f26d63207d4fe3c1a4adb06";
  const city = document.querySelector(".searchBox input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetail.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weatherBox img");
      const temperature = document.querySelector(".weatherBox .temperature");
      const description = document.querySelector(".weatherBox .description");
      const humidity = document.querySelector(".weatherDetail .humidity span");
      const wind = document.querySelector(".weatherDetail .wind span"); // Corrected selector

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${
        parseInt(json.main.temp) - 273
      }<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      let currentTempCelsius = null; // เก็บค่าอุณหภูมิในหน่วยเซลเซียส

      const updateTemperature = (unit) => {
        let temperature;
        switch (unit) {
          case "C":
            temperature = currentTempCelsius;
            break;
          case "F":
            temperature = (currentTempCelsius * 9) / 5 + 32;
            break;
          case "K":
            temperature = currentTempCelsius + 273;
            break;
        }
        document.querySelector(
          ".weatherBox .temperature"
        ).innerHTML = `${parseInt(temperature)}<span>°${unit}</span>`;
      };

      // เพิ่ม Event Listener ให้ปุ่มต่างๆ
      document
        .getElementById("celsius")
        .addEventListener("click", () => updateTemperature("C"));
      document
        .getElementById("fahrenheit")
        .addEventListener("click", () => updateTemperature("F"));
      document
        .getElementById("kelvin")
        .addEventListener("click", () => updateTemperature("K"));

      // ในส่วนที่คุณรับข้อมูล JSON และแสดงผลอุณหภูมิ ให้เพิ่มโค้ดนี้:
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((json) => {
          currentTempCelsius = parseInt(json.main.temp) - 273; // แปลงจากเคลวินเป็นเซลเซียส
          updateTemperature("C"); // แสดงผลในหน่วยเซลเซียสโดยเริ่มต้น
          // โค้ดที่เหลือ...
        });

      weatherBox.style.display = "";
      weatherDetail.style.display = ""; // Corrected typo
      weatherBox.classList.add("fadeIn");
      weatherDetail.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
