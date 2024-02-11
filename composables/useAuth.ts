export type User = {
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
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ResetPasswordCredentials = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = <T = User>() => {
  return useState<T | undefined | null>("user", () => undefined);
};

export const useAuth = <T = User>() => {
  const router = useRouter();

  const user = useUser<T>();
  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      const data = await fetchCurrentUser();
      console.log(data);
      user.value = data;
    } catch {
      user.value = null;
    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;

    await $larafetch("/api/login", { method: "post", body: credentials });
    await refresh();
  }

  async function register(credentials: RegisterCredentials) {
    await $larafetch("/api/register", { method: "post", body: credentials });
    await refresh();
  }

  async function resendEmailVerification() {
    return await $larafetch<{ status: string }>(
      "/api/email/verification-notification",
      {
        method: "post",
      },
    );
  }

  async function logout(path: string = "/") {
    if (!isLoggedIn.value) return;

    await $larafetch("/api/logout", { method: "post" });
    user.value = null;

    await router.push("/");
  }

  async function forgotPassword(email: string) {
    return await $larafetch<{ status: string }>("/api/forgot-password", {
      method: "post",
      body: { email },
    });
  }

  async function resetPassword(credentials: ResetPasswordCredentials) {
    return await $larafetch<{ status: string }>("/api/reset-password", {
      method: "post",
      body: credentials,
    });
  }

  return {
    user,
    isLoggedIn,
    login,
    register,
    resendEmailVerification,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
  };
};

export const fetchCurrentUser = async <T = User>() => {
  try {
    const data = await $larafetch<T>("/api/users");
    return data.data;
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
