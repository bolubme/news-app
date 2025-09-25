<template>
    <div>
        <Loader v-if="$store.state.loading" />
        <ListTopic  :receivedData="lifestyleNewsData" :totalItems="totalItems"/>
    </div>
</template>

<script>
import ListTopic from '../components/ListTopic.vue';
import Loader from "../components/LoaderPage.vue"

export default {
    name: "LifestylePage",
    components: {
      ListTopic,
      Loader
    },
    data() {
      return {
        lifestyleNewsData: null,
        totalItems: 0, 
      };
    },
    mounted() {
      this.$store.dispatch('setLoading', true);
      this.$emit("sendDataEvent", "lifestyle");
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
        if (data && data.lifestyle) {
          this.lifestyleNewsData = data.lifestyle;
          this.totalItems = this.lifestyleNewsData.length;
        }else{
          this.lifestyleNewsData = [];
          this.totalItems = 0;
        }
      },
    },
  };
</script>

<style scoped></style>