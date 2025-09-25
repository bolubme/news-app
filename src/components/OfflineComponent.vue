<template>
  <div class="main-container">
  <div class="offline-message">
    <h1>Oops!</h1>
    <p>It looks like you're offline.</p>
    <p>Please check your internet connection and try again.</p>
  </div>
</div>
</template>

<script>
export default {
  name: "OfflineComponent",
};
</script>

<style scoped>

.main-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #fab300;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offline-message {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

h1 {
  color: white;
}

p {
  color: whitesmoke;
}
</style>
