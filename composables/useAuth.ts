import { useStorage, StorageSerializers } from "@vueuse/core";

export type LoginCredentials = {
  email: string;
  password: string;
};
export const useAuth = () => {
  async function login(credentials: LoginCredentials) {
    useLaravelFetch("/sanctum/csrf-cookie");
    const { data } = await useLaravelFetch("/api/login", {
      method: "POST",
      body: credentials,
    });
    const user = useStorage("user", {}, undefined, { serializer: StorageSerializers.object });
    user.value = {
      token: data.value?.token,
      id: data.value.data.id,
      email: data.value.data.email,
      name: data.value.data.name,
      username: data.value.data.username,
    };
  }

  return {
    login,
  };
};
