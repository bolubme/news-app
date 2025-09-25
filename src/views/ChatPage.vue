<template>
  <div>
    <Loader v-if="showLoader" />
    <div class="container app">
      <div class="row app-one">
        <div class="col-sm-2">
          <div class="row heading2">
                      <!-- Toggle button -->
                      <button
              class="btn btn-dark mb-2"
              type="button"
              data-toggle="collapse"
              data-target="#chatRoomsCollapse"
              aria-expanded="false"
              aria-controls="chatRoomsCollapse"
            >
              🟰Chat Rooms
            </button>
          </div>
          <div>
            <!-- Collapsible chat rooms -->
            <div class="collapse" id="chatRoomsCollapse">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-3 col-xs-3 heading-name">
                  <button
                    class="btn-chat-group"
                    @click="joinRoom('Sport')"
                    :disabled="isInGroup"
                  >
                    Sport
                  </button>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-3 col-xs-3 heading-name">
                  <button
                    class="btn-chat-group"
                    @click="joinRoom('Politics')"
                    :disabled="isInGroup"
                  >
                    Politics
                  </button>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-3 col-xs-3 heading-name">
                  <button
                    class="btn-chat-group"
                    @click="joinRoom('Business')"
                    :disabled="isInGroup"
                  >
                    Business
                  </button>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-3 col-xs-3 heading-name">
                  <button
                    class="btn-chat-group"
                    @click="joinRoom('Entertainment')"
                    :disabled="isInGroup"
                  >
                    Entertainment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-10 conversation">
          <div class="row heading">
            <h3>{{ selectedRoom }}</h3>
            <div class="exitContainer">
              <input
                type="button"
                value="Exit Group"
                @click="exitRoom"
                :disabled="exitDisabled"
              />
            </div>
          </div>
          <div class="chat-container-m">
            <div class="chat-container" id="output">
              <div
                v-for="(msg, index) in messages"
                :key="index"
                class="message-box"
                :class="{
                  'my-message': isUserMessage(msg),
                  'friend-message': !isUserMessage(msg),
                }"
              >
                <p>{{ msg }}<br /><span>07:43</span></p>
              </div>
            </div>
          </div>
          <div class="container-fluid">
          <div class="row reply">
            <div class="col-9 reply-main">
              <textarea
                class="form-control"
                id="messageInput"
                v-model="messageInput"
                @keyup.enter="sendMessage"
                rows="1"
                :disabled="!isInGroup"
              ></textarea>
            </div>
            <div class="col-1 reply-send">
              <button @click="sendMessage" :disabled="sendDisabled" class="btn">
                send
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/LoaderChat.vue";

export default {
  data() {
    return {
      ws: null,
      userName: "",
      roomId: "",
      messages: [],
      messageInput: "",
      exitDisabled: true,
      sendDisabled: true,
      joinDisabled: false,
      selectedRoom: "",
      isInGroup: false,
      showLoader: true,
    };
  },
  components: {
    Loader,
  },
  mounted() {
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  },
  methods: {
    generateUsername() {
      // Generate a random username
      this.userName = "User" + Math.floor(Math.random() * 1000);
    },
    joinRoom(room) {
      this.selectedRoom = room;
      this.generateUsername();
      this.roomId = room;
      this.isInGroup = true;

      // Rest of your joinRoom logic
      if (!this.userName || !this.roomId) {
        alert("Please set your username and room ID.");
        return;
      }

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        alert("You are already in a room.");
        return;
      }

      this.ws = new WebSocket(
        "wss://4ihysw213c.execute-api.us-east-1.amazonaws.com/production/"
      );

      this.ws.onopen = () => {
        console.log("Connected");
        this.send(`Joined the room`);
        this.enterRoom();
        this.exitDisabled = false;
        this.sendDisabled = false;
        this.joinDisabled = true;
      };

      this.ws.onmessage = (event) => {
        this.messages.push(decodeURI(event.data));
        this.$nextTick(() => {
          const container = document.getElementById("output");
          container.scrollTop = container.scrollHeight;
        });
      };

      this.ws.onclose = () => {
        console.log("Disconnected");
        this.userName = "";
        this.roomId = "";
        this.messages = [];
        this.exitDisabled = true;
        this.sendDisabled = true;
        this.joinDisabled = false;
      };

      this.ws.onerror = (error) => {
        console.error("Error:", error);
      };
    },
    enterRoom() {
      this.ws.send(`{ "action": "enterRoom", "data": "${this.roomId}"}`);
    },
    exitRoom() {
      this.ws.send(`{ "action": "existRoom", "data": "${this.roomId}"}`);
      this.ws.close();
      this.isInGroup = false;
      this.selectedRoom = "";
    },
    sendMessage() {
      const msg = this.messageInput.trim();
      if (!msg) return;
      const str = `${this.userName}: ${encodeURI(msg)}`;
      this.send(str);
      this.messageInput = "";
    },
    send(msg) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(`{ "action": "sendMessages", "data": "${msg}"}`);
      }
    },
    // Method to check if the message is sent by the user
    isUserMessage(msg) {
      return msg.startsWith(this.userName);
    },
  },
};
</script>

