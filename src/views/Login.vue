<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="username"
          prepend-icon="mdi-account-circle"
          v-model="user.username"
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
      <v-btn color="primary">login</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="secondary"
        size="small"
        class="text-lighten-1"
        router
        to="/register"
        >Do not have an account?</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      showPassword: false,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {}
};
</script>
