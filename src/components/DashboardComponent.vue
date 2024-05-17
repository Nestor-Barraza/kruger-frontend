<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2 class="headline font-weight-bold mb-0">Users</h2>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            v-if="!loading"
            :headers="headers"
            :items="users"
            :search="search"
            :footer-props="{
              'items-per-page-options': [10, 20, 50, 100]
            }"
          >
          </v-data-table>
          <v-progress-linear
            v-else
            indeterminate
            color="primary"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from '../services/apiClient';

export default {
  name: 'UserList',
  data: () => ({
    headers: [
      { title: 'Username', key: 'username' },
      { title: 'Role', key: 'role' },
      { title: 'ID Number', key: 'IDNumber' },
      { title: 'First Name', key: 'firstName' },
      { title: 'Last Name', key: 'lastName' },
      { title: 'Email', key: 'email' },
      { title: 'Date of Birth', key: 'dateOfBirth' },
      { title: 'Home Address', key: 'homeAddress' },
      { title: 'Mobile Phone', key: 'mobilePhone' },
      { title: 'Vaccination Status', key: 'vaccinationStatus' },
      { title: 'Vaccine Type', key: 'vaccineType' },
      { title: 'Vaccination Date', key: 'vaccinationDate' },
      { title: 'Number of Doses', key: 'numberOfDoses' },
    ],
    users: [],
    loading: true,
  }),
  methods: {
    formatDate(date) {
      if (!date) return '';
      const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
  },
  async mounted() {
    try {
      const response = await api.get('/users');
      this.users = response.data;
      this.loading = false;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
};
</script>