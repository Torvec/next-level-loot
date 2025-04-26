"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { type Themes, type ThemeAction } from "@/types/types";

const ThemeContext = createContext<Themes>("");
const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction>>(() => {});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, "");

  useEffect(() => {
    const storedTheme = initTheme("theme");
    if (storedTheme !== "") {
      dispatch({ type: "SET", theme: storedTheme as Themes });
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch({ type: "SET", theme: "dark" });
    } else {
      dispatch({ type: "SET", theme: "light" });
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

function initTheme(key: string) {
  const storedTheme = localStorage.getItem(key);
  return storedTheme ? storedTheme : "";
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}

function themeReducer(state: Themes, action: ThemeAction) {
  switch (action.type) {
    case "SET":
      localStorage.setItem("theme", action.theme);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(action.theme);
      return action.theme;
    default:
      return state;
  }
}
