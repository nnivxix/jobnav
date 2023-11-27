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

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLogedIn = computed(() => !!user.value);

  async function login(credentials: LoginCredentials) {
    await useLaravelFetch("/sanctum/csrf-cookie");
    const { data, error }: { data: any; error: any } = await useLaravelFetch("/api/login", {
      method: "POST",
      body: credentials,
    });
    if (data.value) {
      token.value = data.value.token;
      localStorage.setItem("token", data.value.token);
      navigateTo("/");
      return;
    }

    /** TODO
     * Handle error
     *
     */

    console.log(error);
  }
  async function fetchUser() {
    const { data, error }: { data: any; error: any } = await useLaravelFetch("/api/users");
    user.value = data.value?.data as User;
  }

  return { user, isLogedIn, login, fetchUser, token };
});
