import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { useAppState } from "../../context/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { state, dispatch } = useAppState();

  return (
    <div className="relative w-full flex">
      <Sidebar />
      <div
        className="md:ml-56 w-full"
        onClick={() => {
          if (state.showSidebar) {
            dispatch({ type: "CLOSE" });
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
