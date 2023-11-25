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

const useLaravelFetch = (path: string, options?: Partial<LaravelFetchOptions>) => {
  let headersOption: any = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const cookie = useCookie("XSRF-TOKEN");
  if (cookie.value) {
    headersOption["X-XSRF-TOKEN"] = cookie.value as string;
  }

  return useFetch(path, {
    baseURL: useRuntimeConfig().public.backendUrl,
    credentials: "include",
    headers: {
      ...headersOption,
      ...options?.headers,
    },
    method: options?.method,
    body: options?.body,
    watch: false,
  });
};

export default useLaravelFetch;
