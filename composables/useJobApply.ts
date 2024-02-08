import type { Job } from "~/types/job";
type SHEET_SIDES = "top" | "right" | "bottom" | "left";

const isModalShow = ref(false);
const detailJob = ref<Job | null>(null);
const side = ref<SHEET_SIDES>("right");

export const useJobApply = () => {
  function showDetailModal(job: Job, sideSheet: SHEET_SIDES = "right") {
    detailJob.value = job;
    side.value = sideSheet;
    isModalShow.value = true;
  }
  return {
    isModalShow,
    side,
    detailJob,
    showDetailModal,
  };
};
