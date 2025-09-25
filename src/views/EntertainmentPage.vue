<template>
    <div>
        <Loader v-if="$store.state.loading" />
        <ListTopic :receivedData="entertainmentNewsData" :totalItems="totalItems"/>
    </div>
</template>

<script>
import ListTopic from '../components/ListTopic.vue';
import Loader from "../components/LoaderPage.vue"

export default {
    name: "EntertainmentPage",
    components: {
      ListTopic,
      Loader
    },
    data() {
      return {
        entertainmentNewsData: null,
        totalItems: 0, 
      };
    },
    mounted() {
      this.$store.dispatch('setLoading', true);
      this.$emit("sendDataEvent", "culture");
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
        if (data && data.culture) {
          this.entertainmentNewsData = data.culture;
          this.totalItems = this.entertainmentNewsData.length;
        }else{
          this.entertainmentNewsData = []
          this.totalItems = 0;
        }
      },
    },
  };
</script>

<style scoped>

</style>