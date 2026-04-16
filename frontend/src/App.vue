<script>
import Login from "./components/Login.vue";
export default {
  components: {
    Login
  },

  data() {
    return {
      newTeacherSubject: "",
newTeacherExperience: "",
editTeacherSubject: "",
editTeacherExperience: "",

      isLoggedIn: false,
      userRole: "",
      students: [],
      teachers: [],
      subjects: [],
      attendance: [],

      // ── Students form ──
      newName: "",
      newAge: "",
      editId: null,
      editName: "",
      editAge: "",

      // ── Teachers form ──
      newTeacherName: "",
      editTeacherId: null,
      editTeacherName: "",

      // ── Subjects form ──
      newSubjectName: "",
      editSubjectId: null,
      editSubjectName: "",

      // ── Attendance form ──
      newAttStudentId: "",
      newAttSubjectId: "",
      newAttStatus: "present",
      newAttDate: "",
      editAttId: null,
      editAttStatus: "present",

      activeTable: "students",
    };
  },

  mounted() {
    this.showTable("students");
  },

  methods: {
    handleLoginSuccess(role) {
      this.isLoggedIn = true;
      this.userRole = role;
    },

    async showTable(table) {
      this.activeTable = table;
      this.editId = null;
      this.editTeacherId = null;
      this.editSubjectId = null;
      this.editAttId = null;
      if (table === "students")   await this.fetchStudents();
      if (table === "teachers")   await this.fetchTeachers();
      if (table === "subjects")   await this.fetchSubjects();
      if (table === "attendance") {
  await this.fetchAttendance();
  await this.fetchStudents();
      }
    },

    // ── Fetch ──
    async fetchStudents() {
      const res = await fetch("http://localhost:3000/students");
      this.students = await res.json();
    },
    async fetchTeachers() {
      const res = await fetch("http://localhost:3000/teachers");
      this.teachers = await res.json();
    },
    async fetchSubjects() {
      const res = await fetch("http://localhost:3000/subjects");
      this.subjects = await res.json();
    },
    async fetchAttendance() {
      const res = await fetch("http://localhost:3000/attendance");
      this.attendance = await res.json();
    },

    // ── Students CRUD ──
    async addStudent() {
      if (!this.newName || !this.newAge) return;
      await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.newName, age: this.newAge }),
      });
      this.newName = "";
      this.newAge = "";
      this.fetchStudents();
    },
    async deleteStudent(id) {
      await fetch(`http://localhost:3000/students/${id}`, { method: "DELETE" });
      this.fetchStudents();
    },
    editStudent(student) {
      this.editId = student.id;
      this.editName = student.name;
      this.editAge = student.age;
    },
    async updateStudent() {
      await fetch(`http://localhost:3000/students/${this.editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.editName, age: this.editAge }),
      });
      this.editId = null;
      this.fetchStudents();
    },
    cancelEdit() { this.editId = null; },

    // ── Teachers CRUD ──
async addTeacher() {
  if (!this.newTeacherName) return;
  await fetch("http://localhost:3000/teachers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      name: this.newTeacherName,
      subject: this.newTeacherSubject,
      experience: this.newTeacherExperience,
    }),
  });
  this.newTeacherName = "";
  this.newTeacherSubject = "";
  this.newTeacherExperience = "";
  this.fetchTeachers();
},

editTeacher(teacher) {
  this.editTeacherId = teacher.id;
  this.editTeacherName = teacher.Name;
  this.editTeacherSubject = teacher.subject;
  this.editTeacherExperience = teacher.experience;
},
   async updateTeacher() {
  await fetch(`http://localhost:3000/teachers/${this.editTeacherId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      name: this.editTeacherName,
      subject: this.editTeacherSubject,
      experience: this.editTeacherExperience,
    }),
  });
  this.editTeacherId = null;
  this.fetchTeachers();
},
    async deleteTeacher(id) {
      await fetch(`http://localhost:3000/teachers/${id}`, { method: "DELETE" });
      this.fetchTeachers();
    },
    cancelTeacherEdit() { this.editTeacherId = null; },

    // ── Subjects CRUD ──
    async addSubject() {
      if (!this.newSubjectName) return;
      await fetch("http://localhost:3000/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.newSubjectName }),
      });
      this.newSubjectName = "";
      this.fetchSubjects();
    },
    editSubject(subject) {
      this.editSubjectId = subject.id;
      this.editSubjectName = subject.name;
    },
    async updateSubject() {
      await fetch(`http://localhost:3000/subjects/${this.editSubjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.editSubjectName }),
      });
      this.editSubjectId = null;
      this.fetchSubjects();
    },
    async deleteSubject(id) {
      await fetch(`http://localhost:3000/subjects/${id}`, { method: "DELETE" });
      this.fetchSubjects();
    },
    cancelSubjectEdit() { this.editSubjectId = null; },

    // ── Attendance CRUD ──
    getStudentName(id) {
  const student = this.students.find(s => s.id === parseInt(id));
  return student ? student.name : '-';
},
    async addAttendance() {
      if (!this.newAttStudentId || !this.newAttSubjectId || !this.newAttDate) return;
      await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: this.newAttStudentId,
          subject_id: this.newAttSubjectId,
          status: this.newAttStatus,
          date: this.newAttDate,
        }),
      });
      this.newAttStudentId = "";
      this.newAttSubjectId = "";
      this.newAttStatus = "present";
      this.newAttDate = "";
      this.fetchAttendance();
    },
    editAttendance(record) {
      this.editAttId = record.id;
      this.editAttStatus = record.status;
    },
    async updateAttendance() {
      await fetch(`http://localhost:3000/attendance/${this.editAttId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: this.editAttStatus }),
      });
      this.editAttId = null;
      this.fetchAttendance();
    },
    async deleteAttendance(id) {
      await fetch(`http://localhost:3000/attendance/${id}`, { method: "DELETE" });
      this.fetchAttendance();
    },
    cancelAttEdit() { this.editAttId = null; },

    // ── Helpers ──
    getStatusClass(status) {
      if (!status) return "";
      const s = status.toLowerCase();
      if (s === "present") return "badge-present";
      if (s === "absent")  return "badge-absent";
      return "badge-late";
    },
    currentTableLabel() {
      return this.activeTable.charAt(0).toUpperCase() + this.activeTable.slice(1);
    },
  },
};
</script>

