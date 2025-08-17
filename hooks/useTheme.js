import { useContext } from "react";
import { themeContext } from "../Contexts/ThemeContext";

export const useTheme = () => useContext(themeContext)