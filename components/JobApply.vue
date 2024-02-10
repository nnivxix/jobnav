<script lang="ts" setup>
import { useForm, Form, Field as FormField, ErrorMessage } from "vee-validate";
import type { Job } from "~/types/job";
import { useToast } from "./ui/toast/use-toast";

interface ApplyJob {
  message: string;
}
const { job } = defineProps<{
  job?: Job;
}>();

const { isModalShow, side } = useJobApply();

const jobForm = useForm();
const { toast } = useToast();

const submitForm = jobForm.handleSubmit(async () => {
  const form = new FormData();
  Object.entries(jobForm.values).forEach(([key, value]) => {
    form.append(key, value);
  });

  try {
    const response = await $larafetch<ApplyJob>(
      `/api/jobs/${job?.uuid}/apply`,
      {
        method: "POST",
        body: form,
      },
    );

    toast({
      title: "Success",
      description: response.message,
    });

    jobForm.handleReset();
    isModalShow.value = false;
  } catch (error: any) {
    jobForm.setErrors(error.data.errors);
  }
});
</script>

<template>
  <Sheet v-model:open="isModalShow">
    <SheetContent :side="side">
      <SheetHeader>
        <SheetTitle>Apply Job as {{ job?.title }}</SheetTitle>
        <SheetDescription>
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-2">
            <FormField
              v-slot="{ componentField, errorMessage }"
              name="cover_letter"
            >
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <span class="text-destructive">{{ errorMessage }}</span>
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ handleChange, errorMessage }"
              name="attachment"
            >
              <FormItem>
                <FormLabel>Attachment</FormLabel>
                <FormControl>
                  <Input type="file" @change="handleChange" />
                </FormControl>
                <span class="text-destructive">{{ errorMessage }}</span>
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
