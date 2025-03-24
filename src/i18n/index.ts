import { createI18n } from "vue-i18n";

import zhCn from "./lang/zh-cn";
import en from "./lang/en";

const i18n = createI18n({
  legacy: false,
  locale: sessionStorage.getItem("localeLang") || "en",
  messages: {
    zhCn,
    en,
  },
});

export default i18n;
