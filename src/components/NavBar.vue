<template>
  <div>
    <!-- app bar -->
    <v-app-bar app dense color="white" elevate-on-scroll>
      <v-toolbar-title>
        <v-btn text to="/">
          <span class="grey--text">freak</span>
          <span class="gey--text text-lighten-1">an</span>
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
          <v-list-item>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      loggedIn: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "mdi-account", text: "Profile", route: "/profile" }
      ]
    };
  }
};
</script>
