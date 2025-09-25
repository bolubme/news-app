<template v-if="newData.length > 0">
  <div>
    <!-- Carousel Section -->
    <div v-if="carouselData.length > 0" class="carousel-section">
      <h1 class="mainHeader">
        {{ capitalizeFirstLetter(carouselData[0].newsCategory) }}
      </h1>
      <div class="container">
        <div class="main-first-container">
          <img
            class="background-image"
            :src="carouselData[0].imageLink"
            alt="Background Image"
          />
          <div class="news-header">
            <h2 class="news-headline">
              <router-link
                class="whiteColor py-1"
                :to="{ name: 'single-page', params: { id: carouselData[0].id } }"
              >
                {{ carouselData[0].headline }}
              </router-link>
            </h2>
            <img
              class="news-logo"
              :src="carouselData[0].logoLink"
              alt="News Logo"
            />
            <span class="news-name">{{ carouselData[0].newsSource }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Topics Section -->
    <div class="container-news">
      <div class="properties section">
        <div class="container">
          <div class="section-heading">
            <h1>Popular topics</h1>
          </div>
          <div class="row no-gutters">
            <div
              class="col-lg-3 col-md-6 col-sm-1"
              v-for="(newsItem, index) in filteredData"
              :key="index"
            >
              <div class="item">
                <div class="img-main-news">
                  <img :src="newsItem.imageLink" alt="" />
                </div>
                <div class="main-text-container">
                  <h4>
                    <router-link
                      class="py-1"
                      :to="{
                        name: 'single-page',
                        params: { id: newsItem.id },
                      }"
                      >{{ newsItem.headline }}</router-link
                    >
                  </h4>
                  <p class="popularTextsmall">
                    {{ getFirst15Words(newsItem.newsSummary) }}
                  </p>
                  <div class="center-line"></div>
                  <div class="news-main-image-container">
                    <img
                      :src="newsItem.logoLink"
                      :alt="newsItem.newsSource"
                      class="circle-img"
                    />
                    <p>{{ newsItem.newsSource }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Section -->
    <div class="center-pagination">
      <CustomPagination
        :total="totalItems"
        :current="currentPage"
        @page-change="handlePageChange"
      />
    </div>

  </div>
</template>

<script>
import CustomPagination from "../components/CustomPagination.vue";

export default {
  name: "ListTopic",
  props: {
    receivedData: {
      type: Array,
      default: null,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  components: {
    CustomPagination,
  },
  data() {
    return {
      originalData: null,
      newData: null,
      currentPage: 1,
      itemsPerPage: 8,
      header: "",
      carouselData: [],
    };
  },
  mounted() {
    this.myFunction();
  },
  watch: {
    receivedData: {
      handler(newVal) {
        this.originalData = newVal;
        this.sortData()
        this.myFunction();
      },
      immediate: true,
    },
  },
  methods: {
    myFunction() {
      if (this.originalData !== null && this.originalData.length > 0) {
        this.carouselData.push(this.originalData[this.originalData.length - 1]);
      }
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getFirst15Words(article) {
      const words = article.split(" ");
      const first15Words = words.slice(0, 15).join(" ");
      return first15Words;
    },

    handlePageChange(page) {
      this.currentPage = page;
    },
    sortData() {
      if (!this.originalData) {
        return; // Exit if originalData is null or undefined
      }
      this.newData = [...this.originalData].sort(() => Math.random() - 0.5);
    },
  },
  computed: {
    filteredData() {
      if (!this.newData) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Slice the sorted newData array for the current page
      const slicedData = this.newData.slice(startIndex, endIndex);
      return slicedData;
    },
  },
};
</script>

<style scoped>

.mainHeader {
  margin-top: 45px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  color: black;
}
.center-pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.row.no-gutters [class*="col-"] {
  padding-right: 7px;
  padding-left: 7px;
}

.main-first-container {
  position: relative;
  height: 500px;
  overflow: hidden;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3)
  );
  box-shadow: 0px 0 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.news-header{
  text-align: left;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  color: white;
  padding: 30px;
}

.news-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.news-headline {
  margin-bottom: 14px;
  font-size: 30px;
  font-weight: bold;
}

.whiteColor {
  color: white;
}

.news-name {
  font-weight: 500;
}

/* Popular topics Style */

.popularHeader {
  text-align: left;
}
.container-news {
  margin-top: 30px;
}

.section-heading {
  margin-bottom: 30px;
  text-align: left;
}

.section-heading h1 {
  font-family: Garamond, serif;
  font-weight: bolder;
  font-size: 27px;
  color: rgb(60, 60, 60);
}

.img-main-news {
  width: 260px;
  height: 260px;
  border-radius: 5px;
}

.img-main-news img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.properties .item {
  text-align: left;
  border-radius: 10px;
  margin-bottom: 30px;
}

.center-line {
  border: 0.1px solid rgb(240, 240, 240);
}

.main-text-container {
  padding: 5px;
  padding-top: 0px;
}
.properties .item span.category {
  background-color: #fbd9cf;
  font-weight: 500;
  border-radius: 5px;
  font-size: 14px;
  color: #1e1e1e;
  padding: 5px 12px;
  display: inline-block;
  margin-top: 25px;
}

.properties .item h4 {
  font-family: Georgia;
  font-size: 17px;
  font-weight: bold;
  line-height: 23px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
}

.properties .item h4 a{
  color: rgb(60, 60, 60);
}

.popularTextsmall{
  font-size: 13px;
  font-family: Georgia;
}

.news-main-image-container {
  display: flex;
  align-items: center;
}

.circle-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 10px;
}

.news-main-image-container{
  margin-top: 12px;
}

.news-main-image-container p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  /* line-height: 50px; */
}

/* Responsive Styles */

@media only screen and (max-width: 768px) {
  .mainHeader {
    font-size: 10cm;
  }

  .container-news .col-lg-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media only screen and (max-width: 576px) {
  .mainHeader {
    font-size: 25px;
  }

  .img-main-news {
  width: 100%;
}

  .news-headline{
    font-size: 25px;
  }

  .news-header{
    width: 100%;
  }

  .carousel-section {
    text-align: center;
  }

  .container-news .col-lg-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

</style>
