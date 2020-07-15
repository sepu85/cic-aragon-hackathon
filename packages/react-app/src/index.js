import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import { Connect } from '@aragon/connect-react'

// This is the official Uniswap v1 subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
// const client = new ApolloClient({
//   uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
// });

ReactDOM.render(
  <Connect location="0xb91d81d5191e6E5869d917FeF264B6b1566713E6" connector="thegraph" options={{ chainId: 4 }}>
    <App />
  </Connect>,
  document.getElementById("root"),
);
