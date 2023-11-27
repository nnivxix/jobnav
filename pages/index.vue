<script setup lang="ts">
const { user, isLogedIn, token } = useAuthStore();
// fetchUser(user?.token as string);
</script>
<template>
  <div>
    <Hero />
    <!-- Content -->

    <!-- BUG: Still not reactive -->
    <pre>{{ token }}</pre>
    <pre>{{ user }}</pre>
    <pre>{{ isLogedIn }}</pre>
  </div>
</template>
