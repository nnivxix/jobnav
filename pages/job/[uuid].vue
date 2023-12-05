<script lang="ts" setup>
const { params } = useRoute();

const { data: job } = useFetch(`api/jobs/${params.uuid}`, {
  baseURL: useRuntimeConfig().public.backendUrl,
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    {{ job }}
  </div>
</template>

<style scoped></style>
