// import http from "../http-common";
import * as fb from "../firebase";
import router from "../router/index";

class UserDataService {
  async login(form) {
    const { user } = await fb.auth.signInWithEmailAndPassword(
      form.email,
      form.password
    );
    // const userProfile = await fb.usersCollection.doc(user.uid).get();
    localStorage.setItem("user_id", user.uid);
    localStorage.setItem("loggedIn", true);
    return user;
  }
  async register(form) {
    const { user } = await fb.auth.createUserWithEmailAndPassword(
      form.email,
      form.password
    );
    return await fb.usersCollection.doc(user.uid).set({
      name: form.name
    });
    // return fb.auth.createUserWithEmailAndPassword(form.email, form.password);
  }
  async fetchUserProfile() {
    const user_id = localStorage.setItem("user_id");
    const userProfile = await fb.usersCollection.doc(user_id).get();
    if (router.currentRoute.path === "/login") {
      router.push("/");
    }
    localStorage.setItem("user_profile", userProfile);
    return userProfile;
  }
  async logout() {
    await fb.auth.signOut();
    localStorage.setItem("loggedIn", false);
  }
}

export default new UserDataService();
