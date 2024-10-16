<template>
  <div class="manage-reviews">
    <h1>Управління відгуками</h1>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <h3>{{ review.user }}</h3>
        <p>{{ review.content }}</p>
        <button @click="deleteReview(review.id)" class="btn btn-danger">Видалити відгук</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageReviews',
  data() {
    return {
      reviews: [],
    };
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get('/api/admin/reviews');
        this.reviews = response.data;
      } catch (error) {
        console.error('Помилка при завантаженні відгуків:', error);
      }
    },
    async deleteReview(id) {
      try {
        await axios.delete(`/api/admin/reviews/${id}`);
        this.fetchReviews(); // Оновлюємо список після видалення
      } catch (error) {
        console.error('Помилка при видаленні відгуку:', error);
      }
    },
  },
};
</script>
