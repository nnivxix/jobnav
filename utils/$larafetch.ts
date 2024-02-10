import { $fetch } from "ofetch";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

// Export a function named $larafetch that initializes the fetch client.
export const $larafetch = $fetch.create({
  // Include credentials for cross-origin requests.
  credentials: "include",
  async onRequest({ request, options }) {
    const { backendUrl, frontendUrl } = useRuntimeConfig().public;
    // const event = process.nitro ? useEvent() : null;
    // Get the CSRF token from the event or the cookie.
    let token = useCookie(CSRF_COOKIE).value;

    // On the client side, initiate a CSRF request and get the token from the cookie set by Laravel.
    if (
      process.client &&
      ["post", "delete", "put", "patch"].includes(
        options?.method?.toLowerCase() ?? "",
      )
    ) {
      token = await initCsrf();
    }

    // Define headers with the Accept header and CSRF token.
    let headers: any = {
      accept: "application/json",
      ...options?.headers,
    };

    if (token) {
      headers[CSRF_HEADER] = token;
    }

    if (process.server) {
      headers = {
        ...headers,
        ...useRequestHeaders(["cookie"]),
        referer: frontendUrl,
      };
    }

    // Update the options with the headers and base URL.
    options.headers = headers;
    options.baseURL = backendUrl;
  },
  async onResponseError({ response }) {
    const status = response.status;
    if ([500].includes(status)) {
      console.error("[Laravel Error]", response.statusText, response._data);
    }
  },
});

// Function to initialize the CSRF token.
async function initCsrf() {
  const { backendUrl } = useRuntimeConfig().public;
  const existingToken = useCookie(CSRF_COOKIE).value;

  if (existingToken) return existingToken;

  // Make a request to get the CSRF token.
  await $fetch("/sanctum/csrf-cookie", {
    baseURL: backendUrl,
    credentials: "include",
  });

  return useCookie(CSRF_COOKIE).value;
}
