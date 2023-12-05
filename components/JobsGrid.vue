<script setup lang="ts">
import type { Jobs } from "~/types/job";

const { jobs } = defineProps<{
  jobs: Jobs;
}>();
</script>
<template>
  <div
    v-if="jobs.length"
    class="max-w-7xl p-3 mx-auto mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
  >
    <JobCard v-for="job in jobs" :key="job.uuid" :job="job" />
  </div>
</template>

<style scoped></style>
