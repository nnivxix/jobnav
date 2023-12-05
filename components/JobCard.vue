<script lang="ts" setup>
import type { Job } from "~/types/job";

const { job } = defineProps<{
  job: Job;
}>();
</script>

<template>
  <div class="p-4 md:p-3 border border-[#FFB84C] rounded-lg">
    <NuxtLink :to="`job/${job.uuid}`" class="grid grid-cols-7 gap-2">
      <img
        :src="job.company.avatar"
        width="80"
        height="auto"
        class="rounded-full col-span-2"
        :alt="job.company.name"
      />
      <div class="flex flex-col justify-between col-span-5">
        <h3 class="font-semibold text-xl">{{ job.company.name }}</h3>
        <h4 class="text-lg">{{ job.title }}</h4>
        <div class="flex gap-2">
          <Icon name="ph:map-pin" class="w-4 h-auto" />
          <p>
            {{ job.location }}
          </p>
        </div>
      </div>
    </NuxtLink>
    <p class="py-6 line-clamp-3">{{ job.description }}</p>
    <Button variant="default" class="w-full my-2 font-semibold">Apply</Button>
    <Button variant="outline" class="w-full my-2">Save</Button>
  </div>
</template>

<style scoped></style>
