export type LoginCredentials = {
  email: string;
  password: string;
};
export const useAuth = () => {
  async function login(credentials: LoginCredentials) {
    useLaravelFetch("/sanctum/csrf-cookie");
    const { data } = useLaravelFetch("/api/login", {
      method: "POST",
      body: credentials,
    });
    console.log(data);
  }

  return {
    login,
  };
};
