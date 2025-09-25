<template>
  <div v-if="newsObj != null">
    <div class="container">
      <button @click="goBack" class="back-button">
        <i class="fa fa-arrow-left"></i>
      </button>
      <div class="header-main-image">
        <img :src="newsObj.imageLink" alt="No image" />
      </div>
    </div>
    <div class="container header-single">
      <div class="row">
        <div class="col-lg-11">
          <h1 class="mainHeader">{{ newsObj.headline }}</h1>
        </div>
        <div class="col-lg-1">
          <div class="icon-button">
            <!-- Play button -->
            <a v-if="!isPlaying" @click="playAudio(newsObj.audioUrl)"
              ><i class="fa fa-play"></i
            ></a>
            <!-- Pause button -->
            <a v-if="isPlaying" @click="pauseAudio"
              ><i class="fa fa-pause"></i
            ></a>
          </div>
          <audio ref="audioPlayer"></audio>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="container-date">
            <span class="date">Summary</span>
            <hr class="separator" />
          </div>
        </div>
        <div class="col-lg-8 text-summary">
          <div class="articleText">
            {{ newsObj.newsSummary }}
          </div>
          <hr class="text-seperator" />
          <div class="source-container">
            <img class="news-logo" :src="newsObj.logoLink" alt="News Logo" />
            <span class="news-name">{{
              capitalizeFirstLetter(newsObj.newsSource)
            }}</span>
            <span class="mainNewsLink"
              ><a :href="newsObj.headlineLink">Main Article Link</a></span
            >
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>

    <div class="container-fluid related-post">
      <div class="container">
        <h5 class="related-post-header">
          
        </h5>
      </div>
    </div>
    <FooterLayer />
  </div>
</template>

<script>
import FooterLayer from "../components/FooterLayer.vue";

export default {
  name: "SinglePage",
  components: {
    FooterLayer,
  },
  data() {
    return {
      newsData: null,
      mainId: null,
      combinedData: [],
      newsObj: null,
      relatedPost: [],
      isPlaying: false,
    };
  },
  mounted() {
    this.newsData = this.$store.state.websocketData;
    this.mainId = this.$route.params.id;

    // Filter newsData based on the received ID
    this.scrollToTop();
    this.joinData();
    this.filterData();
  },
  watch: {
    "$store.state.websocketData"(newValue) {
      this.newsData = newValue;
      this.joinData();
      this.filterData();
    },

    $route() {
      this.scrollToTop();
    },
  },
  methods: {
    // Function to play audio
    playAudio(audioUrl) {
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.src = audioUrl;
      audioPlayer.play();
      this.isPlaying = true;
    },

    // Function to pause audio
    pauseAudio() {
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.pause();
      this.isPlaying = false;
    },

    joinData() {
      if (this.newsData && this.mainId) {
        for (const category in this.newsData) {
          this.combinedData.push(...this.newsData[category]);
        }
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    filterData() {
      if (this.combinedData.length > 1 && this.mainId) {
        this.newsObj = this.combinedData.filter(
          (item) => item.id === this.mainId
        )[0];
      }
    },

    getFirst15Words(article) {
      const words = article.split(" ");
      const first15Words = words.slice(0, 15).join(" ");
      return first15Words;
    },

    scrollToTop() {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-bottom: 9px;
  background-color: white;
}

.back-button i {
  font-size: 20px;
}

.back-button:hover {
  cursor: pointer;
  color: #fab300;
}

.mainHeader {
  font-family: Garamond, serif;
  color: black;
  font-size: 25px;
}

.header-main-image {
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.header-main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.icon-button i {
  color: black;
  border: 1px solid black;
  background-color: #fff;
  display: inline-block;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 16px;
}

.icon-button i:hover {
  color: black;
  background-color: #fab300;
}

.header-single {
  margin-top: 40px;
  margin-bottom: 20px;
}

.date {
  padding-right: 40px;
}

.container-date {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.separator {
  border: none;
  border-top: 1px solid black;
  display: block;
  width: 100%;
  margin: 5px 0;
}

.text-seperator {
  margin-top: 90px;
  border: none;
  border-bottom: 1px solid rgb(223, 223, 223);
}

.source-container {
  margin-top: 50px;
}

.news-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.mainNewsLink a {
  color: black;
  padding-left: 20px;
  font-size: 15px;
}

.articleText {
  font-family: Garamond, serif;
}

.news-name {
  font-family: Garamond, serif;
  padding-left: 5px;
  font-size: 15px;
  color: rgb(68, 68, 68);
}

/* 
---------------------------------------------
Related post section
--------------------------------------------- 
*/

.related-post {
  margin-top: 40px;
  height: 100px;
  background-color: rgb(251, 251, 251);
}

* {
  text-align: left;
}

.related-post-header {
  font-size: 18px;
  font-weight: bold;
  font-family: Garamond, serif;
  padding-top: 30px;
}
</style>
