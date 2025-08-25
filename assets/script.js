const contactMeBtn = document.getElementById("contactMeBtn");
const contactMeModal = document.getElementById("contactMeModal");
const contactMeCloseBtn = document.getElementById("contactMeCloseBtn");

fetch("assets/skills.json")
  .then((r) => r.json())
  .then((skills) => {
    const skillsList = document.getElementById("skills-list");
    const futureSkillsList = document.getElementById("future-skills-list");

    skills.current.forEach((skill) => {
      const skillElement = document.createElement("div");

      skillElement.classList.add("skill");
      skillElement.innerHTML = `<img src="${skill.svgDir}" />${skill.name}`;

      skillsList.appendChild(skillElement);
    });

    skills.future.forEach((skill) => {
      const skillElement = document.createElement("div");

      skillElement.classList.add("skill");
      skillElement.innerHTML = `<img src="${skill.svgDir}" />${skill.name}`;

      futureSkillsList.appendChild(skillElement);
    });
  });

fetch("assets/projects.json")
  .then((r) => r.json())
  .then((projects) => {});

contactMeBtn.addEventListener("click", () => {
  contactMeModal.style.display = "flex";
});

contactMeCloseBtn.addEventListener("click", () => {
  contactMeModal.style.display = "none";
});

const wtCards = {
  time: document.getElementById("timeDisplay"),
  date: document.getElementById("dateDisplay"),
  year: document.getElementById("yearDisplay"),
};

fetch("https://timeapi.io/api/timezone/zone?timeZone=Europe%2FHelsinki")
  .then((r) => r.json())
  .then((timeApiR) => {
    let dateObject = new Date(timeApiR.currentLocalTime);

    const copyrightYear = document.getElementById("current-copyright-year");
    copyrightYear.textContent = dateObject.getFullYear();
  });

function updateTime() {
  let dateObject = new Date();
  now = new Date(
    Date.UTC(
      dateObject.getUTCFullYear(),
      dateObject.getUTCMonth(),
      dateObject.getUTCDate(),
      dateObject.getUTCHours() + 3,
      dateObject.getUTCMinutes(),
      dateObject.getUTCSeconds()
    )
  );

  wtCards.time.textContent = `${now
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${now.getUTCMinutes().toString().padStart(2, "0")}:${now
    .getUTCSeconds()
    .toString()
    .padStart(2, "0")}`;

  wtCards.date.textContent = `${now
    .getUTCDate()
    .toString()
    .padStart(2, "0")}/${(now.getUTCMonth() + 1).toString().padStart(2, "0")}`;

  wtCards.year.textContent = `${now.getUTCFullYear()}`;
}

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=60.4518&longitude=22.2486&current=temperature_2m,weather_code&wind_speed_unit=ms"
)
  .then((r) => r.json())
  .then((weather) => {
    const weatherCodeMap = {
      0: "Clear",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    const code = weather.current.weather_code;
    const weatherText =
      `${weatherCodeMap[code]} @ ${weather.current.temperature_2m} °C` ||
      "Unknown";

    const weatherDisplay = document.getElementById("weatherDisplay");
    if (weatherDisplay) {
      weatherDisplay.textContent = weatherText;
    }
  });

updateTime();

setInterval(updateTime, 1000);
