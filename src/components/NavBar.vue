<template>
  <v-app-bar id="navbar" height="100%" elevation="4" app>
    <v-app-bar-title>
      <v-img src="../assets/stepApp.png" contain max-width="20%" min-width="200px"></v-img>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="align-center">
        <router-link class="RLink" to="/home">
            <v-btn text class="bar-btn"> HOME </v-btn>
        </router-link>
        <router-link class="RLink" to="/create">
            <v-btn text class="bar-btn"> CREATE </v-btn>
        </router-link>
        <router-link class="RLink" to="/explore">
            <v-btn text class="bar-btn"> EXPLORE </v-btn>
        </router-link>
        <router-link  class="RLink" to="/profile">
            <v-btn text class="bar-btn"> PROFILE </v-btn>
        </router-link>
        <v-btn text class="bar-btn" @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
#navbar {
  background-color: white;
}

.bar-btn {
  font-size: 20px;
}
</style>

<script>
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "../stores/SecurityStore";
import router from "@/router";

export default {
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: (state) => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: "isLoggedIn",
    }),
    error() {
      return this.errorMsg;
    },
  },

  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: "getCurrentUser",
      $login: "login",
      $logout: "logout",
    }),

    async logout() {
      await this.$logout();
      router.push("/");
    },
  },
};
</script>
