<template>
    <div>
      <Loader v-if="$store.state.loading" />
      <ListTopic  :receivedData="politicsNewsData" :totalItems="totalItems"/>
    </div>
  </template>

<script>
import ListTopic from '../components/ListTopic.vue';
import Loader from "../components/LoaderPage.vue"

export default {
    name: "PoliticsPage",
    components: {
      ListTopic,
      Loader
    },
    data() {
      return {
        politicsNewsData: null,
        totalItems: 0,
      };
    },
    mounted() {
      this.$store.dispatch('setLoading', true);
      this.$emit("sendDataEvent", "politics");
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
        if (data && data.politics) {
          this.politicsNewsData = data.politics;
          this.totalItems = this.politicsNewsData.length;
        }else{
          this.politicsNewsData = [];
          this.totalItems = 0;
        }
      },
    },
  };
</script>
  
  <style scoped>
  </style>
  