import { useThemeStore } from "@/stores/theme.store";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="hidden relative flex w-full items-center rounded-xl border border-black/5 bg-black/5 p-1 transition-all duration-300 dark:border-white/10 dark:bg-white/5">
      {/* Sliding active backdrop */}
      <div
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out dark:bg-white/10 dark:shadow-none"
        style={{
          transform: theme === "light" ? "translateX(0)" : "translateX(100%)",
          left: theme === "light" ? "4px" : "-4px",
        }}
      />

      {/* Light Mode Button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={[
          "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-semibold transition-colors duration-200 select-none",
          theme === "light"
            ? "text-slate-900"
            : "text-secondary hover:text-slate-950 dark:hover:text-white",
        ].join(" ")}
      >
        <Sun className="size-3.5" aria-hidden />
        <span>Light</span>
      </button>

      {/* Dark Mode Button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={[
          "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-semibold transition-colors duration-200 select-none",
          theme === "dark"
            ? "text-white"
            : "text-secondary hover:text-slate-950 dark:hover:text-white",
        ].join(" ")}
      >
        <Moon className="size-3.5" aria-hidden />
        <span>Dark</span>
      </button>
    </div>
  );
}
