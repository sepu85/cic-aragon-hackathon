import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { ethers } from "ethers";
import "./App.css";
import { Row, Col } from 'antd';
import { useExchangePrice, useGasPrice } from "./hooks";
import { Header, Account, Provider, Faucet, Ramp } from "./components";
import  OnboardForm from './components/OnboardForm';
import RequestForm from "./components/RequestForm";
import CommitForm from "./components/CommitForm";
import {
  useApps,
  useOrganization,
  usePermissions,
} from '@aragon/connect-react'



console.log(`setting infura provider: ${process.env.INFURA_ENDPOINT}`)
const mainnetProvider = new ethers.providers.InfuraProvider("mainnet",  process.env.INFURA_ENDPOINT)
const infuraEndpoint = process.env.INFURA_PROVIDER
const localProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER?process.env.REACT_APP_PROVIDER:"http://localhost:8545")


export const NavEnums = {
  HOME: 0,
  REQUEST: 1,
  COMMIT: 2
}

function App() {

  const [address, setAddress] = useState();
  const [injectedProvider, setInjectedProvider] = useState();
  const [currentStep, setCurrentStep] = useState(NavEnums.COMMIT);
  const price = useExchangePrice(mainnetProvider)
  const gasPrice = useGasPrice("fast")

  return (
    <div className="App">
      <Header setCurrentStep={(val) => setCurrentStep(val)} />
      <div style={{position:'fixed',textAlign:'right',right:0,top:0,padding:10}}>
        <Account
          address={address}
          setAddress={setAddress}
          localProvider={localProvider}
          injectedProvider={injectedProvider}
          setInjectedProvider={setInjectedProvider}
          mainnetProvider={mainnetProvider}
          infuraEndpoint={infuraEndpoint}
          price={price}
        />
      </div>
      <OnboardForm currentStep={currentStep} setCurrentStep={(val) => setCurrentStep(val)}/>
      <RequestForm currentStep={currentStep} address={address} injectedProvider={injectedProvider}/>
      <CommitForm currentStep={currentStep}  />
    </div>
  );
}

export default App;
