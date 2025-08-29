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
                text: "11.Container With Most Water",
                link: "/array-string/11.md",
              },
              {
                text: "12.Integer to Roman",
                link: "/array-string/12.md",
              },
              {
                text: "13.Roman to Integer",
                link: "/array-string/13.md",
              },
              {
                text: "14.Longest Common Prefix",
                link: "/array-string/14.md",
              },
              {
                text: "15.3Sum",
                link: "/array-string/15.md",
              },
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
                text: "55.Jump Game",
                link: "/array-string/55.md",
              },
              {
                text: "58.Length of Last Word",
                link: "/array-string/58.md",
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
                text: "125.Valid Palindrome",
                link: "/array-string/125.md",
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
                text: "151.Reverse Words in a String",
                link: "/array-string/151.md",
              },
              {
                text: "167.Two Sum II - Input Array Is Sorted",
                link: "/array-string/167.md",
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
              {
                text: "392.Is Subsequence",
                link: "/array-string/392.md",
              },
            ],
          },
          {
            text: "Sliding Window",
            collapsed: true,
            items: [
              {
                text: "3.Longest Substring Without Repeating Characters",
                link: "/sliding-window/3.md",
              },
              {
                text: "76.Minimum Window Substring",
                link: "/sliding-window/76.md",
              },
              {
                text: "209.Minimum Size Subarray Sum",
                link: "/sliding-window/209.md",
              },
            ],
          },
          {
            text: "Matrix",
            collapsed: true,
            items: [
              {
                text: "36.Valid Sudoku",
                link: "/matrix/36.md",
              },
              {
                text: "48.Rotate Image",
                link: "/matrix/48.md",
              },
              {
                text: "54.Spiral Matrix",
                link: "/matrix/54.md",
              },
              {
                text: "73.Set Matrix Zeroes",
                link: "/matrix/73.md",
              },
              {
                text: "289.Game of Life",
                link: "/matrix/289.md",
              },
            ],
          },
          {
            text: "Hashmap",
            collapsed: true,
            items: [
              {
                text: "1.Two Sum",
                link: "/hashmap/1.md",
              },
              {
                text: "49.Group Anagrams",
                link: "/hashmap/49.md",
              },
              {
                text: "202.Happy Number",
                link: "/hashmap/202.md",
              }, 
              {
                text: "205.Isomorphic Strings",
                link: "/hashmap/205.md",
              },
              {
                text: "219.Contains Duplicate II",
                link: "/hashmap/219.md",
              },
              {
                text: "242.Valid Anagram",
                link: "/hashmap/242.md",
              },
              {
                text: "290.Word Pattern",
                link: "/hashmap/290.md",
              },
              {
                text: "383.Ransom Note",
                link: "/hashmap/383.md",
              },
            ],
          },
          {
            text:"Intervals",
            collapsed: true,
            items: [
              {
                text: "56.Merge Intervals",
                link: "/intervals/56.md",
              },
              {
                text: "57.Insert Interval",
                link: "/intervals/57.md",
              },
              {
                text: "452.Add Overloaded Operators",
                link: "/intervals/452.md"
              }
            ],
          },
          {
            text: "Stack",
            collapsed: true,
            items: [
              {
                text: "20.Valid Parentheses",
                link: "/stack/20.md",
              },
              {
                text: "71.Simplified Path",
                link: "/stack/71.md",
              },
              {
                text: "150.Evaluate Reverse Polish Notation",
                link: "/stack/150.md",
              },
              {
                text: "155.Min Stack",
                link: "/stack/155.md",
              },
              {
                text: "224.Basic Calculator",
                link: "/stack/224.md",
              }
            ],
          },
          {
            text: "LinkedList",
            collapsed: true,
            items: [
              {
                text: "2.Add Two Numbers",
                link: "/linked-list/2.md",
              },
              {
                text: "19.Remove Nth Node From End of List",
                link: "/linked-list/19.md",
              },
              {
                text: "21.Merge Two Sorted Lists",
                link: "/linked-list/21.md",
              },
              {
                text: "92.Reverse Linked List",
                link: "/linked-list/92.md"
              },
              {
                text: "141.Linked List Cycle",
                link: "/linked-list/141.md"
              }
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
