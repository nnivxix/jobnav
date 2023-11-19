<script setup lang="ts">
import { useForm, Form, Field as FormField } from "vee-validate";
const form = useForm({
  initialValues: {
    search: "",
  },
});

const onSubmit = form.handleSubmit((values: { search: string }) => {
  console.log("Form submitted!", values.search);
});
</script>
<template>
  <main class="grid grid-cols-8 gap-4 max-w-7xl mx-auto mt-20">
    <div class="md:col-span-4 col-span-full px-4 lg:px-0">
      <h1 class="text-5xl text-[#4D7AFF] font-semibold py-7">
        Your Dream Job Awaits Start Your Search Today!
      </h1>
      <p class="text-[#26323] text-lg">
        Whether you're looking for your first job or transitioning to a new career, our platform
        offers a wide range of job opportunities to match your skills and experience.
      </p>
      <form @submit="onSubmit" class="flex flex-col lg:flex-row mt-6">
        <div class="lg:w-10/12 mb-3">
          <FormField v-slot="{ componentField }" name="search">
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Back-end"
                  v-bind="componentField"
                  class="border border-[#FFB84C] lg:rounded-tr-none lg:rounded-br-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          type="submit"
          class="bg-[#FFB84C] px-9 text-white font-semibold text-lg lg:rounded-tl-none lg:rounded-bl-none"
        >
          Search
        </Button>
      </form>
    </div>
    <div class="md:col-span-3 md:col-end-9 hidden md:block">
      <img src="/assets/hero.png" alt="hero" />
    </div>
  </main>
</template>
