<template>
  <div id="app">
    <!-- Навігаційне меню або шапка сайту -->
    <header>
      <img src="@/img.png" alt="Логотип" class="logo" />
      <nav class="navbar navbar-expand-lg navbar-light menu">
        <!-- Додаємо кнопку для випадаючого меню -->
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Головна</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/property-details" class="nav-link">Деталі власності</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/user-profile" class="nav-link">Профіль користувача</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/booking-confirmation" class="nav-link">Підтвердження бронювання</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Увійти</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Реєстрація</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/add-apartment" class="nav-link">Додати квартиру</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Головний вміст сторінок -->
    <main>
      <!-- Підключайте компоненти для сторінок тут через <router-view> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Home from './views/Home.vue';
import PropertyDetails from './views/PropertyDetails.vue';
import UserProfile from './views/UserProfile.vue';
import BookingConfirmation from './components/BookingConfirmation.vue';
import Login from './components/AuthForm.vue';
import Register from './components/Register.vue';
import AddApartment from './components/AddApartment.vue';
import AdminDashboard from './views/admin/AdminDashboard.vue';
import ManageListings from './views/admin/ManageListings.vue';
import ManageReviews from './views/admin/ManageReviews.vue';
import ManageComplaints from './views/admin/ManageComplaints.vue';
import AdminLogin from './views/admin/AdminLogin.vue';
import Reviews from './views/Reviews.vue';
import AddReview from "./views/AddReview.vue";
import ContactSupport from "./components/ContactSupport.vue";
export default defineComponent({
  name: 'App',
  components: {
    Home,
    PropertyDetails,
    UserProfile,
    BookingConfirmation,
    Login,
    Register,
    AddApartment,
    AdminDashboard,
    ManageListings,
    ManageReviews,
    ManageComplaints,
    AdminLogin,
    Reviews,
    AddReview,
    ContactSupport,
  },
  mounted() {
    this.$router.push('/'); // Перенаправляємо на головну сторінку
  },
});
</script>
<style>
.logo {
  height: 50px; /* Задаємо висоту логотипа */
  width: auto;  /* Ширина підлаштовується автоматично */
}
</style>
