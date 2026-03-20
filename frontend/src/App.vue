<script>
export default {
  data() {
    return {
      students: [],
      teachers: [],
      subjects: [],
      attendance: [],
      newName: "",
      newAge: "",
      editId: null,
      editName: "",
      editAge: "",
      activeTable: null
    };
  },
  methods: {
    async showTable(table) {
      this.activeTable = table;
      if (table === "students") await this.fetchStudents();
      if (table === "teachers") await this.fetchTeachers();
      if (table === "subjects") await this.fetchSubjects();
      if (table === "attendance") await this.fetchAttendance();
    },
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
    async addStudent() {
      await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.newName, age: this.newAge })
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
        body: JSON.stringify({ name: this.editName, age: this.editAge })
      });
      this.editId = null;
      this.fetchStudents();
    }
  }
};
</script>

<template>
  <div>
    <h1>School Management System</h1>

    <!-- NAV BUTTONS -->
    <button @click="showTable('students')">Students</button>
    <button @click="showTable('teachers')">Teachers</button>
    <button @click="showTable('subjects')">Subjects</button>
    <button @click="showTable('attendance')">Attendance</button>

    <!-- STUDENTS -->
    <div v-if="activeTable === 'students'">
      <h2>Students</h2>
      <input v-model="newName" placeholder="Name" />
      <input v-model="newAge" placeholder="Age" />
      <button @click="addStudent">Add</button>
      <div v-if="editId">
        <h3>Edit Student</h3>
        <input v-model="editName" />
        <input v-model="editAge" />
        <button @click="updateStudent">Update</button>
      </div>
      <table border="1">
        <tr><th>ID</th><th>Name</th><th>Age</th><th>Actions</th></tr>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>
            <button @click="editStudent(student)">Edit</button>
            <button @click="deleteStudent(student.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>

    <!-- TEACHERS -->
    <div v-if="activeTable === 'teachers'">
      <h2>Teachers</h2>
      <table border="1">
        <tr><th>ID</th><th>Name</th></tr>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{ teacher.id }}</td>
          <td>{{ teacher.name }}</td>
        </tr>
      </table>
    </div>

    <!-- SUBJECTS -->
    <div v-if="activeTable === 'subjects'">
      <h2>Subjects</h2>
      <table border="1">
        <tr><th>ID</th><th>Name</th></tr>
        <tr v-for="subject in subjects" :key="subject.id">
          <td>{{ subject.id }}</td>
          <td>{{ subject.name }}</td>
        </tr>
      </table>
    </div>

    <!-- ATTENDANCE -->
    <div v-if="activeTable === 'attendance'">
      <h2>Attendance</h2>
      <table border="1">
        <tr><th>ID</th><th>Student ID</th><th>Date</th><th>Status</th></tr>
        <tr v-for="record in attendance" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.student_id }}</td>
          <td>{{ record.date }}</td>
          <td>{{ record.status }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>