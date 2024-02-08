<script lang="ts" setup>
import type { Job } from "~/types/job";

const { job } = defineProps<{
  job?: Job;
}>();

const { isModalShow, detailJob, side } = useJobApply();
</script>

<template>
  <Sheet v-model:open="isModalShow">
    <!-- <SheetTrigger>
      <Button variant="default" class="w-full my-2 font-semibold"
        >Apply</Button
      ></SheetTrigger
    > -->
    <SheetContent :side="side">
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          {{ job }}
          <h1>{{ job?.title }}</h1>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
