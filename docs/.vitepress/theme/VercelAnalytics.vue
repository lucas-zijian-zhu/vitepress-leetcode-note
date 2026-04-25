<script setup lang="ts">
import { inject } from "@vercel/analytics";
import { onMounted } from "vue";

onMounted(() => {
  inject({ framework: "vitepress" });
});
</script>

<template></template>
