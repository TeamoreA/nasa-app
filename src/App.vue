<template>
  <v-app class="grey lighten-4">
    <!-- Navbar here -->
    <NavBar v-bind:logged-in="loggedIn"></NavBar>
    <!-- Page content here -->
    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>
    <!-- Footer here -->
    <!-- <Footer v-if="isLoggedIn === false" /> -->
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import { auth } from "./firebase";

export default {
  name: "App",

  components: {
    NavBar
  },
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    isLoggedIn() {
      auth.currentUser
        ? (this.loggedIn = true)
        : (this.loggedIn = false);
      console.log("loggedIn user email");
      console.log(auth.currentUser.email);
    }
  },
  created() {
    this.isLoggedIn();
  }
};
</script>
