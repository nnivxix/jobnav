import { useAuthStore } from "../stores/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser } = useAuthStore();

  fetchUser();
  if (process.client) {
    useAuthStore().$patch({
      token: window.localStorage.getItem("token"),
    });
  }
});
