<script setup lang="ts">
const centerLinks = ref([
  {
    name: "Find Jobs",
    destination: "/jobs",
  },
  {
    name: "Companies",
    destination: "/companies",
  },
  {
    name: "Tips",
    destination: "/tips",
  },
  {
    name: "Services",
    destination: "/services",
  },
]);

const rightLinks = ref([
  {
    name: "Login",
    destination: "/login",
  },
  {
    name: "Sign up",
    destination: "/sign-up",
  },
]);
</script>
<template>
  <nav class="hidden lg:grid grid-cols-12 gap-4 max-w-7xl mx-auto text-lg font-semibold mt-4">
    <NuxtLink to="/" class="col-span-3 py-2 font-bold"> Jobnav </NuxtLink>
    <div class="col-span-6 place-self-center">
      <NuxtLink
        v-for="(centerLink, index) in centerLinks"
        :key="index"
        :to="centerLink.destination"
        class="px-5 py-2"
      >
        {{ centerLink.name }}
      </NuxtLink>
    </div>
    <!-- Condition if unauthenticated -->
    <div class="col-span-3 place-self-end self-center">
      <NuxtLink
        v-for="(rightLink, index) in rightLinks"
        :key="index"
        :to="rightLink.destination"
        class="first:pr-5 py-2 [&:nth-child(2)]:py-2 px-5 [&:nth-child(2)]:bg-[#FFB84C] [&:nth-child(2)]:rounded-lg [&:nth-child(2)]:text-white"
      >
        {{ rightLink.name }}
      </NuxtLink>
    </div>
    <!-- Condition if authenticated -->
    <!-- Start code here -->
    <!-- End code here -->
  </nav>
  <nav></nav>
</template>

<style scoped></style>
