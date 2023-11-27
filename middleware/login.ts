export default defineNuxtRouteMiddleware((to, from) => {
  const { isLogedIn } = useAuthStore();

  if (isLogedIn) {
    return navigateTo("/");
  }
});
