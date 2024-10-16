<template>
  <div class="admin-login">
    <h1>Вхід для адміністратора</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Електронна пошта</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Увійти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/admin/login', {
          email: this.email,
          password: this.password,
        });
        console.log('Успішний вхід:', response.data);
        this.$router.push('/admin/dashboard'); // Перенаправляємо на панель після входу
      } catch (error) {
        console.error('Помилка при вході:', error);
      }
    },
  },
};
</script>
