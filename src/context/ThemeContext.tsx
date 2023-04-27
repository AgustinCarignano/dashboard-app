import React, { createContext, useState } from "react";
import { ThemeContextType } from "../@types/theme";

const Themes = {
  light: {
    1: "#ffffff", //backgroundsidebar
    2: "#F8F8F8", //Main back
    3: "#EBF1EF", //light green buttons
    4: "#E8FFEE", //button variant succes back
    5: "#EEF9F2", //button viewNotes back
    6: "#F5F5F5", // columns lines
    7: "#D4D4D4", //tabs border
    8: "#B2B2B2", //user card email
    9: "#6E6E6E", //tabs inactives, details subtitles
    10: "#FFEDEC", //light red smallcards and buttons
    11: "#E23428", //aside link active, crossmark
    12: "#799283", //aside links, tables id, viewNotes empty
    13: "#787878", //smallcards content
    14: "#5AD07A", //checkmark, button variant succes text
    15: "#135846", //strong green buttons, tabs actives
    16: "#FB9F44", // yellow buttons
    17: "#393939", //smallcards, table titles, contatcpreview title
    18: "#00000014", //cards shadow, rows sahdow
    19: "#212121", //button viewNotes text, details bigdetails
    20: "#00000005", //header and aside shadow
    21: "#262626", //principal titles
    22: "#ebebeb", // cards previe border
    23: "#4e4e4e", //cards preview subject
    24: "#363636", // text content detail views
    25: "#ffffff", //buttons text
    26: "#1111111a", // traslucide container modal window
    27: "#135846", //button variant 2 letter
    28: "#0000001a", //row tables box shadow
    29: "#fdfdfd", //odd rows background
  },
  dark: {
    1: "#202020",
    2: "#171717",
    3: "#135846",
    4: "#5AD07A26",
    5: "#3D3D3D",
    6: "#202020",
    7: "#3D3D3D",
    8: "#686868",
    9: "#686868",
    10: "#E234281C",
    11: "#E23428",
    12: "#686868",
    13: "#787878",
    14: "#5AD07A",
    15: "#135846",
    16: "#FF9C3A",
    17: "#E8F2EF",
    18: "#0000001A",
    19: "#FFFFFF",
    20: "#0000006E",
    21: "#FFFFFF",
    22: "#202020",
    23: "#FFFFFF",
    24: "#E8F2EF",
    25: "#ffffff",
    26: "#11111190",
    27: "#ffffff",
    28: "#0000001a",
    29: "#1b1b1b",
  },
};

export const themeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export default function ThemeContextProvider(props: {
  children: React.ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  function handleThemeChange() {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <themeContext.Provider
      value={{ theme: Themes[currentTheme], handleThemeChange }}
    >
      {props.children}
    </themeContext.Provider>
  );
}
