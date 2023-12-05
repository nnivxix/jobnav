export interface UserResponse {
  data: User;
}
export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();
  const { fetchUser } = useAuth();

  if (auth.user) return;
  const data = await fetchUser();
  const userData = ref<UserResponse | null>(data.value as UserResponse);
  auth.updateUser(userData.value?.data);
});
