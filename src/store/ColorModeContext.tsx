import * as React from "react";

interface IColorModeContext {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const ColorModeContext = React.createContext<IColorModeContext>({
  toggleColorMode: () => {},
  mode: "light",
});

export default ColorModeContext;
