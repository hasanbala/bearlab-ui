import { createContext, useContext } from "react";
import type { DropdownContextValue } from "../types/dropdown.types";

export const DropdownContext = createContext<DropdownContextValue>({});

export const useDropdownContext = () => useContext(DropdownContext);
