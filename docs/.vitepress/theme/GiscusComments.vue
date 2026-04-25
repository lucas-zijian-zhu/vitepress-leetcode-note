<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";

const repo = "lucas-zijian-zhu/vitepress-leetcode-note";
const repoId = "R_kgDOPBSOwg";
const category = "General";
const categoryId = "DIC_kwDOPBSOws4C7sIz";

const route = useRoute();
const { frontmatter, isDark } = useData();
const comments = ref<HTMLElement | null>(null);

const isConfigured = computed(() => Boolean(repoId && categoryId));
const isEnabled = computed(() => frontmatter.value.comments !== false);

function loadGiscus() {
  if (!comments.value || !isConfigured.value || !isEnabled.value) return;

  comments.value.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", repo);
  script.setAttribute("data-repo-id", repoId);
  script.setAttribute("data-category", category);
  script.setAttribute("data-category-id", categoryId);
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", isDark.value ? "dark" : "light");
  script.setAttribute("data-lang", "zh-CN");
  script.setAttribute("data-loading", "lazy");

  comments.value.appendChild(script);
}

watch(
  () => [route.path, isConfigured.value, isEnabled.value],
  async () => {
    await nextTick();
    loadGiscus();
  },
  { immediate: true },
);

watch(isDark, (dark) => {
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  iframe?.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: dark ? "dark" : "light",
        },
      },
    },
    "https://giscus.app",
  );
});
</script>

<template>
  <section v-if="isEnabled" class="notes-comments" aria-labelledby="notes-comments-title">
    <h2 id="notes-comments-title">访客评价</h2>

    <p v-if="!isConfigured" class="notes-comments__placeholder">
      评论功能已接入。请在
      <code>docs/.vitepress/theme/GiscusComments.vue</code>
      填入 <code>repoId</code> 和 <code>categoryId</code> 后启用。
    </p>

    <div ref="comments" />
  </section>
</template>
