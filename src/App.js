import { useEffect, useState } from "react";
import "./App.css";

const Web3 = require("web3");

export default function App() {
  const [loadingWeb3, setLoadingWeb3] = useState(true);
  const [isWeb3, setIsWeb3] = useState(null);

  const getEthEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      setIsWeb3(true);
      setLoadingWeb3(false);
      return;
    }
    setIsWeb3(false);
    setLoadingWeb3(false);
  };

  useEffect(() => {
    getEthEnabled();
  }, []);

  if (loadingWeb3) return `Loading web 3`;

  return <>{isWeb3 ? <Web3App /> : <NoWeb3App />}</>;
}

function Web3App() {
  return (
    <>
      <h1>Web 3 blockbuster app</h1>
    </>
  );
}

function NoWeb3App() {
  return (
    <>
      <h1>
        No web 3 instance provided. Please use something like metamask to view
        this app.
      </h1>
    </>
  );
}
