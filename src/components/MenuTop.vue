<template>
  <div class="top-menu-weather-container">
    <div class="container">
      <div class="top-menu-weather">
        <div class="date-time">
          <span id="current-date">{{ currentDate }}</span>
          <span id="current-time">{{ currentTime }}</span>
        </div>
        <div class="btn-weather">Weather</div>
        <div class="weather-info">
          <span id="weather-icon"></span>
          <span id="temperature">{{ temperature }}</span>
          <span v-if="userLocation" id="location">{{ userLocation }}</span>
          <img :src="weatherIcon" alt="Weather Icon">
          <span id="weather-description">{{ weatherDescription }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuTop",
  data() {
    return {
      weatherIcon: "",
      temperature: "",
      weatherDescription: "",
      currentDate: "",
      currentTime: "",
      userLocation: "",
    };
  },
  mounted() {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = "7447931e84cedd16602f9acd573a3331";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        // Fetch weather data
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            this.weatherDescription = data.weather[0].description;
            this.temperature = `${data.main.temp}°C`;
          })
          .catch((error) => console.log("Error fetching weather data:", error));
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }

    this.updateTime();
    setInterval(this.updateTime, 1000);
  },

  methods: {
    updateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      this.currentDate = now.toLocaleDateString("en-US", options);
      this.currentTime = now.toLocaleTimeString("en-US");
    },
  },
};
</script>
<style scoped>
.top-menu-weather-container {
  display: flex;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0px 1px 10px rgba(246, 80, 80, 0.15);
}

.top-menu-weather {
  display: flex;
  align-items: center;
  justify-content: left;
}

.weather-info,
.date-time {
  display: flex;
  align-items: center;
  font-size: 15px;
}

#current-date {
  padding-left: 10px;
}

#current-time {
  padding-left: 10px;
}

.weather-info span {
  font-weight: bold;
  padding-left: 5px;
}

.btn-weather {
  padding: 14px;
  background-color: black;
  color: white;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 20px;
}

.container {
  padding-left: 0px;
  padding-right: 0px;
}

/* Responsive Styles */
@media only screen and (max-width: 768px) {
  .top-menu-weather {
    justify-content: center;
  }

  .date-time {
    display: none;
  }

  .weather-info {
    justify-content: center;
  }
}

@media only screen and (max-width: 576px) {
  .btn-weather {
    margin-left: 10px;
    padding: 9px;
    margin-right: 5px;
  margin-left: 5px;
  font-size: 11px;
  }

  .weather-info, .date-time{
      font-size: 13px;
  }

  .breaking-news-text-top{
    font-size: 13px;
  }
}
</style>
