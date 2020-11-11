<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="name"
          prepend-icon="mdi-account-circle"
          :counter="20"
          :rules="nameRules"
          required
          v-model="user.name"
        />
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          :rules="emailRules"
          required
          v-model="user.email"
        />
        <v-text-field
          label="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          prepend-icon="mdi-lock"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          required
          v-model="user.password"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="register()" :disabled="!valid" color="primary"
        >Resgister</v-btn
      >
      <v-spacer></v-spacer>
      <a href="/login" class="text-decoration-none font-weight-light body-2"
        >Do not have an account?</a
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      showPassword: false,
      user: {
        username: "",
        email: "",
        password: ""
      },
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 7) || "Password must be more than 7 characters"
      ]
    };
  },
  methods: {
    register() {
      UserDataService.register(this.user)
        .then(() => {
          this.$toasted
            .success("User has been registered successfully")
            .goAway(2000);
          this.$router.push({ name: "Login" });
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
