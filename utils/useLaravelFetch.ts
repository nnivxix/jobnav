// TODO: Refactor useLaravelFetch

export interface LaravelFetchOptions {
  method:
    | "GET"
    | "HEAD"
    | "PATCH"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "head"
    | "patch"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace";
  body?: any | null;
  headers?: any;
}

const useLaravelFetch = (
  path: string,
  options?: Partial<LaravelFetchOptions>,
) => {
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
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"]),
      referer: useRuntimeConfig().public.frontendUrl,
    };
  }

  // TODO: Set error
  return useFetch(path, {
    baseURL: useRuntimeConfig().public.backendUrl,
    credentials: "include",
    headers: {
      ...headers,
    },
    method: options?.method,
    body: options?.body,
    watch: false,
  });
};

export default useLaravelFetch;
