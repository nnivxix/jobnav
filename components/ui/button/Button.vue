<script setup lang="ts">
import { buttonVariants } from ".";
import { cn } from "@/lib/utils";

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
  as?: string;
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <component
    :is="as"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <Icon name="lucide:loader-2" class="animate-spin mr-1" v-if="isLoading" />
    <slot />
  </component>
</template>
