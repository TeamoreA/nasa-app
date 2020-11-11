<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent>
        <v-text-field
          label="email"
          prepend-icon="mdi-account-circle"
          v-model="user.email"
        />
        <v-text-field
          label="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          v-model="user.password"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="login()" color="primary">login</v-btn>
      <v-spacer></v-spacer>
      <a href="/register" class="text-decoration-none font-weight-light body-2"
        >Do not have an account?</a
      >
    </v-card-actions>
    <a
      href="/password-reset"
      class="text-decoration-none mx-2 my-4 font-weight-light body-2"
      >Forgot password?</a
    >
  </v-card>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      showPassword: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      UserDataService.login(this.user)
        .then(() => {
          //   localStorage.setItem("user_name", this.user.name);
          localStorage.setItem("user_email", this.user.email);
          this.$toasted
            .success("User has been logged in successfully")
            .goAway(2000);
          this.$router.push({ name: "Dashboard" });
        })
        .catch(e => {
          console.log(e);
          this.$toasted
            .error("An error has occured please try again")
            .goAway(2000);
        });
    }
  }
};
</script>
