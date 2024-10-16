import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './assets/main.css';

import HomePage from './views/Home.vue';
import PropertyDetails from './views/PropertyDetails.vue';
import UserProfile from './views/UserProfile.vue';
import BookingConfirmation from './components/BookingConfirmation.vue';
import AuthForm from './components/AuthForm.vue';
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

const routes = [
    { path: '/admin/login', component: AdminLogin },
    { path: '/admin/dashboard', component: AdminDashboard },
    { path: '/admin/manage-listings', component: ManageListings },
    { path: '/admin/manage-reviews', component: ManageReviews },
    { path: '/admin/manage-complaints', component: ManageComplaints },
    { path: '/', component: HomePage },
    { path: '/property-details/:id', component: PropertyDetails }, // Додано параметр :id
    { path: '/user-profile', component: UserProfile },
    { path: '/booking-confirmation', component: BookingConfirmation },
    { path: '/login', component: AuthForm },
    { path: '/register', component: Register },
    { path: '/add-apartment', component: AddApartment },
    {
        path: '/properties/:id/reviews',
        name: 'Reviews',
        component: Reviews,
    },
    { path: '/add-review', component: AddReview },
    { path: '/contact-support', component: ContactSupport },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
