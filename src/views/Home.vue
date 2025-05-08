<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Добро пожаловать, {{ user.username }}!</h1>
    <p>Email: {{ user.email }}</p>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
import { getCurrentUser } from '../services/api.js';

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: '',
        email: ''
      }
    };
  },
  async created() {
    try {
      // Запрашиваем данные текущего пользователя
      this.user = await getCurrentUser();
    } catch (err) {
      console.error('Не удалось получить профиль:', err);
      // Если токен просрочен или недействителен — перенаправляем на логин
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
