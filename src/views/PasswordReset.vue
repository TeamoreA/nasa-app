<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Password Reset</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent>
        <v-text-field
          label="Enter your email to reset password"
          prepend-icon="mdi-email"
          v-model="email"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="resetPassword()" color="primary">Reset</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { auth } from "@/firebase";
export default {
  name: "PasswordReset",
  components: {},
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async resetPassword() {
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.$toasted
          .success("An password reset email has been sent successfully")
          .goAway(2000);
        this.$router.push({ name: "Login" });
      } catch (err) {
        this.$toasted.success(err).goAway(2000);
      }
    }
  }
};
</script>
