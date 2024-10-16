<template>
  <div class="property-details">
    <h1 class="property-title">{{ property.name }}</h1>
    <div class="property-content">
      <div class="property-info">
        <button @click="addToFavorites" class="btn btn-favorite" :disabled="isFavorite">
          <span v-if="isFavorite">❤️ Вже в обраному</span>
          <span v-else>❤️ Додати до обраного</span>
        </button>

        <p class="property-description">{{ property.description }}</p>
        <p class="price">{{ property.price }} ₴ за ніч</p>
        <h3>Контактний номер телефону</h3>
        <p class="property-phone">{{ property.phone }}</p>

        <h3>Забронювати цю квартиру</h3>
        <form @submit.prevent="submitBooking" class="booking-form">
          <div class="form-group">
            <label for="guests">Кількість осіб</label>
            <input type="number" v-model="guests" min="1" required />
          </div>
          <div class="form-group">
            <label for="checkin">Дата заїзду</label>
            <input type="date" v-model="checkin" required />
          </div>
          <div class="form-group">
            <label for="checkout">Дата виїзду</label>
            <input type="date" v-model="checkout" required />
          </div>

          <div id="card-element" class="card-element"></div>
          <button type="submit" class="btn btn-primary" :disabled="!stripe || loading">
            {{ loading ? 'Завантаження...' : 'Оплатити' }}
          </button>
        </form>

        <router-link :to="`/properties/${property.id}/reviews`" class="btn btn-secondary">
          Переглянути відгуки
        </router-link>

        <router-link to="/" class="back-link">Назад до списку</router-link>
      </div>
      <img :src="property.image" alt="Property Image" class="property-image" />
    </div>

    <h3>Місцезнаходження</h3>
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default {
  name: 'PropertyDetails',
  data() {
    return {
      property: {},
      guests: 1,
      checkin: '',
      checkout: '',
      stripe: null,
      cardElement: null,
      loading: false,
      map: null,
      address: '', // Змінна для адреси
      isFavorite: false, // Параметр для перевірки, чи є в обраному
    };
  },
  async created() {
    this.fetchPropertyDetails();
    this.stripe = await loadStripe('your-publishable-key-here'); // Ваш API ключ
    this.setupCardElement();
  },
  methods: {
    async fetchPropertyDetails() {
      const propertyId = this.$route.params.id; // Отримуємо ID з маршруту
      try {
        const response = await axios.get(`/api/properties/${propertyId}`); // Запит на бекенд для отримання даних
        this.property = response.data; // Зберігаємо дані про власність

        // Перевірка, чи є власність в обраному
        const favoritesResponse = await axios.get(`/api/user/favorites`);
        this.isFavorite = favoritesResponse.data.some(fav => fav.id === this.property.id);

        // Завантажуємо адресу для карти
        this.address = this.property.address; // Припустимо, адреса є у даних
        this.initMap(); // Ініціалізуємо карту
      } catch (error) {
        console.error('Помилка при отриманні даних власності:', error);
      }
    },
    setupCardElement() {
      const elements = this.stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    },
    async submitBooking() {
      this.loading = true; // Включаємо завантаження
      const bookingData = {
        propertyId: this.property.id,
        guests: this.guests,
        checkin: this.checkin,
        checkout: this.checkout,
      };

      try {
        const { data: order } = await axios.post('/api/book', bookingData);
        const { paymentIntent, error } = await this.stripe.confirmCardPayment(order.clientSecret, {
          payment_method: {
            card: this.cardElement,
          },
        });

        if (error) {
          console.error('Помилка оплати:', error);
          this.loading = false; // Вимикаємо завантаження
          return;
        }

        console.log('Оплата успішна!', paymentIntent);
        this.$router.push('/booking-confirmation');
      } catch (error) {
        console.error('Помилка при бронюванні:', error);
        this.loading = false; // Вимикаємо завантаження
      }
    },
    async addToFavorites() {
      try {
        await axios.post('/api/user/favorites', { propertyId: this.property.id });
        this.isFavorite = true; // Оновлюємо статус обраного
      } catch (error) {
        console.error('Помилка при додаванні в обране:', error);
      }
    },
    initMap() {
      const geocoder = new google.maps.Geocoder();
      const address = this.address; // Отримуємо адресу з даних власності

      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
          });
          new google.maps.Marker({
            position: location,
            map: this.map,
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    },
  },
};
</script>

<style scoped>
.property-details {
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px; /* Increased width */
  margin: 10px auto;
}

.property-content {
  display: flex;
  justify-content: space-between; /* Space between image and info */
  align-items: flex-start;
}

.property-title {
  font-size: 2em;
  color: #343a40;
  margin-bottom: 20px;
}

.property-info {
  width: 50%; /* Width of the property info */
  text-align: left; /* Left-align text */
  padding-right: 20px; /* Add some padding to the right */
}

.property-image {
  width: 35%; /* Width of the image */
  height: auto;
  border-radius: 8px;
}

.property-description {
  font-size: 1.1em;
  color: #495057;
  margin: 10px 0;
}

.price {
  font-size: 1.5em;
  color: #28a745;
  margin: 10px 0;
}

.btn-favorite {
  background-color: #dc3545; /* Red background */
  color: white;
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px 15px; /* Add padding */
  cursor: pointer; /* Change cursor to pointer */
  margin-bottom: 20px;
  position: relative; /* Allow for absolute positioning */
  top: -10px; /* Move it higher */
}

.btn-favorite:hover {
  background-color: #c82333; /* Darker red on hover */
}

.booking-form {
  margin: 20px 0;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-element {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: underline;
}

.back-link:hover {
  color: #0056b3;
}

.map-container {
  width: 100%;
  height: 400px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
