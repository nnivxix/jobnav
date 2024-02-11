interface UserResponse {
  data: User;
}
export type LoginCredentials = {
  email: string;
  password: string;
};

// const {  updateUser } = useAuthStore();

export const useAuth = () => {
  async function login(credentials: LoginCredentials) {
    await useLaravelFetch("/sanctum/csrf-cookie");
    const { data, error } = await useLaravelFetch("/api/login", {
      method: "POST",
      body: credentials,
    });
    if (data.value) {
      await fetchUser();
      navigateTo("/dashboard");
      return data;
    }

    /** TODO
     * Handle error
     *
     */
  }
  async function fetchUser() {
    const { data } = await useLaravelFetch("/api/users");
    const userData = ref<UserResponse | null>(data.value as UserResponse);
    return data;
  }

  async function logout(path: string = "/") {
    await useLaravelFetch("/api/logout", {
      method: "POST",
    });
    window.localStorage.removeItem("token");
    navigateTo(path);
  }

  return {
    login,
    logout,
    fetchUser,
  };
};
