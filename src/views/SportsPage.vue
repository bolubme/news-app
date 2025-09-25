<template>
  <div>
    <Loader v-if="$store.state.loading" />
    <ListTopic :receivedData="sportNewsData" :totalItems="totalItems" />
  </div>
</template>

<script>
import ListTopic from '../components/ListTopic.vue';
import Loader from "../components/LoaderPage.vue"

export default {
  name: "SportsPage",
  components: {
    ListTopic,
    Loader
  },
  data() {
    return {
      sportNewsData: null,
      totalItems: 0,
    };
  },
  mounted() {
    this.$store.dispatch('setLoading', true);
    this.$emit("sendDataEvent", "sport");
    this.filterNewsData(this.$store.state.websocketData);
  },
  watch: {
    "$store.state.websocketData"(newValue) {
      this.filterNewsData(newValue);
      this.$store.dispatch('setLoading', false);
    },
  },
  methods: {
    filterNewsData(data) {
      if (data && data.sport) {
        this.sportNewsData = data.sport;
        this.totalItems = this.sportNewsData.length;
      } else {
        this.sportNewsData = [];
        this.totalItems = 0;
      }
    },
  },
};
</script>

<style scoped></style>
