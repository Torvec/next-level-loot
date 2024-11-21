"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useThemeDispatch } from "@/lib/theme-provider";

export default function ThemeSelect() {
  const dispatch = useThemeDispatch();

  return (
    <div className="divide-x">
      <Button
        onClick={() => dispatch({ type: "SET", theme: "dark" })}
        className="rounded-l-xl rounded-r-none bg-muted-foreground"
      >
        <Moon size={24} />
      </Button>
      <Button
        onClick={() => dispatch({ type: "SET", theme: "light" })}
        className="rounded-l-none rounded-r-xl bg-muted-foreground"
      >
        <Sun size={24} />
      </Button>
    </div>
  );
}
