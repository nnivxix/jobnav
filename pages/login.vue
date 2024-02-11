<script setup lang="ts">
export interface UserResponse {
  data: User;
}
import { useForm, Form, Field as FormField } from "vee-validate";
definePageMeta({
  middleware: "login",
});
const { login } = useAuth();
const { updateUser } = useAuthStore();

const form = useForm({
  initialValues: {
    email: "hanasa@hanasa.com",
    password: "password",
  },
});

const { submit, inProgress } = useSubmit(async () => await login(form.values), {
  async onSuccess(data) {
    // const user = await fetchUser();
    // const userData = ref<UserResponse | null>(user.value as UserResponse);
    // updateUser(userData.value?.data);
    return navigateTo("/dashboard");
  },
  onError(error) {
    form.setFieldError("email", error.data.errors.message);
  },
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
            <Input
              type="email"
              placeholder="your_name@mail.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Input
                :type="showPassword ? 'text' : 'password'"
                v-bind="componentField"
              />
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
        <Button type="submit" :is-loading="inProgress"> Log in </Button>
      </div>
    </form>
  </div>
</template>
