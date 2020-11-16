<template>
  <div>
    <!-- app bar -->
    <v-app-bar app dense color="white" elevate-on-scroll>
      <v-toolbar-title>
        <v-btn text to="/">
          <span class="grey--text">Aster</span>
          <span class="gey--text text-lighten-1">app</span>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-responsive max-width="300" class="mx-auto">
        <v-text-field
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-responsive>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-if="loggedIn === false">
            <v-list-item router to="/login">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item router to="/favorites">
              <v-list-item-title>Favorites</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
// import { auth } from "../firebase";
import UserDataService from "../services/UserDataService";
export default {
  name: "NavBar",
  props: { loggedIn: Boolean },
  data() {
    return {
      drawer: false,
      // loggedIn: true,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "mdi-account", text: "Profile", route: "/profile" }
      ]
    };
  },
  methods: {
    logout() {
      UserDataService.logout()
        .then(() => {
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_email");
          this.$toasted
            .success("User has been logged out successfully")
            .goAway(2000);
          this.$router.push({ name: "Login" });
          location.reload();
        })
        .catch(e => {
          console.log(e);
          this.$toasted
            .error("An error has occured please try again")
            .goAway(2000);
        });
    }
  }
  // created: {
  //   loggedIn() {
  //     auth.currentUser ? (this.loggedIn = true) : (this.loggedIn = false);
  //     console.log("loggedIn");
  //     console.log(auth.currentUser);
  //   }
  // }
};
</script>
