export interface UserStorage {
  id: number;
  name: string;
  username: string;
  email: string;
  token: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<UserStorage | null>(null);
  const isLogedIn = computed(() => !!user.value);

  return { user, isLogedIn };
});
