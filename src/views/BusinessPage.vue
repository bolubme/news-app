<template>
  <div>
    <Loader v-if="$store.state.loading" />
    <ListTopic :receivedData="businessNewsData" :totalItems="totalItems" />
  </div> 
  </template>
  
  <script>
  import ListTopic from '../components/ListTopic.vue';
  import Loader from "../components/LoaderPage.vue"
  
  export default {
    name: "BusinessPage",
    components: {
      ListTopic,
      Loader
    },
    data() {
      return {
        businessNewsData: null,
        totalItems: 0, 
      };
    },
    mounted() {
      this.$store.dispatch('setLoading', true);
      this.$emit("sendDataEvent", "business");
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
        if (data && data.business) {
          this.businessNewsData = data.business;
          this.totalItems = this.businessNewsData.length;
        }else{
          this.businessNewsData =[];
          this.totalItems = 0;
        }
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  