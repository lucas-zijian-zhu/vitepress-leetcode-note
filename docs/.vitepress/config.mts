import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Leetcode Notes",
  description: "A collection of my algorithm notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: "local",
    },

    sidebar: [
      {
        items: [
          {
            text: "Binary Tree General",
            collapsed: true,
            items: [
              {
                text: "124.Binary Tree Maximum Path Sum",
                link: "/binary-tree-general/124.md",
              },
              {
                text: "129.Sum Root to Leaf Numbers",
                link: "/binary-tree-general/129.md",
              },
              {
                text: "236.Lowest Common Ancestor of a Binary Tree",
                link: "/binary-tree-general/236.md",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/hellforever/vitepress-leetcode-note",
      },
    ],
  },
});
