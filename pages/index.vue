<script setup lang="ts">
import type { Job, Jobs } from "~/types/job";
import type { PaginateResponse } from "~/types/response";

const { data: jobs } = await useFetch<PaginateResponse<Jobs>>("/api/jobs", {
  baseURL: useRuntimeConfig().public.backendUrl,
});
</script>
<template>
  <div>
    <Hero />
    <!-- Content -->
    <JobsGrid :jobs="jobs?.data!"> </JobsGrid>
  </div>
</template>
