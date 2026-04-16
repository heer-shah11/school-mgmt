<script>
export default {
  data() {
    return {
      userId: "",
      password: "",
      role: "teacher",
      error: "",
      success: "",
    };
  },
  methods: {
    selectRole(role) {
      this.role = role;
      this.error = "";
    },
    async handleLogin() {
      if (!this.userId || !this.password) {
        this.error = "Please enter both fields";
        return;
      }
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: this.userId,
          password: this.password,
          role: this.role,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        this.success = "Login successful!";
        setTimeout(() => {
          this.$emit("login-success", this.role);
        }, 800);
      } else {
        this.error = "Invalid credentials";
      }
    },
  },
};
</script>

<template>
  <!-- ✅ FIX: use login-wrapper here, not login-page -->
  <div class="login-wrapper">
    <div class="card">

      <div class="logo-area">
        <div class="logo-icon">🏫</div>
        <div class="school-name">School Management System</div>
        <div class="school-sub">Welcome back! Please login</div>
      </div>

      <div class="role-selector">
        <button
          :class="['role-btn', { active: role === 'teacher' }]"
          @click="selectRole('teacher')"
        >Teacher</button>
        <button
          :class="['role-btn', { active: role === 'student' }]"
          @click="selectRole('student')"
        >Student</button>
      </div>

      <div v-if="success" class="success-msg">{{ success }}</div>
      <div v-if="error" class="error-msg">{{ error }}</div>

      <input v-model="userId" placeholder="User ID" class="input-field" />
      <input v-model="password" type="password" placeholder="Password" class="input-field" />

      <button class="login-btn" @click="handleLogin">LOGIN</button>

    </div>
  </div>
</template>
<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.login-wrapper {
  position: fixed;        /* ✅ covers entire screen, ignores all parent containers */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a237e, #1565c0);
  z-index: 9999;          /* ✅ sits on top of everything */
}

.card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

.logo-area { text-align: center; margin-bottom: 1rem; }
.logo-icon { font-size: 40px; }
.school-name { font-weight: bold; color: #1a237e; }
.school-sub { font-size: 13px; color: #718096; margin-top: 4px; }

.role-selector { display: flex; gap: 10px; margin: 12px 0; }

.role-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  background: white;
  color: #444;
}
.role-btn.active {
  background: #1a237e;
  color: white;
  border-color: #1a237e;
}

.input-field {
  width: 100%;
  margin: 8px 0;
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
}
.input-field:focus { border-color: #1a237e; }

.login-btn {
  width: 100%;
  padding: 11px;
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  margin-top: 6px;
}
.login-btn:hover { background: #283593; }

.error-msg { color: #c53030; font-size: 13px; margin: 4px 0; }
.success-msg { color: #276749; font-size: 13px; margin: 4px 0; }
</style>