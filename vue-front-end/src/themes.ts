import { ISetting } from "./store/root.models";

export const darkTheme = {
  "--theme-background": "black",
  "--theme-background-card": "grey",
  "--theme-color": "white",
  "--theme-link": "#42b983"
};

export const lightTheme = {
  "--theme-background": "white",
  "--theme-background-card": "#fafafa",
  "--theme-color": "#2c3e50",
  "--theme-link": "#42b983"
};

export const setBodyProperties = (properties: { [key: string]: string }) => {
  const bodyStyles = document.body.style;
  Object.entries(properties).forEach(([key, value]) => {
    bodyStyles.setProperty(key, value);
  });
};
