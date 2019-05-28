import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/lang/en";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: messages
  }
});

export type Language = "en" | "vi";

function setI18nLanguage(lang: Language) {
  i18n.locale = lang;
  document.querySelector("html")!.setAttribute("lang", lang);
  return lang;
}

const loadedLanguages: Language[] = ["en"]; // our default language that is preloaded

export async function loadLanguageAsync(lang: Language) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const msgs = await import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`);
      i18n.setLocaleMessage(lang, msgs.default);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    }
    return setI18nLanguage(lang);
  }
  return lang;
}
