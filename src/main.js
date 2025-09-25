// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';  
import HomePage from './views/HomePage.vue';
import SportsPage from './views/SportsPage.vue';
import WorldPage from './views/WorldPage.vue'
import BusinessPage from './views/BusinessPage.vue'
import PoliticsPage from './views/PoliticsPage.vue'
import EntertainmentPage from './views/EntertainmentPage.vue'
import LifestylePage from './views/LifestylePage.vue'
import ChatPage from './views/ChatPage.vue'
import SinglePage from './views/SinglePage.vue';
import store from './store'; 
import NotFoundPage from './components/NotFoundPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/sports', component: SportsPage },
  { path: '/world', component: WorldPage },
  { path: '/business', component: BusinessPage },
  { path: '/politics', component: PoliticsPage },
  { path: '/entertainment', component: EntertainmentPage },
  { path: '/life-style', component: LifestylePage },
  { path: '/chat', component: ChatPage },
  { path: '/single-page/:id', name: 'single-page', component: SinglePage },

  { path: '/:catchAll(.*)', component: NotFoundPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
