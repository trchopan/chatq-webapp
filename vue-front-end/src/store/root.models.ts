export interface IDialog {
  title: string;
  message: string;
  persistent: boolean;
}

export interface ISetting {
  value: string;
  text: string;
}

export const LANGUAGE_SETTINGS: ISetting[] = [
  { value: "vi", text: "🇻🇳 Tiếng Việt" },
  { value: "en", text: "🇬🇧 English" }
];

export const VIETNAMESE_LANGUAGE = LANGUAGE_SETTINGS[0];

export const ENGLISH_LANGUAGE = LANGUAGE_SETTINGS[1];

export const THEME_SETTINGS: ISetting[] = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" }
];

export const DARK_THEME = THEME_SETTINGS[1];

export interface IProfile {
  uid?: string;
  displayName: string;
  photoURL: string;
}

export const USERS_COLLECTION = "users";
