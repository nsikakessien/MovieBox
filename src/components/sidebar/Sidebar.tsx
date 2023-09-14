import { useState } from "react";
import HomeIcon from "../../assets/svg/home-icon.svg";
import MovieIcon from "../../assets/svg/movie-icon.svg";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import TVIcon from "../../assets/svg/tv.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import LogOutIcon from "../../assets/svg/logout.svg";
import { NavLink } from "react-router-dom";
import { useAppState } from "../../context/AppContext";

interface Menu {
  icon: string;
  title: MenuTitles;
  path: string;
}

enum MenuTitles {
  Home = "Home",
  Movies = "Movies",
  TVSeries = "TV Series",
  Upcoming = "Upcoming",
  LogOut = "Log Out",
}

const menus: Menu[] = [
  {
    icon: HomeIcon,
    title: MenuTitles.Home,
    path: "/",
  },
  {
    icon: MovieIcon,
    title: MenuTitles.Movies,
    path: "/movies",
  },
  {
    icon: TVIcon,
    title: MenuTitles.TVSeries,
    path: "/tv-series",
  },
  {
    icon: CalendarIcon,
    title: MenuTitles.Upcoming,
    path: "/upcoming",
  },
];

const Sidebar = () => {
  const { state } = useAppState();
  const [menuStatus, setMenuStatus] = useState(MenuTitles.Home);

  return (
    <aside
      className={`fixed w-56 h-full no-scrollbar bg-white border border-[rgba(0, 0, 0, 0.30)] rounded-r-[45px] pt-[59px] pb-[41px] inset-y-0 left-0
        transform transition duration-200 ease-in-out overflow-y-auto z-20
        md:translate-x-0 ${
          state.showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center pb-6 px-4">
        <Logo />
      </div>
      <ul className="flex flex-col mb-[50px]">
        {menus.map((menu) => (
          <NavLink to={menu.path} key={menu.title}>
            <div
              className={`flex gap-2 py-7 pl-[42px] bg-[#be123c10] ${
                menuStatus === menu.title
                  ? "bg-[#be123c10] border-r-2 border-[#BE123C]"
                  : "bg-white"
              }`}
              onClick={() => setMenuStatus(menu.title)}
            >
              <img src={menu.icon} alt={menu.title} />
              <p
                className={` text-md font-semibold ${
                  menuStatus === menu.title ? "text-[#be123c]" : "text-grey-100"
                } hover:text-[#be123c]`}
              >
                {menu.title}
              </p>
            </div>
          </NavLink>
        ))}
      </ul>
      <div className="px-7 mb-4">
        <div className="border-[#BE123C70] border bg-[#F8E7EB40] px-4 pt-[42px] pb-4 rounded-[20px]">
          <p className="max-w-[137px] font-semibold text-[15px] text-[#33333380] mb-[9px]">
            Play movie quizes and earn free tickets
          </p>
          <p className="text-xs font-medium text-[#666666] mb-2">
            50k people are playing now
          </p>
          <div className="flex justify-center">
            <button className="text-[#BE123C] bg-[#BE123C20] border rounded-[30px] font-medium text-xs py-[6px] px-[17px]">
              Start playing
            </button>
          </div>
        </div>
      </div>
      <NavLink
        to={""}
        className={`flex gap-2 py-7 pl-[42px]  ${
          menuStatus === MenuTitles.LogOut
            ? "bg-[#be123c10] border-r-2 border-[#BE123C]"
            : "bg-white"
        }`}
      >
        <img src={LogOutIcon} alt="Log Out" />
        <p className="text-grey-100 text-md font-semibold">
          {MenuTitles.LogOut}
        </p>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
