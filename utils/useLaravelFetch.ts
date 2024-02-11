import type { UseFetchOptions } from "nuxt/app";
export function useLaravelFetch<T>(
  path: string,
  options: UseFetchOptions<T> = {},
) {
  let headers: any = {
    accept: "application/json",
    // "Content-Type": "application/json",
    ...options?.headers,
  };

  const cookie = useCookie("XSRF-TOKEN");
  if (cookie.value) {
    headers["X-XSRF-TOKEN"] = cookie.value as string;
  }

  // if (process.client) {
  //   const token = window.localStorage.getItem("token");
  //   if (token) {
  //     headers["Authorization"] = "Bearer " + token;
  //   }
  // }

  if (process.server) {
  }
  headers = {
    ...headers,
    ...useRequestHeaders(["referer", "cookie"]),
    referer: useRuntimeConfig().public.frontendUrl,
  };

  // TODO: Set error
  return useFetch(path, {
    baseURL: useRuntimeConfig().public.backendUrl,
    credentials: "include",
    ...options,
    watch: false,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}
