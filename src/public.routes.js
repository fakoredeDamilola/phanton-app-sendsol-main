import Dashboard from "layouts/dashboard";
import Login from "layouts/authentication/sign-in";
import Registration from "layouts/authentication/sign-up";
import { IoHome } from "react-icons/io5";

const publicRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/login",
    icon: <IoHome size="15px" color="inherit" />,
    component: Login,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/registration",
    icon: <IoHome size="15px" color="inherit" />,
    component: Registration,
    noCollapse: true,
  },
];

export default publicRoutes;