<style scoped>
.app {
  height: 70vh;
}

.btn {
  border: none;
  border: 1px solid black;
}

.btn:hover {
  background-color: #fab300;
}

.app-one {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
}

.side {
  padding: 0;
  margin: 0;
  height: 100%;
}

.heading {
  padding: 10px 16px 10px 15px;
  margin: 0;
  height: 60px;
  width: 100%;
  background-color: #eee;
  z-index: 1000;
}

.heading2 {
  margin: 0;
  height: 58px;
  width: 100%;
  background-color: #eee;
  z-index: 1000;
  justify-content: center;
  align-content: center;
  margin-bottom: 4px;
}

.col-sm-2 {
  padding-right: 2px !important;
  padding-left: 0 !important;
}

.col-sm-10 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.heading-name {
  padding: 0 !important;
  cursor: pointer;
}

.heading-name {
  height: 50px;
  width: 100%;
  margin-bottom: 3px;
}

.btn-chat-group:hover {
  background-color: #f2ead5;
}

.btn-chat-group {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 20px;
}

.heading-name-meta {
  font-weight: 700;
  font-size: 100%;
  padding: 5px;
  padding-bottom: 0;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
  display: block;
}

.heading-compose {
  padding: 0;
}

.heading-compose i {
  text-align: center;
  padding: 5px;
  color: #93918f;
  cursor: pointer;
}

.time-meta {
  text-align: right;
  font-size: 12px;
  padding: 1% !important;
  color: rgba(0, 0, 0, 0.4);
  vertical-align: baseline;
}

.composeBox {
  padding: 0 !important;
  margin: 0 !important;
  height: 60px;
  width: 100%;
}

.composeBox-inner {
  height: 100%;
  width: 100%;
  padding: 10px !important;
  background-color: #fbfbfb;
}

.composeBox-inner input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

.chat-container-m {
  height: 50vh;
  background-color: #e5ddd6;
}

.chat-container {
  position: relative;
  width: 100%;
  height: calc(100% - 1px);
  padding: 25px;
  overflow-y: auto;
}

.chat-container .my-message i {
  color: yellow;
}

.message-box {
  position: relative;
  display: flex;
  width: 100%;
  margin: 2px 0;
}

.message-box p {
  position: relative;
  right: 0;
  text-align: right;
  max-width: 65%;
  padding: 12px;
  background: #dcf8c6;
  border-radius: 10px;
  font-size: 0.9em;
}

.message-box.my-message p::before {
  content: "";
  position: absolute;
  top: 0;
  right: -12px;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    135deg,
    #dcf8c6 0%,
    #dcf8c6 50%,
    transparent 50%,
    transparent
  );
}

.message-box p span {
  display: block;
  margin-top: 2px;
  font-size: 0.8em;
  opacity: 0.5;
}

.message-box.friend-message::before {
  content: "";
  position: absolute;
  top: 0;
  left: -12px;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    225deg,
    #fff 0%,
    #fff 50%,
    transparent 50%,
    transparent
  );
}

.friend-message p {
  background: #fff;
}

.friend-message {
  justify-content: flex-start;
}

.my-message {
  justify-content: flex-end;
}

/*Reply*/

.reply {
  height: 60px;
  width: 100%;
  background-color: #f5f1ee;
  padding: 10px 5px 10px 5px !important;
  margin: 0 !important;
  z-index: 1000;
}

.reply-send {
  padding: 5px !important;
}

.reply-send i {
  text-align: center;
  padding: 5px !important;
  color: #93918f;
  cursor: pointer;
}

.reply-main {
  padding: 2px 4px !important;
}

.reply-main textarea {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 5px !important;
  outline: none;
  border: none;
  text-indent: 5px;
  box-shadow: none;
  height: 94%;
  font-size: 16px;
}

.reply-main textarea:focus {
  outline: none;
  border: none;
  text-indent: 5px;
  box-shadow: none;
}

/* HEADING DESIGN  */
.heading2 h4 {
  font-family: Garamond, serif;
  font-weight: bolder;
  font-size: 22px;
  color: rgb(60, 60, 60);
}

.heading h3 {
  font-family: Garamond, serif;
  font-weight: bolder;
  font-size: 22px;
  color: rgb(60, 60, 60);
}

.row.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exitContainer input {
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.exitContainer input:hover {
  border: none;
  border: 1px solid black;
  background-color: #fab300;
}

.container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
    padding-right: 0 !important;
    padding-left: 0 !important
}



@media only screen and (max-width: 576px) {

.app-one {
    height: 0;
    overflow: unset;
}
}
</style>
