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
            text: "Array and String",
            collapsed: true,
            items: [
              {
                text: "26.Remove Duplicates from Sorted Array",
                link: "/array-string/26.md",
              },
              {
                text: "27.Remove Element",
                link: "/array-string/27.md",
              },
              {
                text: "42.Trapping Rain Water",
                link: "/array-string/42.md",
              },
              {
                text: "45.Jump Game II",
                link: "/array-string/45.md",
              },
              {
                text: " 55.Jump Game",
                link: "/array-string/55.md",
              },
              {
                text: "80.Remove Duplicates from Sorted Array II",
                link: "/array-string/80.md",
              },
              {
                text: "88.Merge Sorted Array",
                link: "/array-string/88.md",
              },
              {
                text: "121.Best Time to Buy and Sell Stock",
                link: "/array-string/121.md",
              },
              {
                text: "122.Best Time to Buy and Sell Stock II",
                link: "/array-string/122.md",
              },
              {
                text: "134.Gas Station",
                link: "/array-string/134.md",
              },
              {
                text: "135.Candy",
                link: "/array-string/135.md",
              },
              {
                text: "169.Majority Element",
                link: "/array-string/169.md",
              },
              {
                text: "189.Rotate Array",
                link: "/array-string/189.md",
              },
              {
                text: "238.Product of Array Except Self",
                link: "/array-string/238.md",
              },
              {
                text: "274.H-Index",
                link: "/array-string/274.md",
              },
            ],
          },
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
              {
                text: "123.Best Time to Buy and Sell Stock III",
                link: "multidimensional-dp/123.md",
              },
              {
                text: "188.Best Time to Buy and Sell Stock IV",
                link: "multidimensional-dp/188.md",
              },
              {
                text: "221.Maximal Square",
                link: "multidimensional-dp/221.md",
              },
              {
                text: "309.Best Time to Buy and Sell Stock with Cooldown",
                link: "multidimensional-dp/309.md",
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
