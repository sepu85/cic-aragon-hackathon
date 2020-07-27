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
  <Connect location="0x895a5F3613403F2B61D6d18Fe863C151A8078b8d" connector="thegraph" options={{ chainId: 4 }}>
    <App />
  </Connect>,
  document.getElementById("root"),
);
