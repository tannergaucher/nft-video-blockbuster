import { useEffect, useState } from "react";
import "./App.css";

import Video from "./truffle/build/contracts/Video.json";

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

  return <>{isWeb3 ? <Web3App /> : <NoWeb3 />}</>;
}

function Web3App() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    async function getAccount() {
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

    getAccount();
  }, []);

  useEffect(() => {
    async function getContract() {
      const networkId = await window.web3.eth.net.getId();
      const networkData = Video.networks[networkId];

      if (networkData) {
        const abi = Video.abi;
        const address = networkData.address;
        const myContract = new window.web3.eth.Contract(abi, address);
        setContract(myContract);
      } else {
        window.alert("Smart contract not deployed to detected network");
      }
    }

    getContract();
  }, []);

  console.log(contract);

  return (
    <>
      {account && `Account: ${account}`}
      <h1>Web 3 blockbuster app</h1>
    </>
  );
}

function NoWeb3() {
  return (
    <>
      <h1>
        No web 3 instance provided. Please use something like metamask to view
        this app.
      </h1>
    </>
  );
}
