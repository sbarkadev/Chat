<script setup>
// whithin the script i will try to connect to the server
// import io from socket.io-client
import { io } from 'socket.io-client'
// import from vue , with ref we can define some local state
import {onBeforeMount, ref} from 'vue';

// make connection to socket server
const socket = io('http://localhost:3000');

// define an array of messages
const messages = ref([]);

const messageText = ref('');

const joined = ref(false);

const name = ref('');

const typingDisplay = ref('');

onBeforeMount(() => {
  // event name + payload  {} + response from the serevr
  socket.emit('findAllMessages', {} , (response) => {
    messages.value = response;
  });
  // wwe got the messages , so we need to update this list on the ui whenever there is a new message 
  socket.on('message' ,(message) => {
    messages.value.push(message);
  });

  // add other listenner
  socket.on('typing'  , ({ name, isTyping }) => {
    if(isTyping) {
      typingDisplay.value = `${name} is typing...`;
    }else {
      typingDisplay.value = '';
    }
  });
});

const join = () => {
  socket.emit('join',{name : name.value} , () => {
    joined.value = true;
  })
}
// clients must be also able to send messages themselves
const sendMessage = () => {
  socket.emit('createMessage', { text: messageText.value} , ()=> {
    //it will do the push itself using socket.on
    //messages.value.push(response);]
    messageText.value = '';
  })
}
let timeout;
const emitTyping = () => {
  socket.emit('typing' , {isTyping : true});
  timeout = setTimeout(() => {
      socket.emit('typing' , {isTyping : false});
  }, 2000);
}
</script>

<template>
  <div class = "chat">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>What's your name?</label>
        <input v-model="name"/>
        <button type="submit">Send</button>
      </form>
    </div>
    <div class = "chat-container" v-else>
        <div class="messages-container">
          <div v-for="message in messages">
            [ {{ message.name }} ] : {{ message.text }}
          </div>
        </div>

        <div v-if="typingDisplay">{{ typingDisplay }}</div>

        <hr />
        <div class="message-input">
          <form @submit.prevent="sendMessage">
            <label>Message:</label>
            <input v-model="messageText" @input="emitTyping"/>
            <button type="submit">Send</button>
          </form>

        </div>

    </div>
  </div>
</template>

<style>
@import './assets/base.css';
.chat {
  padding:20px;
  height:100vh
}

.chat-container {
  display: flex;
  flex-direction: column;
  height : 100%;
}

.messages-container {
  flex : 1;
}
</style>
