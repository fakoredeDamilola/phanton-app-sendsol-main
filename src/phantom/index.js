import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import RewardModal from '../components/RewardModal'
import './style.css'

// react-router components
import { Redirect, Route, Switch, useNavigate, useLocation } from "react-router-dom";

const Phantom = () => {
  let history = useNavigate();

  const [provider, setProvider] = useState();
  const [walletKey, setWalletKey] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [reward, setReward] = useState('Start Stake')

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
              .put("https://phantom-api.herokuapp.com/api/users", {
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

  const chooseReward = () => {
    setShowModal(true)
  };

  return (
    <div>
      <button
        style={ {
          fontSize: "16px",
          padding: "15px",
          fontWeight: "bold",
          borderRadius: "5px",
        } }
       onClick = {()=>history("/send")} 
      >
        Send
      </button>
      {provider && !walletKey && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
            margin:"auto 10px"
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
              marginInline: "10px"
            }}
            onClick={chooseReward}
          >
            {reward}
          </button>
          <RewardModal show={showModal} onClose={() => {setShowModal(false)}}>
            <div className="modal-buttons">
              <button onClick={() => {setReward('NFT STAKE'); setShowModal(false)}}>NFT Stake</button>
              <button onClick={() => {setReward('MONITOR STAKE'); setShowModal(false)}}>MONITOR Stake</button>
            </div>
          </RewardModal>
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
      ) }
      <button
        style={ {
          fontSize: "16px",
          padding: "15px",
          fontWeight: "bold",
          borderRadius: "5px",
          marginRight: "15px "
        } }
        onClick={ () => history("/mint") }
      >
        Mint
      </button>
    </div>
  );
};

export default Phantom;
