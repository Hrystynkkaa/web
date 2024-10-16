<template>
  <div class="user-profile">
    <h2>Профіль користувача</h2>
    <div v-if="user">
      <div class="user-info">
        <p>
          <strong>Ім'я:</strong> {{ user.firstName }} {{ user.lastName }}
          <button @click="editUser" class="btn btn-edit">Редагувати</button>
        </p>
        <p>
          <strong>Електронна пошта:</strong> {{ user.email }}
          <button @click="editUser" class="btn btn-edit">Редагувати</button>
        </p>
      </div>
      <router-link to="/add-apartment" class="btn btn-primary">
        Додати апартамент
      </router-link>
      <router-link to="/contact-support" class="btn btn-support">
        Зв’язатися з технічною підтримкою
      </router-link>

      <h3>Історія бронювань</h3>
      <div v-if="bookings.length > 0">
        <ul>
          <li v-for="(booking, index) in bookings" :key="index">
            <p><strong>Апартамент:</strong> {{ booking.propertyName }}</p>
            <p><strong>Дата заїзду:</strong> {{ booking.checkin }}</p>
            <p><strong>Дата виїзду:</strong> {{ booking.checkout }}</p>
            <router-link to="/add-review" class="btn btn-secondary">
              Додати відгук
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Ви ще не зробили жодного бронювання.</p>
      </div>

      <h3>Обране</h3>
      <div v-if="favorites.length > 0">
        <ul>
          <li v-for="(favorite, index) in favorites" :key="index">
            <p><strong>Апартамент:</strong> {{ favorite.propertyName }}</p>
            <router-link :to="`/apartment/${favorite.id}`" class="btn btn-secondary">
              Переглянути
            </router-link>
            <button @click="removeFavorite(favorite.id)" class="btn btn-remove">Видалити з обраного</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Ви ще не додали жодного апартаменту в обране.</p>
      </div>
    </div>
    <div v-else>
      <p>Ви не увійшли в систему. Будь ласка, <router-link to="/login">увійдіть</router-link>.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      bookings: [], // Array to store booking history
      favorites: [] // Array to store favorite properties
    };
  },
  async mounted() {
    try {
      const userResponse = await axios.get('/api/user/profile'); // Get user information
      this.user = userResponse.data; // Store user data in state

      const bookingsResponse = await axios.get('/api/user/bookings'); // Get user's bookings
      this.bookings = bookingsResponse.data; // Store booking history in state

      const favoritesResponse = await axios.get('/api/user/favorites'); // Get user's favorite properties
      this.favorites = favoritesResponse.data; // Store favorites in state
    } catch (error) {
      this.$router.push('/login'); // Redirect to login if there's an error
    }
  },
  methods: {
    editUser() {
      // Implement logic to edit user profile (e.g., redirect to edit page)
      this.$router.push('/edit-profile'); // Example route to edit profile
    },
    async removeFavorite(id) {
      try {
        await axios.delete(`/api/user/favorites/${id}`); // API call to remove from favorites
        this.favorites = this.favorites.filter(favorite => favorite.id !== id); // Remove from local state
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  text-decoration: none; /* Disable underline for link */
  cursor: pointer; /* Pointer cursor on hover */
}

.btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.btn-edit {
  margin-left: 10px; /* Add some space between the text and the button */
  background-color: #28a745; /* Green background for edit button */
}

.btn-remove {
  background-color: #dc3545; /* Red background for remove button */
}

h3 {
  margin-top: 20px; /* Add margin above the bookings title */
}
</style>

