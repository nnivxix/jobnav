<script lang="ts" setup>
import type { Job } from "~/types/job";
import type { SingleResponse } from "~/types/response";
const { params } = useRoute();

const { data: job } = useLaravelFetch<SingleResponse<Job>>(
  `api/jobs/${params.uuid}`,
  {
    baseURL: useRuntimeConfig().public.backendUrl,
  },
);

const { showDetailModal } = useJobApply();
</script>

<template>
  <!-- <pre>{{ job }}</pre> -->
  <main class="relative max-w-7xl mx-auto grid gap-5 grid-cols-8 px-4 lg:px-0">
    <article class="col-span-full lg:col-span-6">
      <h1 class="py-4 text-2xl">{{ job?.data.title }}</h1>
      <div class="grid gap-3 grid-cols-8">
        <img
          class="col-span-5 lg:col-span-1"
          :src="job?.data.company.avatar"
          :alt="job?.data.company.name"
          width="160"
        />
        <div class="lg:col-start-2 lg:col-span-4 col-span-full">
          <h2>
            <strong>{{ job?.data.company.name }}</strong>
          </h2>
          <p>
            {{ job?.data.location }} &centerdot; Updated at
            {{ job?.data.posted_at }}
          </p>
        </div>
        <div class="hidden lg:block lg:col-start-7 lg:col-span-2 col-span-full">
          <Button
            :disabled="job?.data.is_applied_by_user"
            variant="default"
            class="w-full my-2 font-semibold"
            @click="showDetailModal(job?.data!)"
            >Apply</Button
          >
          <Button variant="outline" class="w-full my-2">Share</Button>
        </div>
      </div>
      <h3 class="py-3 text-lg font-semibold">About This Job</h3>
      <p>{{ job?.data.description }}</p>
    </article>
    <aside class="col-span-full lg:col-span-2">
      <h1 class="py-4 text-xl">
        Jobs from <strong>{{ job?.data.company.name }}</strong>
      </h1>
      <div>
        <!-- TODO: List related jobs/ jobs from company -->
      </div>
    </aside>

    <div class="fixed z-20 lg:hidden bottom-0 left-0 bg-background w-full px-4">
      <div class="lg:col-start-7 lg:col-span-2 col-span-full">
        <Button
          :disabled="job?.data.is_applied_by_user"
          variant="default"
          class="w-full my-2 font-semibold"
          @click="showDetailModal(job?.data!, 'bottom')"
          >Apply</Button
        >
        <Button variant="outline" class="w-full my-2">Share</Button>
      </div>
    </div>
  </main>
  <JobApply :job="job?.data!" />
</template>

<style scoped></style>
