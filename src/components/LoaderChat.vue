<template>
    <div class="sec-loading" v-if="isLoading">
      <div class="one"></div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      isLoading() {
        // Get the loading state from Vuex store
        return true
      },
    },
  };
  </script>
  
  <style>
  :root {
    --border-width: 7px;
  }
  
  .sec-loading {
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
  
  .sec-loading .one {
    height: 80px;
    width: 80px;
    border: var(--border-width) solid white;
    transform: rotate(45deg);
    border-radius: 0 50% 50% 50%;
    position: relative;
    animation: move 0.5s linear infinite alternate-reverse;
  }
  .sec-loading .one::before {
    content: "";
    position: absolute;
    height: 55%;
    width: 55%;
    border-radius: 50%;
    border: var(--border-width) solid transparent;
    border-top-color: white;
    border-bottom-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1s linear infinite;
  }
  
  @keyframes rotate {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes move {
    to {
      transform: translateY(15px) rotate(45deg);
    }
  }
  
  </style>
  