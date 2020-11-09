<template>
  <v-app class="grey lighten-4">
    <!-- Navbar here -->
    <NavBar />
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

export default {
  name: "App",

  components: {
    NavBar
  },

  data: () => ({
    //
  })
};
</script>
