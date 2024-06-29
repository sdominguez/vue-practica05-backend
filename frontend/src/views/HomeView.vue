
<template>
  <v-row align-content="center" justify="center">
    <v-col cols="10">
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.usuario }}</td>
              <td>{{ user.correo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        this.users = response.data.usuarios;
        console.log("Usuarios obtenidos:", this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: Arial, sans-serif;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>