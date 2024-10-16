<template>
  <div class="reviews">
    <h1>Відгуки про {{ property.name }}</h1>

    <div class="review-list">
      <div v-for="review in reviews" :key="review.id" class="review-card">
        <h3>{{ review.userName }}</h3>
        <p>{{ review.comment }}</p>
        <p><strong>Оцінка: {{ review.rating }} ⭐</strong></p>
      </div>
    </div>

    <h2>Залишити відгук</h2>
    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="userName">Ваше ім'я</label>
        <input type="text" v-model="userName" required />
      </div>
      <div class="form-group">
        <label for="comment">Ваш відгук</label>
        <textarea v-model="comment" required></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Оцінка (1-5)</label>
        <input type="number" v-model="rating" min="1" max="5" required />
      </div>
      <button type="submit" class="btn btn-primary">Відправити відгук</button>
    </form>

    <router-link to="/">Назад до списку</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Reviews',
  data() {
    return {
      property: {},
      reviews: [],
      userName: '',
      comment: '',
      rating: 1,
    };
  },
  created() {
    this.fetchPropertyDetails();
    this.fetchReviews();
  },
  methods: {
    async fetchPropertyDetails() {
      const propertyId = this.$route.params.id; // Отримуємо ID з маршруту
      try {
        const response = await axios.get(`/api/properties/${propertyId}`); // Запит на бекенд для отримання даних
        this.property = response.data; // Зберігаємо дані про власність
      } catch (error) {
        console.error('Помилка при отриманні даних власності:', error);
      }
    },
    async fetchReviews() {
      const propertyId = this.$route.params.id; // Отримуємо ID з маршруту
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`); // Запит на бекенд для отримання відгуків
        this.reviews = response.data; // Зберігаємо відгуки
      } catch (error) {
        console.error('Помилка при отриманні відгуків:', error);
      }
    },
    async submitReview() {
      const reviewData = {
        userName: this.userName,
        comment: this.comment,
        rating: this.rating,
      };

      const propertyId = this.$route.params.id; // Отримуємо ID з маршруту

      try {
        await axios.post(`/api/properties/${propertyId}/reviews`, reviewData); // Запит на бекенд для відправлення відгуку
        this.fetchReviews(); // Оновлюємо список відгуків
        this.userName = '';
        this.comment = '';
        this.rating = 1;
      } catch (error) {
        console.error('Помилка при відправленні відгуку:', error);
      }
    },
  },
};
</script>

<style scoped>
.reviews {
  padding: 20px;
  text-align: center;
}

.review-list {
  margin-bottom: 20px;
}

.review-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
}

.form-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}
</style>
