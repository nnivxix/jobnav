<script setup lang="ts">
import { useForm, Form, Field as FormField } from "vee-validate";
const form = useForm({
  initialValues: {
    email: "",
    password: "",
  },
});

const submit = form.handleSubmit((values: { email: string; password: string }) => {
  console.log("Form submitted!", values);
});
const showPassword = ref(false);
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-6 h-[70vh]">
    <main class="lg:col-start-1 lg:col-span-3 hidden lg:block"></main>
    <form
      @submit.prevent="submit"
      class="lg:col-start-4 lg:col-span-3 lg:self-center col-span-full flex flex-col gap-4 px-4 lg:px-0"
    >
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="your_name@mail.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Input :type="showPassword ? 'text' : 'password'" v-bind="componentField" />
              <Icon
                :name="showPassword ? 'ph:eye-light' : 'ph:eye-slash'"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2 cursor-pointer"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div>
        <Button type="submit"> Log in </Button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
