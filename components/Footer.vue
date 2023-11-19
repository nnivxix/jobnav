<script setup lang="ts">
const socials = ref([
  {
    name: "Facebook",
    icon: "ri:facebook-circle-fill",
    link: "https://facebook.com/",
  },
  {
    name: "Instagram",
    icon: "ri:instagram-line",
    link: "https://www.instagram.com/",
  },
  {
    name: "Twitter",
    icon: "ri:twitter-x-line",
    link: "https://twitter.com/",
  },
  {
    name: "Youtube",
    icon: "ri:youtube-fill",
    link: "https://www.youtube.com/",
  },
]);
</script>
<template>
  <div class="grid grid-cols-6 max-w-7xl mx-auto mb-5 px-4 lg:px-0">
    <div class="md:col-start-1 flex flex-col md:col-span-2 col-span-full">
      <NuxtLink class="text-2xl font-semibold py-3" to="/"> Jobnav.id </NuxtLink>
      <NuxtLink to="mailto:hello@jobnav.id" class="py-3">hello@jobnav.id</NuxtLink>
      <div class="py-3 flex gap-4">
        <NuxtLink v-for="(social, index) in socials" :key="index" :to="social.link">
          <Icon :name="social.icon" class="w-6 h-auto" />
        </NuxtLink>
      </div>
      <p class="pt-5">Copyright © 2023 - All rights reserved</p>
    </div>
    <div
      class="md:col-end-7 md:col-span-2 md:self-end md:place-self-end flex md:flex-row flex-col col-span-full gap-2"
    >
      <NuxtLink to="/">Term of use</NuxtLink>
      <span class="hidden md:block">-</span>
      <NuxtLink to="/">Privacy Policy</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
