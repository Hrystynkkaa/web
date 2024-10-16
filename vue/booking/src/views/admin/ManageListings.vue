<template>
  <div class="manage-listings">
    <h1>Управління оголошеннями</h1>
    <ul>
      <li v-for="listing in listings" :key="listing.id">
        <h3>{{ listing.title }}</h3>
        <p>{{ listing.description }}</p>
        <button @click="deleteListing(listing.id)" class="btn btn-danger">Видалити оголошення</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageListings',
  data() {
    return {
      listings: [],
    };
  },
  created() {
    this.fetchListings();
  },
  methods: {
    async fetchListings() {
      try {
        const response = await axios.get('/api/admin/listings');
        this.listings = response.data;
      } catch (error) {
        console.error('Помилка при завантаженні оголошень:', error);
      }
    },
    async deleteListing(id) {
      try {
        await axios.delete(`/api/admin/listings/${id}`);
        this.fetchListings(); // Оновлюємо список після видалення
      } catch (error) {
        console.error('Помилка при видаленні оголошення:', error);
      }
    },
  },
};
</script>
