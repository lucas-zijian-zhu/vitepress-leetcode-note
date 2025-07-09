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
                text: "100.Same Tree",
                link: "/binary-tree-general/100.md",
              },
              {
                text: "104.Maximum Depth of Binary Tree",
                link: "/binary-tree-general/104.md",
              },
              {
                text: "124.Binary Tree Maximum Path Sum",
                link: "/binary-tree-general/124.md",
              },
              {
                text: "129.Sum Root to Leaf Numbers",
                link: "/binary-tree-general/129.md",
              },
              {
                text: "222.Count Commplete Tree Nodes",
                link: "/binary-tree-general/222.md",
              },
              {
                text: "236.Lowest Common Ancestor of a Binary Tree",
                link: "/binary-tree-general/236.md",
              },
            ],
          },
          {
            text: "1D-DP",
            collapsed: true,
            items: [
              {
                text: "139.Binary Tree Vertical Order Traversal",
                link: "1D-DP/139.md",
              },
              {
                text: "300.Longest Increasing Subsequence",
                link: "1D-DP/300.md",
              },
              {
                text: "322.Coin Change",
                link: "1D-DP/322.md",
              },
            ],
          },
          {
            text: "Multidimensional DP",
            collapsed: true,
            items: [
              {
                text: "5.Longest Palindromic Substring",
                link: "multidimensional-dp/5.md",
              },
              {
                text: "63.Unique Paths II",
                link: "multidimensional-dp/63.md",
              },
              {
                text: "64.Minimum Path Sum",
                link: "multidimensional-dp/64.md",
              },
              {
                text: "72.Edit Distance",
                link: "multidimensional-dp/72.md",
              },
              {
                text: "97.Interleaving String",
                link: "multidimensional-dp/97.md",
              },
              {
                text: "120.Triangle",
                link: "multidimensional-dp/120.md",
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
