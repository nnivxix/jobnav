import { useLocalStorage, useStorage, StorageSerializers } from "@vueuse/core";

export type LoginCredentials = {
  email: string;
  password: string;
};

const userStore = useAuthStore();
export const useAuth = () => {
  async function login(credentials: LoginCredentials) {
    await useLaravelFetch("/sanctum/csrf-cookie");
    const { data, error }: { data: any; error: any } = await useLaravelFetch("/api/login", {
      method: "POST",
      body: credentials,
    });

    const user = useStorage("user", {});
    if (data.value) {
      user.value = {
        id: data.value?.data.id,
        email: data.value?.data.email,
        username: data.value.data.username,
        name: data.value?.data.name,
        token: data.value?.token,
      };
      userStore.$patch({
        user: {
          id: data.value?.data.id,
          email: data.value?.data.email,
          username: data.value.data.username,
          name: data.value?.data.name,
          token: data.value?.token,
        },
      });
      navigateTo("/");
    }
    /** TODO
     * Handle error
     *
     */
  }

  return {
    login,
  };
};
