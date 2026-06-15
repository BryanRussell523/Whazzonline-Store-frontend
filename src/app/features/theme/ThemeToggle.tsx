import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../theme/themeSlice";
import type { RootState } from "../../../store/store";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 border rounded"
    >
      {mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}