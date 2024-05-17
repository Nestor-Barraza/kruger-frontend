<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit User</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="ID Number" v-model="selectedUser.IDNumber" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Username" v-model="selectedUser.username" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="First Name" v-model="selectedUser.firstName" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Last Name" v-model="selectedUser.lastName" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select label="Role" v-model="selectedUser.role" :items="roles" required></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="Vaccination Status"
                v-model="selectedUserVaccinationStatus"
                :items="vaccinationStatuses"
                item-text="text"
                item-value="value"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Vaccine Type" v-model="selectedUser.vaccineType"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Vaccination Date"
                :value="formattedVaccinationDate"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Number of Doses"
                v-model="selectedUser.numberOfDoses"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import api from '../services/apiClient';

export default {
  name: 'EditUserModal',
  data() {
    return {
      roles: ['Admin', 'User'],
      vaccinationStatuses: ['Vaccinated', 'Not Vaccinated'],
      vaccinationDateMenu: false,
    };
  },
  computed: {
    ...mapState(['selectedUser']),
    dialog: {
      get() {
        return this.$store.state.editUserModalOpen;
      },
      set(value) {
        this.$store.commit('setEditUserModalOpen', value);
      },
    },
    selectedUserVaccinationStatus: {
      get() {
        return this.selectedUser.vaccinationStatus ? 'Vaccinated' : 'Not Vaccinated';
      },
      set(value) {
        this.selectedUser.vaccinationStatus = value === 'Vaccinated';
      },
    },
    formattedVaccinationDate() {
      if (this.selectedUser.vaccinationDate) {
        const dateParts = this.selectedUser.vaccinationDate.split('T')[0].split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        return `${month}/${day}/${year}`;
      }
      return '';
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('setEditUserModalOpen', false);
    },
    async saveUser() {
      try {
        await api.put(`/users/${this.selectedUser.IDNumber}`, this.selectedUser);
        this.closeModal();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
};
</script>