import Menu from "../../assets/svg/menu.svg";
import { useAppState } from "../../context/AppContext";

const Logo = () => {
  const { state, dispatch } = useAppState();

  const openSidebar = () => {
    dispatch({ type: "OPEN" });
  };

  const closeSidebar = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <img
      src={Menu}
      alt="Menu Icon"
      className="block md:hidden cursor-pointer"
      onClick={() => {
        if (state.showSidebar) {
          closeSidebar();
        } else {
          openSidebar();
        }
      }}
    />
  );
};

export default Logo;
