<!-- components/AdminPanel.vue -->
<template>
    <div class="admin-panel">
      <h2>管理面板</h2>
      <div class="poll-form">
        <input v-model="newPollTitle" placeholder="輸入新選項" @keypress="validateInput" />
        <button @click="createPoll" :disabled="!newPollTitle">創建新選項</button>
      </div>
      <ul class="poll-list">
        <li v-for="poll in polls" :key="poll.id" class="poll-item">
          <span>{{ poll.title }} (票数: {{ poll.voteCount }})</span>
          <div class="poll-actions">
            <input v-model="poll.newTitle" placeholder="重新命名" @keypress="validateInput" />
            <button @click="updatePoll(poll)" :disabled="!poll.newTitle">更新</button>
            <button @click="deletePoll(poll.id)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  
  export default defineComponent({
    name: 'AdminPanel',
    setup() {
      const polls = ref([])
      const newPollTitle = ref('')
  
      const fetchPolls = async () => {
        try {
          const response = await axios.get('http://localhost:8080/demo/poll')
          polls.value = response.data.map(poll => ({ ...poll, newTitle: '' }))
        } catch (error) {
          console.error('Error fetching polls:', error)
        }
      }
  
      const createPoll = async () => {
        if (!newPollTitle.value) return
        try {
          await axios.post('http://localhost:8080/demo/insert', { title: newPollTitle.value })
          newPollTitle.value = ''
          await fetchPolls()
        } catch (error) {
          console.error('Error creating poll:', error)
        }
      }
  
      const updatePoll = async (poll) => {
        if (!poll.newTitle) return
        try {
          await axios.put(`http://localhost:8080/demo/update/${poll.id}`, { title: poll.newTitle })
          poll.title = poll.newTitle
          poll.newTitle = ''
          await fetchPolls()
        } catch (error) {
          console.error('Error updating poll:', error)
        }
      }
  
      const deletePoll = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/demo/delete/${id}`)
          await fetchPolls()
        } catch (error) {
          console.error('Error deleting poll:', error)
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
        newPollTitle,
        createPoll,
        updatePoll,
        deletePoll,
        validateInput
      }
    }
  })
  </script>
  
  <style scoped>
  .admin-panel {
    margin-bottom: 40px;
  }
  .poll-form {
    margin-bottom: 20px;
  }
  .poll-list {
    list-style-type: none;
    padding: 0;
  }
  .poll-item {
    margin-bottom: 10px;
  }
  .poll-actions {
    margin-top: 5px;
  }
  </style>