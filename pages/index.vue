<script setup lang="ts">
const { user, isLogedIn } = useAuthStore();
</script>
<template>
  <div>
    <Hero />
    <!-- Content -->

    <!-- BUG: Still not reactive -->
    <ClientOnly>
      <pre>{{ user }}</pre>
      <pre>{{ isLogedIn }}</pre>
    </ClientOnly>
  </div>
</template>
