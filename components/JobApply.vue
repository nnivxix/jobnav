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

const { submit, inProgress } = useSubmit(
  async () => {
    const form = new FormData();
    Object.entries(jobForm.values).forEach(([key, value]) => {
      form.append(key, value);
    });
    return await $larafetch<ApplyJob>(`/api/jobs/${job?.uuid}/apply`, {
      method: "POST",
      body: form,
    });
  },
  {
    onSuccess(data) {
      toast({
        title: "Success",
        description: data.message,
      });

      jobForm.handleReset();
      isModalShow.value = false;
    },
    onError(error) {
      jobForm.setErrors(error.data?.errors);
      toast({
        title: "Failed",
        description: error.data.message,
      });
    },
  },
);
</script>

<template>
  <Sheet v-model:open="isModalShow">
    <SheetContent :side="side">
      <SheetHeader>
        <SheetTitle>Apply Job as {{ job?.title }}</SheetTitle>
        <SheetDescription>
          <form @submit.prevent="submit" class="grid grid-cols-1 gap-4">
            <FormField v-slot="{ componentField }" name="cover_letter">
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ handleChange }" name="attachment">
              <FormItem>
                <FormLabel>Attachment</FormLabel>
                <FormControl>
                  <Input type="file" @change="handleChange" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button type="submit">
              <span
                ><Icon
                  name="lucide:loader-2"
                  class="animate-spin mr-1"
                  v-if="inProgress"
              /></span>
              Apply
            </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
