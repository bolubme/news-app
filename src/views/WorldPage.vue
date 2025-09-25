<template>
  <div>
    <Loader v-if="$store.state.loading" />
    <ListTopic  :receivedData="worldNewsData" :totalItems="totalItems"/>
  </div>
</template>

<script>
import ListTopic from '../components/ListTopic.vue';
import Loader from "../components/LoaderPage.vue"

export default {
    name: "WorldPage",
    components: {
      ListTopic,
      Loader
    },
    data() {
      return {
        worldNewsData: null,
        totalItems: 0, 
      };
    },
    mounted() {
      this.$store.dispatch('setLoading', true);
      this.$emit("sendDataEvent", "world");
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
        if (data && data.world) {
          this.worldNewsData = data.world;
          this.totalItems = this.worldNewsData.length;
        }else{
          this.worldNewsData = [];
          this.totalItems = 0;
        }
      },
    },
  };
</script>

<style scoped>

</style>