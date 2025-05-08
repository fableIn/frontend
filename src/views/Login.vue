<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Страница авторизации</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <!-- Новая кнопка-переход -->
    <p style="margin-top: 20px;">
      Нет аккаунта? 
      <router-link to="/register">
        <button>Зарегистрироваться</button>
      </router-link>
    </p>
  </div>
</template>

<script>
import { login } from '../services/api.js';

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const result = await login(this.form.email, this.form.password);
        localStorage.setItem('token', result.access_token);
        this.$router.push('/');
      } catch (error) {
        console.error("Login error:", error);
        alert("Не удалось войти: " + (error.message || "проверьте данные"));
      }
    }
  }
};
</script>
