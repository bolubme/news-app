<template>
  <div>
    <Loader v-if="$store.state.loading" />
    <div class="container-slider" v-if="newsData && carouselData.length > 0">
      <div class="row-slider">
        <div class="col-slider">
          <div class="carousel">
            <div
              id="carouselExampleSlidesOnly"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  v-for="(item, index) in carouselData"
                  :key="index"
                  :class="{ 'carousel-item': true, active: index === 0 }"
                >
                  <img
                    :src="item.imageLink"
                    class="d-block w-100"
                    :alt="'Slide ' + index"
                  />
                  <div class="overlay">
                    <div class="textOverlay">
                      <div class="mb-1">
                        <button class="text-black overlayBtn">
                          {{ item.newsCategory }}
                        </button>
                      </div>
                      <router-link style="color: white;" class="h2 m-0 text-black font-weight-bold carouselHeader"
                    :to="{ name: 'single-page', params: { id: item.id } }"
                    >{{ item.headline }}</router-link
                  >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-news" v-if="newsData && latestNewsData.length > 0">
      <div class="properties section">
        <div class="container">
          <div class="section-heading">
            <h1>Latest News</h1>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-12"
              v-for="(newsItem, index) in latestNewsData"
              :key="index"
            >
              <div class="item">
                <div class="img-main-news">
                  <img :src="newsItem.imageLink" alt="" />
                </div>
                <div class="news-main-container-type">
                  <span class="category">{{ newsItem.newsCategory }}</span>
                </div>
                <h4>
                  <router-link
                    :to="{ name: 'single-page', params: { id: newsItem.id } }"
                    >{{ newsItem.headline }}</router-link
                  >
                </h4>
                <div class="news-main-image-container">
                  <img :src="newsItem.logoLink" alt="Icon" class="circle-img" />
                  <p>{{ capitalizeFirstLetter(newsItem.newsSource) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dont-miss-container">
      <div class="container-fluid pb-4 pt-4 paddding">
        <div class="container paddding">
          <div class="row mx-0">
            <div class="col-md-8" v-if="newsData && dontMissData.length > 0">
              <div>
                <div class="dont_miss_heading py-2 mb-4">Dont miss</div>
              </div>
              <div
                class="row pb-4"
                v-for="(missItem, index) in dontMissData"
                :key="index"
              >
                <div class="col-md-5">
                  <div class="dont_miss_news_img">
                    <div class="dont_miss_main_image">
                      <img :src="missItem.imageLink" alt="Image" />
                    </div>
                    <div></div>
                  </div>
                </div>
                <div class="col-md-7 dont_miss_all_text">
                  <router-link
                    class="dont_miss_headline_news py-1"
                    :to="{ name: 'single-page', params: { id: missItem.id } }"
                    >{{ missItem.headline }}</router-link
                  >

                  <div class="dont_miss_part_news">
                    {{ getFirst30Words(missItem.newsSummary) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3" v-if="mostPopularData.length > 0">
              <div>
                <div class="dont_miss_heading pt-2 py-2 mb-4">Most Popular</div>
              </div>
              <div
                class="row pb-3"
                v-for="(popularItem, index) in mostPopularData"
                :key="index"
              >
                <div class="col-5 align-self-center">
                  <img
                    :src="popularItem.imageLink"
                    alt="img"
                    class="news_most_trending"
                  />
                </div>
                <div class="col-7 paddding dont_miss_all_text">
                  <div class="news_most_trending_main_text">
                    <router-link
                      class="news_most_trending_main_text"
                      :to="{
                        name: 'single-page',
                        params: { id: popularItem.id },
                      }"
                      >{{ popularItem.headline }}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/LoaderPage.vue";

export default {
  name: "HomePage",
  components: {
    Loader,
  },
  data() {
    return {
      newsData: null,
      carouselData: [],
      latestNewsData: [],
      dontMissData: [],
      mostPopularData: [],
      chatData: [],
    };
  },
  mounted() {
    this.$store.dispatch("setLoading", true);
    this.$emit("sendDataEvent", "all");
    this.newsData = this.$store.state.websocketData;
    if (this.newsData) {
      this.myFunction();
    }
  },
  watch: {
    "$store.state.websocketData"(newValue) {
      if (newValue) {
        this.newsData = newValue;
        this.myFunction();
        this.$store.dispatch("setLoading", false);
      }
    },
  },
  methods: {

    resetDataArrays() {
      this.carouselData = [];
      this.latestNewsData = [];
      this.dontMissData = [];
      this.mostPopularData = [];
    },
    myFunction() {
      this.resetDataArrays();
      if (!this.newsData) {
        console.error("newsData is null or undefined.");
        return;
      }
      if (this.newsData !== null) {
        if (this.newsData.business && this.newsData.business.length > 0) {
          this.carouselData.push(this.newsData.business[0]);
        }
        if (this.newsData.politics && this.newsData.politics.length > 1) {
          this.carouselData.push(this.newsData.politics[1]);
        }
        if (this.newsData.sport && this.newsData.sport.length > 1) {
          this.carouselData.push(this.newsData.sport[1]);
        }

        // Data for LatestNews
        if (this.newsData.business && this.newsData.business.length > 3) {
          this.latestNewsData.push(this.newsData.business[3]);
        }
        if (this.newsData.sport && this.newsData.sport.length > 1) {
          this.latestNewsData.push(this.newsData.sport[1]);
          this.latestNewsData.push(this.newsData.sport[5]);
        }
        if (this.newsData.culture && this.newsData.culture.length > 2) {
          this.latestNewsData.push(this.newsData.culture[2]);
        }
        if (this.newsData.lifestyle && this.newsData.lifestyle.length > 4) {
          this.latestNewsData.push(this.newsData.lifestyle[4]);
          this.latestNewsData.push(this.newsData.lifestyle[2]);
        }

        // Data for DontMiss
        if (this.newsData.business && this.newsData.business.length > 5) {
          this.dontMissData.push(this.newsData.business[6]);
        }
        if (this.newsData.sport && this.newsData.sport.length > 5) {
          this.dontMissData.push(this.newsData.sport[6]);
        }
        if (this.newsData.politics && this.newsData.politics.length > 5) {
          this.dontMissData.push(this.newsData.politics[5]);
        }

        // Data most popular
        if (this.newsData.business && this.newsData.business.length > 5) {
          this.mostPopularData.push(this.newsData.business[5]);
          this.mostPopularData.push(this.newsData.business[4]);
        }
        if (this.newsData.sport && this.newsData.sport.length > 5) {
          this.mostPopularData.push(this.newsData.sport[7]);
          this.mostPopularData.push(this.newsData.sport[4]);
        }
        if (this.newsData.culture && this.newsData.culture.length > 5) {
          this.mostPopularData.push(this.newsData.culture[4]);
        }
        if (this.newsData.world && this.newsData.world.length > 1) {
          this.mostPopularData.push(this.newsData.world[1]);
        }
        if (this.newsData.politics && this.newsData.politics.length > 2) {
          this.mostPopularData.push(this.newsData.politics[2]);
        }
        if (this.newsData.lifestyle && this.newsData.lifestyle.length > 5) {
          this.mostPopularData.push(this.newsData.lifestyle[6]);
        }
      } else {
        console.error("newsData is not an object or is null/undefined.");
      }
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    timestampToTime(timestamp) {
      const milliseconds = Math.floor(timestamp / 1000000);
      const date = new Date(milliseconds);
      const formattedTime = date.toLocaleTimeString("en-US");
      return formattedTime;
    },

    getFirst30Words(article) {
      const words = article.split(" ");
      const first15Words = words.slice(0, 50).join(" ");
      return first15Words;
    },
  },
};
</script>

<style scoped>
.overlay {
  text-align: left;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  color: white;
}

.textOverlay {
  width: 40%;
  padding: 5px;
}

.overlayBtn {
  border: none;
  background: rgba(218, 213, 213, 0.3);
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 9px;
  color: white;
}

.container-slider {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.row-slider {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-slider {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

/* 
---------------------------------------------
Latest Style
--------------------------------------------- 
*/
.section-heading h1 {
  font-family: Garamond, serif;
  font-weight: bolder;
  font-size: 27px;
  color: rgb(60, 60, 60);
}

.container-news {
  text-align: left;
  margin-top: 40px;
  margin-left: 5%;
  margin-right: 5%;
}

.dont-miss-container {
  margin-left: 5%;
  margin-right: 0px;
}


.img-main-news {
  width: 100%;
  height: 200px;
}

.img-main-news img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.properties .item {
  /* background-color: #fafafa; */
  border: 1px solid rgb(248, 248, 248);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
}

.properties .item img {
  border-radius: 10px;
}

.news-main-container-type {
  display: flex;
  align-items: center;
}

.properties .item span.category {
  background: rgba(218, 213, 213, 0.3);
  font-weight: 500;
  border-radius: 10px;
  font-size: 14px;
  color: #0041b9;
  padding: 3px 12px;
  display: inline-block;
  margin-top: 20px;
}

.properties .item h4 {
  font-size: 19px;
  margin: 12px 0px;
  font-weight: bolder;
  display: flex;
  align-items: center;
}

.properties .item h4 a {
  color: #1e1e1e;
}

.properties .item h4 a:hover {
  color: #fab300;
}

.news-main-image-container {
  display: flex;
  align-items: center;
}

.circle-img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 10px;
}

.news-main-image-container p {
  margin: 0;
  line-height: 50px;
}

/* 
---------------------------------------------
Dont miss & Popular section
--------------------------------------------- 
*/
.dont_miss_heading {
  font-family: Garamond, serif;
  text-align: left;
  font-size: 20px;
  color: #424040;
  border-bottom: 1px solid #fab300;
}

.news_most_trending {
  height: 60px;
  width: 100%;
}

.news_most_trending_main_text {
  font-size: 13px;
  color: #535353;
}

.paddding {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.dont_miss_news_img:hover > .dont_miss_main_image {
  cursor: pointer;
}

.dont_miss_main_image {
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  top: 0;
}

.dont_miss_main_image > img {
  height: 260px;
  min-width: 100%;
}

.dont_miss_headline_news {
  font-size: 20px;
  color: #222 !important;
  font-weight: 800;
  line-height: 0;
}

.dont_miss_all_text {
  text-align: left;
  margin-top: 10px;
}

.dont_miss_part_news {
  font-size: 14px;
  color: #777;
}

/* 
---------------------------------------------
Chat section
--------------------------------------------- 
*/

.chat-container {
  border-radius: 1%;
  height: 320px;
  position: relative;
  font-family: Arial;
  overflow: hidden;
}

.chat-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.26);
}

.chat-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
}

.chat-text-block {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  z-index: 2;
  padding-left: 10px;
  padding-right: 10px;
}

@media only screen and (max-width: 576px) {
  .textOverlay {
    width: 100%;
  }

  .overlay {
    font-size: 10px;
  }

  .carouselHeader {
    font-size: 24px;
  }
}

@media (min-width: 576px) {
  .container-slider {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container-slider {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container-slider {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container-slider {
    max-width: 1140px;
  }
}
</style>
