import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import Payment from "./subscription"

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
    {
    type: "collapse",
    name: "Subscription",
    key: "subscription",
    icon: <Icon fontSize="small">subscriptions</Icon>,
    route: "/subscription",
    component: <Payment />,
  },
];

export default routes;
