<template>
  <div class="review-section">
    <h3>Оцінка та відгуки</h3>
    <form @submit.prevent="submitReview" class="review-form">
      <div class="form-group">
        <label for="rating">Оцінка (1-5):</label>
        <input type="number" v-model="rating" min="1" max="5" required class="rating-input" />
      </div>
      <div class="form-group">
        <label for="review">Відгук:</label>
        <textarea v-model="review" required class="review-textarea"></textarea>
      </div>
      <button type="submit" class="btn-submit">Додати відгук</button>
    </form>

    <div v-if="reviews.length" class="reviews-list">
      <h4>Відгуки:</h4>
      <ul>
        <li v-for="(rev, index) in reviews" :key="index" class="review-item">
          <strong>Оцінка:</strong> {{ rev.rating }}<br />
          <strong>Відгук:</strong> {{ rev.review }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rating: 1,
      review: '',
      reviews: [], // Array to store reviews
    };
  },
  methods: {
    async submitReview() {
      const reviewData = {
        rating: this.rating,
        review: this.review,
      };

      try {
        await axios.post(`/api/properties/${this.propertyId}/reviews`, reviewData);
        this.reviews.push(reviewData); // Add the new review to the local array
        this.resetForm(); // Clear form
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    },
    resetForm() {
      this.rating = 1;
      this.review = '';
    },
  },
  async mounted() {
    // Fetch existing reviews from the server
    const response = await axios.get(`/api/properties/${this.propertyId}/reviews`);
    this.reviews = response.data;
  },
};
</script>

<style scoped>
.review-section {
  background-color: #f8f9fa; /* Light gray background */
  border-radius: 8px; /* Rounded corners */
  padding: 20px; /* Padding */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 600px; /* Maximum width */
  margin: 20px auto; /* Centering */
}

h3 {
  text-align: center; /* Centered heading */
  color: #343a40; /* Dark gray color */
}

.review-form {
  margin-bottom: 20px; /* Margin below the form */
}

.form-group {
  margin-bottom: 15px; /* Spacing between form groups */
}

label {
  display: block; /* Block display for labels */
  margin-bottom: 5px; /* Spacing below labels */
  font-weight: bold; /* Bold text */
}

.rating-input,
.review-textarea {
  width: 100%; /* Full width */
  padding: 10px; /* Padding */
  border: 1px solid #ced4da; /* Light border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Font size */
  transition: border-color 0.3s; /* Smooth transition */
}

.rating-input:focus,
.review-textarea:focus {
  border-color: #007bff; /* Blue border on focus */
  outline: none; /* No outline */
}

.review-textarea {
  height: 100px; /* Set height for textarea */
  resize: none; /* Disable resize */
}

.btn-submit {
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 20px; /* Padding */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Smooth transition */
  font-size: 1em; /* Font size */
}

.btn-submit:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.reviews-list {
  margin-top: 20px; /* Margin above reviews */
}

.review-item {
  background-color: #ffffff; /* White background for reviews */
  border: 1px solid #e9ecef; /* Light border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding */
  margin-bottom: 10px; /* Spacing between reviews */
}
</style>

