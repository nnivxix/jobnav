<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);

const defaultValue = "item-1";

const accordionItems = [
  {
    value: "item-1",
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    title: "Is it unstyled?",
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
  {
    value: "item-3",
    title: "Can it be animated?",
    content: "Yes! You can use the transition prop to configure the animation.",
  },
];
</script>

<template>
  <div>
    <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
      <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
        <AccordionTrigger>{{ item.title }}</AccordionTrigger>
        <AccordionContent>
          {{ item.content }}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
  <div>
    <Button variant="ghost" class="p-2" @click="toggleDark()">
      <Icon name="ph:moon-fill" v-if="!isDark" class="h-5 w-5" />
      <Icon name="ph:sun-dim-fill" v-else class="h-5 w-5" />
      <span class="sr-only">Toggle dark mode</span>
    </Button>
    <NuxtWelcome />
  </div>
</template>
