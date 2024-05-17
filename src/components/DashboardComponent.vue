<!-- eslint-disable vue/valid-v-slot -->
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
    :footer-props="{ 'items-per-page-options': [10, 20, 50, 100] }"
  >
    <template v-slot:item.vaccinationDate="{ item }">
      {{ formatDate(item.vaccinationDate) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn color="primary" @click="openEditModal(item.IDNumber)">
        <v-icon left>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-data-table>
          <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    <ModalComponent />
</template>

<script>
import api from '../services/apiClient';
import { mapActions } from 'vuex';
import ModalComponent from './ModalComponent.vue';
export default {
  name: 'UserList',
   components: {
    ModalComponent,
  },
  data: () => ({
    headers: [
      { title: 'ID Number', key: 'IDNumber' },
      { title: 'Username', key: 'username' },
      { title: 'Role', key: 'role' },
      { title: 'First Name', key: 'firstName' },
      { title: 'Last Name', key: 'lastName' },
      { title: 'Vaccination Status', key: 'vaccinationStatus' },
      { title: 'Vaccine Type', key: 'vaccineType' },
      { title: 'Vaccination Date', key: 'vaccinationDate' },
      { title: 'Number of Doses', key: 'numberOfDoses' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    users: [],
    loading: true,
  }),
  methods: {
     ...mapActions(['openEditModal']),
    formatDate(date) {
      if (!date) return '';
      const dateParts = date.split('T')[0].split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return `${month}/${day}/${year}`;
    },
   openEditModal(IDNumber) {
      console.log('Opening edit modal for user with IDNumber:', IDNumber);
      this.$store.dispatch('openEditModal', IDNumber);
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
<style>
.btn-row{
  flex-wrap: nowrap;
}
</style>