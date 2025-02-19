import { useContext } from "react";
import { DarkModeContext } from "../Context API/DarkModeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-800 shadow-md"
    >
      {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-900" />}
    </button>
  );
};

export default DarkModeToggle;
