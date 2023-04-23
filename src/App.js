/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo, createContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";


// APP FOR SENDING TOKEN STARTS HERE
// import type { Adapter, WalletError } from "@solana/wallet-adapter-base";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { Home } from "./pages/Home/Home";
import { Theme } from "./Theme";
import { Theme as MintApp } from "components/common/Theme";
import Subscription from "subscription";








export const AlertContext = createContext();


const Context = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  //const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => "https://solana-api.syndica.io/access-token/0VWYlEI9VqzgbwNyVPcXNffVN0e3ZTODtZfOaZQmHKN0cqVGgZEJlHBBx37QDOeW/rpc/", [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    //// eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    (error, adapter) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: "error" }
      );
      console.error(error, adapter);
    },
    [enqueueSnackbar]
  );

  return (
    <ConnectionProvider endpoint={ endpoint }>
      <WalletProvider wallets={ wallets } onError={ onError } autoConnect>
        <WalletDialogProvider>{ children }</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

//"start": "parcel src/index.html",
export const SendApp = () => {
  return (
    <Theme>
      <Context>
        <Home />
      </Context>
    </Theme>
  );
};










export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [alertDetails, setAlertDetails] = useState({ show: false, color: "black", message: "" })
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };



  const [provider, setProvider] = useState();
  const [walletKey, setWalletKey] = useState();


  const getProvider = () => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }
  };


  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);




  const connectWallet = async () => {
    console.log("Clicked")
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana?.connect();
        console.log("wallet account ", response?.publicKey?.toString());
        setWalletKey(response?.publicKey?.toString());
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };



  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await solana.disconnect();
      setWalletKey(undefined);
    }
  };


  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
console.log({routes},"kekekele")
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={ route.route } element={ route.component } key={ route.key } />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={ 99 }
      color="dark"
      sx={ { cursor: "pointer" } }
      onClick={ handleConfiguratorOpen }
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={ rtlCache }>
      <ThemeProvider theme={ darkMode ? themeDarkRTL : themeRTL }>
        <CssBaseline />
        { layout === "dashboard" && (
          <>
            <Sidenav
              color={ sidenavColor }
              brand={ (transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite }
              brandName="3D Root labs"
              routes={ routes }
              onMouseEnter={ handleOnMouseEnter }
              onMouseLeave={ handleOnMouseLeave }
            />
            <Configurator />
            { configsButton }
          </>
        ) }
        { layout === "vr" && <Configurator /> }
        <Routes>
          { getRoutes(routes) }
          <Route path="*" element={ <Navigate to="/dashboard" /> } />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={ darkMode ? themeDark : theme }>
      <CssBaseline />
      { layout === "dashboard" && pathname !== "/send" && pathname !== "/mint" && pathname !== "/subscription" && (
        <>
          <Sidenav
            color={ sidenavColor }
            brand={ require("./assets/logo.png") }
            brandName="3D Root Lab"
            routes={ routes }
            onMouseEnter={ handleOnMouseEnter }
            onMouseLeave={ handleOnMouseLeave }
          />
          <Configurator />
          { configsButton }
        </>
      ) }
      { layout === "vr" && <Configurator /> }
      <Routes>
        { getRoutes(routes) }
        {/* <Route path="/mint" element={ <MintApp /> } />
        <Route path="/send" element={ <SendApp /> } />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/history" element={<Subscription />} /> */}
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    </ThemeProvider>
  );
}










