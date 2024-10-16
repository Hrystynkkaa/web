<template>
  <div class="manage-complaints">
    <h1>Управління скаргами</h1>
    <ul>
      <li v-for="complaint in complaints" :key="complaint.id">
        <h3>{{ complaint.user }}</h3>
        <p>{{ complaint.message }}</p>
        <button @click="resolveComplaint(complaint.id)" class="btn btn-success">Позначити як вирішене</button>
        <button @click="deleteComplaint(complaint.id)" class="btn btn-danger">Видалити скаргу</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageComplaints',
  data() {
    return {
      complaints: [],
    };
  },
  created() {
    this.fetchComplaints();
  },
  methods: {
    async fetchComplaints() {
      try {
        const response = await axios.get('/api/admin/complaints');
        this.complaints = response.data;
      } catch (error) {
        console.error('Помилка при завантаженні скарг:', error);
      }
    },
    async resolveComplaint(id) {
      try {
        await axios.patch(`/api/admin/complaints/${id}/resolve`);
        this.fetchComplaints(); // Оновлюємо список після вирішення
      } catch (error) {
        console.error('Помилка при вирішенні скарги:', error);
      }
    },
    async deleteComplaint(id) {
      try {
        await axios.delete(`/api/admin/complaints/${id}`);
        this.fetchComplaints(); // Оновлюємо список після видалення
      } catch (error) {
        console.error('Помилка при видаленні скарги:', error);
      }
    },
  },
};
</script>
