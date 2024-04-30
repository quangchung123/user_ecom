import {sideBarOptions} from "../config";
import ButtonSidebar from "../components/Field/ButtonSidebar";
import {useLocation} from "react-router-dom";

const Sidebar = ({isShowing}) => {
  const location = useLocation();
  const {pathname} = location;
  return (
    <ul>
      {sideBarOptions.map((item, index) => {
        const active = pathname === item.route;
        return (
          <ButtonSidebar
            key={index}
            route={item.route}
            className={`flex items-center px-2 py-3 mt-1
            rounded hover:bg-accent group cursor-pointer
            dark:hover:bg-gray-800
            ${active? 'bg-[#ebf0fd]':''}
            ${active? 'dark:bg-gray-700' : ''}`
          }
          >
            <span
              dangerouslySetInnerHTML={{ __html: `${item.icon}` }}
              className={`${active? 'text-primary':'text-icon'} text-xl ${isShowing ? 'ml-1':'mr-2'}`}
            ></span>
            <span className={`${isShowing ? 'hidden':'font-bold opacity-80 text-base'} dark:text-white`}>{item.name}</span>
          </ButtonSidebar>
       )})}
    </ul>
  )
}
export default Sidebar;