<template>
  <div>

    <!-- 🔐 LOGIN PAGE -->
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />

    <!-- 📊 DASHBOARD -->
    <div v-else class="layout">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="brand-icon">🏫</span>
          <div>
            <div class="brand-title">School Management</div>
            <div class="brand-sub">Primary School Portal</div>
          </div>
        </div>

        <nav class="sidebar-nav">
          <button
            v-for="item in [
              { key: 'students',   icon: '👨‍🎓', label: 'Students' },
              { key: 'teachers',   icon: '👩‍🏫', label: 'Teachers' },
              { key: 'subjects',   icon: '📚',  label: 'Subjects' },
              { key: 'attendance', icon: '📋',  label: 'Attendance' },
            ]"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeTable === item.key }"
            @click="showTable(item.key)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <div class="admin-avatar">{{ userRole === 'teacher' ? 'T' : 'S' }}</div>
<div>
  <div class="admin-name">{{ userRole === 'teacher' ? 'Teacher' : 'Student' }}</div>
  <div class="admin-role">{{ userRole === 'teacher' ? 'Administrator' : 'View Only' }}</div>
</div>
      </aside>

      <!-- MAIN -->
      <main class="main">

        <!-- TOPBAR -->
        <header class="topbar">
          <div>
            <h1 class="page-title">{{ currentTableLabel() }}</h1>
            <div class="breadcrumb">Dashboard › {{ currentTableLabel() }}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="topbar-date">
              {{ new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
            <button class="logout-btn" @click="isLoggedIn = false; userRole = ''">Logout</button>
          </div>
        </header>

        <!-- READ ONLY BANNER FOR STUDENTS -->
        <div v-if="userRole === 'student'" class="readonly-banner">
          👁️ View Only — Students cannot edit records
        </div>

        <div class="content">

          <!-- ══════════════════════════════════
               STUDENTS
          ══════════════════════════════════ -->
          <div v-if="activeTable === 'students'">
            <div class="card form-card" v-if="userRole === 'teacher'">
              <h3 class="card-title" v-if="!editId">➕ Add New Student</h3>
              <h3 class="card-title" v-else>✏️ Edit Student</h3>
              <div class="form-row">
                <template v-if="!editId">
                  <div class="input-group">
                    <label>Full Name</label>
                    <input v-model="newName" placeholder="e.g. Arjun Mehta" />
                  </div>
                  <div class="input-group">
                    <label>Age</label>
                    <input v-model="newAge" placeholder="e.g. 14" type="number" />
                  </div>
                  <button class="btn-primary" @click="addStudent">Add Student</button>
                </template>
                <template v-else>
                  <div class="input-group">
                    <label>Full Name</label>
                    <input v-model="editName" />
                  </div>
                  <div class="input-group">
                    <label>Age</label>
                    <input v-model="editAge" type="number" />
                  </div>
                  <button class="btn-primary" @click="updateStudent">Save Changes</button>
                  <button class="btn-ghost" @click="cancelEdit">Cancel</button>
                </template>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="margin-bottom:0">All Students</h3>
                <span class="count-pill">{{ students.length }} records</span>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#ID</th><th>Name</th><th>Age</th>
                      <th v-if="userRole === 'teacher'">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="s in students" :key="s.id" :class="{ 'row-highlight': editId === s.id }">
                      <td><span class="id-chip">{{ s.id }}</span></td>
                      <td class="name-col">{{ s.name }}</td>
                      <td>{{ s.age }}</td>
                      <td class="action-col" v-if="userRole === 'teacher'">
                        <button class="btn-edit" @click="editStudent(s)">Edit</button>
                        <button class="btn-delete" @click="deleteStudent(s.id)">Delete</button>
                      </td>
                    </tr>
                    <tr v-if="students.length === 0">
                      <td colspan="4" class="empty">No students found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        <!-- ══════════════════════════════════
     TEACHERS
══════════════════════════════════ -->
<div v-if="activeTable === 'teachers'">

  <!-- Add / Edit Form -->
  <div class="card form-card" v-if="userRole === 'teacher'">
    <h3 class="card-title" v-if="!editTeacherId">➕ Add New Teacher</h3>
    <h3 class="card-title" v-else>✏️ Edit Teacher</h3>

    <div class="form-row" v-if="!editTeacherId">
      <div class="input-group">
        <label>Full Name</label>
        <input v-model="newTeacherName" placeholder="e.g. Ms. Sharma" />
      </div>
      <div class="input-group">
        <label>Subject</label>
        <input v-model="newTeacherSubject" placeholder="e.g. Mathematics" />
      </div>
      <div class="input-group">
        <label>Experience</label>
        <input v-model="newTeacherExperience" placeholder="e.g. 5 years" />
      </div>
      <button class="btn-primary" @click="addTeacher">Add Teacher</button>
    </div>

    <div class="form-row" v-else>
      <div class="input-group">
        <label>Full Name</label>
        <input v-model="editTeacherName" />
      </div>
      <div class="input-group">
        <label>Subject</label>
        <input v-model="editTeacherSubject" />
      </div>
      <div class="input-group">
        <label>Experience</label>
        <input v-model="editTeacherExperience" />
      </div>
      <button class="btn-primary" @click="updateTeacher">Save Changes</button>
      <button class="btn-ghost" @click="cancelTeacherEdit">Cancel</button>
    </div>
  </div>

  <!-- Table -->
  <div class="card">
    <div class="card-header">
      <h3 class="card-title" style="margin-bottom:0">All Teachers</h3>
      <span class="count-pill">{{ teachers.length }} records</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#ID</th><th>Name</th><th>Subject</th><th>Experience</th>
            <th v-if="userRole === 'teacher'">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in teachers" :key="t.id">
            <td><span class="id-chip">{{ t.id }}</span></td>
            <td class="name-col">{{ t.Name }}</td>
            <td>{{ t.subject }}</td>
            <td>{{ t.experience }}</td>
            <td class="action-col" v-if="userRole === 'teacher'">
              <button class="btn-edit" @click="editTeacher(t)">Edit</button>
              <button class="btn-delete" @click="deleteTeacher(t.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="teachers.length === 0">
            <td colspan="5" class="empty">No teachers found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>  <!-- end v-if="activeTable === 'teachers'" -->
          <!-- ══════════════════════════════════
               SUBJECTS
          ══════════════════════════════════ -->
          <div v-if="activeTable === 'subjects'">

            <!-- Add / Edit Form -->
            <div class="card form-card" v-if="userRole === 'teacher'">
              <h3 class="card-title" v-if="!editSubjectId">➕ Add New Subject</h3>
              <h3 class="card-title" v-else>✏️ Edit Subject</h3>
              <div class="form-row form-row-single">
                <template v-if="!editSubjectId">
                  <div class="input-group">
                    <label>Subject Name</label>
                    <input v-model="newSubjectName" placeholder="e.g. Mathematics" />
                  </div>
                  <button class="btn-primary" @click="addSubject">Add Subject</button>
                </template>
                <template v-else>
                  <div class="input-group">
                    <label>Subject Name</label>
                    <input v-model="editSubjectName" />
                  </div>
                  <button class="btn-primary" @click="updateSubject">Save Changes</button>
                  <button class="btn-ghost" @click="cancelSubjectEdit">Cancel</button>
                </template>
              </div>
            </div>

            <!-- Table -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="margin-bottom:0">Curriculum Subjects</h3>
                <span class="count-pill">{{ subjects.length }} records</span>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#ID</th><th>Subject Name</th>
                      <th v-if="userRole === 'teacher'">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="s in subjects" :key="s.id" :class="{ 'row-highlight': editSubjectId === s.id }">
                      <td><span class="id-chip">{{ s.id }}</span></td>
                      <td class="name-col">{{ s.name }}</td>
                      <td class="action-col" v-if="userRole === 'teacher'">
                        <button class="btn-edit" @click="editSubject(s)">Edit</button>
                        <button class="btn-delete" @click="deleteSubject(s.id)">Delete</button>
                      </td>
                    </tr>
                    <tr v-if="subjects.length === 0">
                      <td colspan="3" class="empty">No subjects found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ══════════════════════════════════
               ATTENDANCE
          ══════════════════════════════════ -->
          <div v-if="activeTable === 'attendance'">

            <!-- Add Form -->
            <div class="card form-card" v-if="userRole === 'teacher'">
              <h3 class="card-title" v-if="!editAttId">➕ Add Attendance Record</h3>
              <h3 class="card-title" v-else>✏️ Edit Attendance Status</h3>

              <!-- ADD MODE: all 4 fields -->
              <div class="form-row form-row-att" v-if="!editAttId">
                <div class="input-group">
                  <label>Student ID</label>
                  <input v-model="newAttStudentId" placeholder="e.g. 1" type="number" />
                </div>
                <div class="input-group">
                  <label>Subject ID</label>
                  <input v-model="newAttSubjectId" placeholder="e.g. 2" type="number" />
                </div>
                <div class="input-group">
                  <label>Date</label>
                  <input v-model="newAttDate" type="date" />
                </div>
                <div class="input-group">
                  <label>Status</label>
                  <select v-model="newAttStatus" class="select-input">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
                <button class="btn-primary" @click="addAttendance">Add Record</button>
              </div>

              <!-- EDIT MODE: only status can change (backend only updates status) -->
              <div class="form-row form-row-single" v-else>
                <div class="input-group">
                  <label>Status</label>
                  <select v-model="editAttStatus" class="select-input">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
                <button class="btn-primary" @click="updateAttendance">Save Changes</button>
                <button class="btn-ghost" @click="cancelAttEdit">Cancel</button>
              </div>
            </div>

            <!-- Table -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="margin-bottom:0">Attendance Records</h3>
                <span class="count-pill">{{ attendance.length }} records</span>
              </div>
              <div class="table-wrap">
                <table>
                <thead>
  <tr>
    <th>#ID</th><th>Student ID</th><th>Student Name</th><th>Subject ID</th><th>Date</th><th>Status</th>
    <th v-if="userRole === 'teacher'">Actions</th>
  </tr>
</thead>
<tbody>
  <tr v-for="r in attendance" :key="r.id" :class="{ 'row-highlight': editAttId === r.id }">
    <td><span class="id-chip">{{ r.id }}</span></td>
    <td>{{ r.student_id }}</td>
    <td class="name-col">{{ getStudentName(r.student_id) }}</td>
    <td>{{ r.subject_id }}</td>
    <td>{{ r.date }}</td>
    <td><span class="badge" :class="getStatusClass(r.status)">{{ r.status }}</span></td>
    <td class="action-col" v-if="userRole === 'teacher'">
      <button class="btn-edit" @click="editAttendance(r)">Edit</button>
      <button class="btn-delete" @click="deleteAttendance(r.id)">Delete</button>
    </td>
  </tr>
  <tr v-if="attendance.length === 0">
    <td colspan="7" class="empty">No attendance records found</td>
  </tr>
</tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
.content > div { 
  width: 100%; 
  display: contents;
}
.layout {
  display: flex;
  min-height: 100vh;
  height: 100%;
  font-family: 'Inter', sans-serif;
  background: #f0f4f8;
  color: #1a202c;
  width: 100vw;
  overflow-x: hidden;
}

/* ── SIDEBAR ── */
.sidebar {
  width: 250px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  box-shadow: 2px 0 12px rgba(0,0,0,0.06);
  z-index: 50;
}
.logout-btn {
  padding: 8px 18px;
  background: #fff5f5;
  color: #c53030;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.15s;
}
.logout-btn:hover { background: #fed7d7; }
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 1px solid #e2e8f0;
}
.brand-icon { font-size: 30px; }
.brand-title { font-size: 15px; font-weight: 700; color: #1a202c; line-height: 1.2; }
.brand-sub { font-size: 11px; color: #718096; margin-top: 2px; }
.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  text-align: left;
  transition: background 0.18s, color 0.18s;
}
.nav-item:hover { background: #f0faf3; color: #276749; }
.nav-item.active { background: #e6f4ec; color: #276749; font-weight: 600; }
.nav-icon { font-size: 17px; }
.sidebar-footer { padding: 16px 20px; border-top: 1px solid #e2e8f0; }
.admin-badge { display: flex; align-items: center; gap: 10px; }
.admin-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: #38a169;
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 15px;
}
.admin-name { font-size: 13px; font-weight: 600; color: #2d3748; }
.admin-role { font-size: 11px; color: #718096; margin-top: 1px; }

/* ── MAIN ── */
.main {
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.topbar {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.page-title { font-size: 22px; font-weight: 700; color: #1a202c; }
.breadcrumb { font-size: 12px; color: #718096; margin-top: 3px; }
.topbar-date { font-size: 13px; color: #718096; font-weight: 500; }
.content {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

/* ── CARD ── */
.card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.card-title { font-size: 15px; font-weight: 600; color: #2d3748; margin-bottom: 16px; }
.count-pill {
  background: #e6f4ec;
  color: #276749;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
}

/* ── FORM LAYOUTS ── */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: flex-end;
  gap: 14px;
  width: 100%;
}
/* single-field rows (teachers, subjects, att edit) */
.form-row-single {
  grid-template-columns: 1fr auto auto;
}
/* attendance add: 4 fields + button */
.form-row-att {
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
}

.input-group { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.input-group label {
  font-size: 11px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.input-group input,
.select-input {
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #2d3748;
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  width: 100%;
}
.input-group input:focus,
.select-input:focus {
  border-color: #38a169;
  box-shadow: 0 0 0 3px rgba(56,161,105,0.12);
  background: #fff;
}

.btn-primary {
  padding: 10px 22px;
  background: #38a169;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.18s, transform 0.1s;
  white-space: nowrap;
  align-self: flex-end;
}
.btn-primary:hover { background: #276749; transform: translateY(-1px); }
.btn-ghost {
  padding: 10px 18px;
  background: transparent;
  color: #718096;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s;
  white-space: nowrap;
  align-self: flex-end;
}
.btn-ghost:hover { border-color: #a0aec0; color: #4a5568; }

/* ── TABLE ── */
.table-wrap { 
  overflow-x: auto; width: 100%; 
 min-width: 0;}
table { 
  width: 100%; border-collapse: collapse; font-size: 14px;
  min-width: 600px; 
}
thead tr { background: #f7fafc; border-bottom: 2px solid #e2e8f0; }
th {
  padding: 11px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
}
th, td {
  min-width: 120px;
}
td { padding: 13px 16px; color: #2d3748; border-bottom: 1px solid #f0f4f8; }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover { background: #f7fdf9; }
tbody tr.row-highlight { background: #fffde7; }
.name-col { font-weight: 500; color: #1a202c; }
.id-chip {
  display: inline-block;
  background: #edf2f7;
  color: #4a5568;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
}
.action-col { display: flex; gap: 8px; align-items: center; }
.btn-edit {
  padding: 6px 14px;
  background: #ebf8ff;
  color: #2b6cb0;
  border: 1px solid #bee3f8;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-edit:hover { background: #bee3f8; }
.btn-delete {
  padding: 6px 14px;
  background: #fff5f5;
  color: #c53030;
  border: 1px solid #fed7d7;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-delete:hover { background: #fed7d7; }
.empty { text-align: center; padding: 40px !important; color: #a0aec0; font-size: 14px; }

/* ── STATUS BADGES ── */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}
.badge-present { background: #e6f4ec; color: #276749; }
.badge-absent  { background: #fff5f5; color: #c53030; }
.badge-late    { background: #fffbeb; color: #b7791f; }

.readonly-banner {
  background: #fffbeb;
  color: #b7791f;
  border-bottom: 1px solid #fbd38d;
  padding: 10px 32px;
  font-size: 13px;
  font-weight: 500;
}
</style>