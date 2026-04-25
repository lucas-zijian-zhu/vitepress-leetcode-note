import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import GiscusComments from "./GiscusComments.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(GiscusComments),
    });
  },
};
