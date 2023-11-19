<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
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
    <div class="col-span-2 place-self-end self-center">
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
    <div class="col-span-1 place-self-end self-center">
      <Button variant="ghost" class="p-2" @click="toggleDark()">
        <Icon name="ph:moon-fill" v-if="!isDark" class="h-5 w-5" />
        <Icon name="ph:sun-dim-fill" v-else class="h-5 w-5" />
        <span class="sr-only">Toggle dark mode</span>
      </Button>
    </div>
  </nav>

  <!-- Mobile navbar -->
  <nav class="lg:hidden flex justify-between px-4 py-5">
    <NuxtLink class="text-lg font-semibold" to="/"> Jobnav </NuxtLink>
    <Dialog>
      <DialogTrigger>
        <Icon name="ph:list-bold" class="w-7 h-auto" />
      </DialogTrigger>
      <DialogContent class="right-0 top-[20%]" widthIcon="w-7">
        <NuxtLink
          class="p-2"
          v-for="(centerLink, index) in centerLinks"
          :key="index"
          :to="centerLink.destination"
        >
          {{ centerLink.name }}
        </NuxtLink>
        <NuxtLink
          v-for="(rightLink, index) in rightLinks"
          :key="index"
          :to="rightLink.destination"
          class="even:bg-[#FFB84C] even:rounded-lg even:text-white p-2 w-auto &:nth-child(2):underline"
        >
          {{ rightLink.name }}
        </NuxtLink>
        <div class="flex items-center space-x-2">
          <Switch id="dark-mode" v-model:checked="isDark" />
          <Label for="dark-mode">Enable Dark Mode</Label>
        </div>
      </DialogContent>
    </Dialog>
  </nav>
</template>

<style scoped></style>