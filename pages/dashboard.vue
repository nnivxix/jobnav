<script setup lang="ts">
// const { user, isLogedIn, token } = storeToRefs(useAuthStore());
const { user } = useAuth();
</script>
<template>
  <div>
    <!-- <pre>{{ token }}</pre> -->
    <pre>{{ user }}</pre>
    <!-- <pre>{{ isLogedIn }}</pre> -->
    <img :src="user?.avatar" :alt="user?.name" />
  </div>
</template>

<style scoped></style>
