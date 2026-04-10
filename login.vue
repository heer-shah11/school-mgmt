<template>
  <div class="login-page">
    <div class="overlay">
      <div class="login-card">
        <h1>🏫 School Management System</h1>
        <p class="subtitle">Primary school portal</p>

        <!-- Role Select -->
        <select v-model="role">
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <!-- Username -->
        <input v-model="username" placeholder="Username" />

        <!-- Password -->
        <input v-model="password" type="password" placeholder="Password" />

        <button @click="login">Login</button>

        <p v-if="error" class="error">Invalid Credentials</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    login() {
      // STUDENT LOGIN
      if (
          this.role === "student" &&
          this.username === "student1" &&
          this.password === "1111"
      ) {
        this.$router.push('/home')
      }

      // TEACHER LOGIN
      else if (
          this.role === "teacher" &&
          this.username === "teacher1" &&
          this.password === "2222"
      ) {
        this.$router.push('/home')
      }

      else {
        this.error = true
      }
    }
  }
}
</script>

<style>
.login-page {
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1588072432836-e10032774350") no-repeat center center/cover;
}

.overlay {
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: white;
  padding: 40px;
  width: 350px;
  border-radius: 12px;
  text-align: center;
}

.login-card input,
.login-card select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.login-card button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>