export interface User {
  avatar: string;
  bio: string;
  cover: string;
  email: string;
  experiences: any[];
  id: number;
  jobs: any[];
  name: string;
  user_skills: any[]; // Assuming user_skills should be an array of strings
  username: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLogedIn = computed(() => !!user.value);
  function updateUser(data: any) {
    user.value = data;
  }
  function updateToken(data: any) {
    user.value = data;
  }

  return { user, isLogedIn, token, updateUser, updateToken };
});
