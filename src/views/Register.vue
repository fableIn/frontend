<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button type="submit">sign up</button>
    </form>
    <!-- Ссылка‑кнопка на страницу входа -->
    <p style="margin-top: 20px;">
      Have an account?
      <router-link to="/login">
        <button>sign in</button>
      </router-link>
    </p>
  </div>
</template>

<script>
import { register } from '../services/api.js'; // ← не забудьте импорт!

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async handleRegister() {
      try {
        // Вызываем API‑функцию register из services/api.js
        await register(this.form.username, this.form.email, this.form.password);
        // После успешной регистрации — редирект на страницу входа
        this.$router.push('/login');
      } catch (error) {
        console.error("Registration error:", error);
        alert("Ошибка регистрации: " + (error.message || ""));
      }
    }
  }
};
</script>
