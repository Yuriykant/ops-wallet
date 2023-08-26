import { createContext } from "react";
import { useAppStore } from "./actions";

export const Context = createContext({} as ReturnType<typeof useAppStore>)