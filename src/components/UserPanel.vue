<!-- components/UserPanel.vue -->
<template>
    <div class="user-panel">
      <h2>用戶投票面板</h2>
      <input v-model="voterName" placeholder="輸入您的名字" @keypress="validateInput" />
      <ul class="poll-list">
        <li v-for="poll in polls" :key="poll.id" class="poll-item">
          <label>
            <input type="checkbox" v-model="selectedPolls" :value="poll.id" />
            {{ poll.title }} (目前票数: {{ poll.voteCount }})
          </label>
        </li>
      </ul>
      <button @click="submitVotes" :disabled="!voterName || selectedPolls.length === 0">提交投票</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  
  export default defineComponent({
    name: 'UserPanel',
    setup() {
      const polls = ref([])
      const voterName = ref('')
      const selectedPolls = ref([])
  
      const fetchPolls = async () => {
        try {
          const response = await axios.get('http://localhost:8080/demo/poll')
          polls.value = response.data
        } catch (error) {
          console.error('Error fetching polls:', error)
        }
      }
  
      const submitVotes = async () => {
        if (!voterName.value || selectedPolls.value.length === 0) return
        try {
          for (const pollId of selectedPolls.value) {
            await axios.post('http://localhost:8080/demo/vote', {
              voter: voterName.value,
              pollId: pollId
            })
          }
          voterName.value = ''
          selectedPolls.value = []
          await fetchPolls()
        } catch (error) {
          console.error('Error submitting votes:', error)
        }
      }
  
      const validateInput = (event) => {
        const char = String.fromCharCode(event.keyCode)
        const pattern = /^[a-zA-Z0-9\s]*$/
        if (!pattern.test(char)) {
          event.preventDefault()
        }
      }
  
      onMounted(fetchPolls)
  
      return {
        polls,
        voterName,
        selectedPolls,
        submitVotes,
        validateInput
      }
    }
  })
  </script>
  
  <style scoped>
  .user-panel {
    margin-top: 40px;
  }
  .poll-list {
    list-style-type: none;
    padding: 0;
  }
  .poll-item {
    margin-bottom: 10px;
  }
  </style>