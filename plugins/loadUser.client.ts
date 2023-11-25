import { useAuthStore, type UserStorage } from "./../stores/authStore";
export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useAuthStore();

  if (!user.user) {
    user.$patch({
      user: JSON.parse(localStorage.getItem("user") as string) as UserStorage,
    });
  }
});
