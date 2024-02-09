<script lang="ts" setup>
import { useForm, Form, Field as FormField, ErrorMessage } from "vee-validate";

import type { Job } from "~/types/job";
import { useToast } from "./ui/toast/use-toast";

const { job } = defineProps<{
  job?: Job;
}>();

const { isModalShow, detailJob, side } = useJobApply();

const jobForm = useForm();
const { toast } = useToast();

const submitForm = jobForm.handleSubmit(async () => {
  const form = new FormData();
  Object.entries(jobForm.values).forEach(([key, value]) => {
    form.append(key, value);
  });

  const response = await useLaravelFetch(`/api/jobs/${job?.uuid}/apply`, {
    method: "POST",
    body: form,
  });

  toast({
    title: "Success",
    description: response.data.value?.message,
  });

  jobForm.handleReset();
  isModalShow.value = false;
});
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
        <SheetTitle>Apply Job as {{ job?.title }}</SheetTitle>
        <SheetDescription>
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-2">
            <FormField
              v-slot="{ componentField, field, errorMessage }"
              name="cover_letter"
            >
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ handleChange, field }" name="attachment">
              <FormItem>
                <FormLabel>Attachment</FormLabel>
                <FormControl>
                  <Input type="file" @change="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <Button type="submit"> Apply </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
