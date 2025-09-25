<template>
  <div id="app">
    <MenuTop />
    <TopBar />
    <NavBar />
    <OfflineComponent v-if="!isOnline && showOfflineComponent" />
    <router-view @sendDataEvent="handleSendDataEvent" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import MenuTop from "./components/MenuTop.vue";
import TopBar from "./components/TopBar.vue";
import OfflineComponent from "./components/OfflineComponent.vue";

export default {
  name: "App",
  components: {
    MenuTop,
    TopBar,
    NavBar,
    OfflineComponent,
  },
  data() {
    return {
      isOnline: navigator.onLine,
      showOfflineComponent: false
    };
  },
  methods: {
    setupWebSocket() {
      let connection = new WebSocket(
        "wss://odk3tx2276.execute-api.us-east-1.amazonaws.com/production/"
      );

      // Log connected response
      connection.onopen = (event) => {
        console.log("Connected: " + JSON.stringify(event));
      };

      // Output messages from the server
      connection.onmessage = (msg) => {
        console.log("Message received. : " + JSON.stringify(msg));

        const data = JSON.parse(msg.data);

        // Handle data received from WebSocket server and emit/pass it to other components
        this.$store.dispatch("updateWebsocketData", data);
      };

      // Log errors
      connection.onerror = (error) => {
        console.log("WebSocket Error: " + JSON.stringify(error));
      };

      return connection;
    },

    handleOnlineStatusChange() {
      this.isOnline = navigator.onLine;
      if (!this.isOnline) {
        // If offline, set a timeout to show the OfflineComponent after 10 seconds
        setTimeout(() => {
          this.showOfflineComponent = true;
        }, 10000);
      } else {
        // If online, hide the OfflineComponent
        this.showOfflineComponent = false;

      }
    },

    handleSendDataEvent(category) {
      let connection = this.setupWebSocket();

      // Check if the WebSocket connection is already open
      if (connection.readyState === WebSocket.OPEN) {
        // If the connection is already open, send the data
        this.sendData(connection, category);
      } else {
        // If the connection is not open, wait for it to open
        connection.onopen = () => {
          this.sendData(connection, category);
        };
      }
    },

    // Send message to server
    sendData(connection, category) {
      // Check if the WebSocket connection is open
      if (connection.readyState === WebSocket.OPEN) {
        // Create message to be sent to server
        let msgObject = {
          action: "getNewData",
          category: category,
          data: "",
        };

        // Send message
        connection.send(JSON.stringify(msgObject));

        // Log result
        console.log("Message sent: " + JSON.stringify(msgObject));
      } else {
        console.error("WebSocket connection is not open.");
      }
    },
  },
  mounted() {
    if (window.location.pathname === "/index.html") {
      window.location.replace("/");
    }
    window.addEventListener("online", this.handleOnlineStatusChange);
    window.addEventListener("offline", this.handleOnlineStatusChange);
  },

  beforeUnmount() {
    // Remove event listeners before component unmounts
    window.removeEventListener("online", this.handleOnlineStatusChange);
    window.removeEventListener("offline", this.handleOnlineStatusChange);
  },

  created: function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
