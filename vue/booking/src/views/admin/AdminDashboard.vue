<template>
  <div v-if="isAdmin">
    <h1>Адміністративна панель</h1>
    <h1>Адміністративна панель</h1>
    <router-link to="/admin/manage-listings" class="btn">Управління оголошеннями</router-link>
    <router-link to="/admin/manage-reviews" class="btn">Управління відгуками</router-link>
    <router-link to="/admin/manage-complaints" class="btn">Управління скаргами</router-link>
  </div>
  <div v-else>
    <p>Ви не маєте доступу до цієї сторінки.</p>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.state.userRole === 'admin'; // Перевірка ролі користувача
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  text-align: center;
  padding: 20px;
}

.btn {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
}
</style>
