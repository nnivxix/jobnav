interface UserResponse {
  data: User;
}
export type LoginCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  async function login(credentials: LoginCredentials) {
    await useLaravelFetch("/sanctum/csrf-cookie");
    const { data, error } = await $larafetch("/api/login", {
      method: "POST",
      body: credentials,
    });
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
