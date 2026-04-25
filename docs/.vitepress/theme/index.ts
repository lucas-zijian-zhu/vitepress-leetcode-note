import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import GiscusComments from "./GiscusComments.vue";
import VercelAnalytics from "./VercelAnalytics.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(VercelAnalytics),
      "doc-after": () => h(GiscusComments),
    });
  },
};
