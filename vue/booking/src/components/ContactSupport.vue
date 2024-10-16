<template>
  <div class="contact-support">
    <h2>Зв’язатися з технічною підтримкою</h2>
    <form @submit.prevent="submitSupportRequest">
      <div class="form-group">
        <label for="name">Ваше ім'я:</label>
        <input type="text" v-model="name" required placeholder="Введіть ваше ім'я" />
      </div>
      <div class="form-group">
        <label for="email">Електронна пошта:</label>
        <input type="email" v-model="email" required placeholder="Введіть вашу електронну пошту" />
      </div>
      <div class="form-group">
        <label for="message">Повідомлення:</label>
        <textarea v-model="message" required placeholder="Опишіть вашу проблему"></textarea>
      </div>
      <button type="submit" class="submit-button">Відправити запит</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitSupportRequest() {
      const supportData = {
        name: this.name,
        email: this.email,
        message: this.message,
      };

      try {
        await axios.post('/api/support', supportData); // Send request to the backend
        this.successMessage = 'Ваш запит успішно відправлено!';
        this.resetForm();
      } catch (error) {
        this.errorMessage = 'Не вдалося відправити запит. Спробуйте ще раз.';
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.message = '';
      this.successMessage = '';
      this.errorMessage = '';
    },
  },
};
</script>

<style scoped>
.contact-support {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
