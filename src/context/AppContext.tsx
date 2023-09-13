/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type AppState = {
  showSidebar: boolean;
};

const initialState: AppState = {
  showSidebar: false,
};

type Action = { type: "OPEN" } | { type: "CLOSE" };

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Create a reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "OPEN":
      return { ...state, showSidebar: true };
    case "CLOSE":
      return { ...state, showSidebar: false };
    default:
      return state;
  }
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
