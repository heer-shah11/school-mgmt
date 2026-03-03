<script>
export default {
  data() {
    return {
      data: [],
      currentTable: "students"
    }
  },
  methods: {
    loadData(table) {
      this.currentTable = table
      fetch(`http://localhost:3000/${table}`)
        .then(res => res.json())
        .then(result => {
          this.data = result
        })
        .catch(err => console.error(err))
    }
  },
  mounted() {
    this.loadData("students")
  }
}
</script>

<template>
  <div>
    <h1>School Management System</h1>

    <button @click="loadData('students')">Students</button>
    <button @click="loadData('teachers')">Teachers</button>
    <button @click="loadData('subjects')">Subjects</button>
    <button @click="loadData('attendance')">Attendance</button>

    <p v-if="data.length === 0">No data found.</p>

    <table border="1" v-if="data.length">
      <thead>
        <tr>
          <th v-for="(value, key) in data[0]" :key="key">
            {{ key }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="(value, key) in row" :key="key">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>