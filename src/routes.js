import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import Payment from "./subscription";
import { Theme as MintApp } from "components/common/Theme";

// @mui icons
import Icon from "@mui/material/Icon";
import History from "pages/History";
import { Home } from "pages/Home/Home";
import Data from "pages/Data/Data";

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
  {
    type: "collapse",
    name: "History",
    key: "history",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/history",
    component: <History />,
  },
  {
    type: "collapse",
    name: "Mint",
    key: "mint",
    icon: <Icon fontSize="small">payment</Icon>,
    route: "/mint",
    component: <MintApp />,
  },
  {
    type: "collapse",
    name: "Send",
    key: "send",
    icon: <Icon fontSize="small">send</Icon>,
    route: "/send",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "Data",
    key: "data",
    icon: <Icon fontSize="small">data</Icon>,
    route: "/data",
    component: <Data />,
  },
];

export default routes;
