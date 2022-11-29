import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// react-router components
import { Redirect, Route, Switch, useNavigate, useLocation } from "react-router-dom";

const Phantom = () => {
  let history = useNavigate();

  const [provider, setProvider] = useState();
  const [walletKey, setWalletKey] = useState();
  const [show, setShow] = useState(false);

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
    console.log("Clicked");
    // @ts-ignore
    const { solana } = window;
const user = JSON.parse(localStorage.getItem("phantom_user"));
    if (solana) {
      try {
        const response = await solana.connect();
        console.log("wallet account ", response.publicKey.toString());
        setWalletKey(response.publicKey.toString());
            axios
              .put("https://phantom-app.herokuapp.com/api/users", {
                email: user.email,
                key: response.publicKey.toString()
              })
              .then((res) => {
              });
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

  return (
    <div>
      {provider && !walletKey && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
          onClick={connectWallet}
        >
          Connect to Phantom Wallet
        </button>
      )}

      {provider && walletKey && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              fontSize: "16px",
              padding: "15px",
              fontWeight: "bold",
              borderRadius: "5px",
              margin: "15px auto",
            }}
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
          <p onClick={() => setShow(!show)} style={{ fontSize: "12px", cursor: 'pointer' }}>
            <span style={{fontWeight:"500",marginRight: "1rem"}}>{show ? "Hide wallet key " : "Show wallet key"}</span> <span>{show && walletKey}</span>
          </p>
        </div>
      )}

      {!provider && (
        <p>
          No provider found. Install <a href="https://phantom.app/">Phantom Browser extension</a>
        </p>
      )}
    </div>
  );
};

export default Phantom;
