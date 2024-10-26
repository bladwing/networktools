import {
  faHome,
  faPlug,
  // faBullhorn,
  // faUserFriends,
  // faTools,
  
  // faBox,
  // faChevronLeft,
  // faChevronRight,
  
  // faWifi,
  // faLaptop,
  // faChartBar,
  // faPhone,
  // faEnvelope,
} from "@fortawesome/free-solid-svg-icons";



interface MenuItem {
  icon: any;
  text: string;
  path: string;
  roles: string[]; 
}

export const menuItems: MenuItem[] = [
  { icon: faHome, text: "Home", path: `/dashboard`, roles: ["user", "admin"] },
  { icon: faPlug, text: "Posts", path: `/tools-list`, roles: ["user", "admin"] },
  // { icon: faUserFriends, text: "Users", path: `/users`, roles: ["admin"] },
  // { icon: faBox, text: "Modules", path: `/modules`, roles: ["user","admin"] },
  // { icon: faTools, text: "Site Settings", path: `/settings`, roles: ["admin"] },
];
