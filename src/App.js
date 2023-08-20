/** @format */
import "./App.css";
import React, { Component } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Header from "./components/layout/Header";
import Contact from "./components/element/Contact";
import PageNotFound from "./components/element/PageNotFound";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bsc } from "wagmi/chains";

export default function App() {
  const chains = [arbitrum, mainnet, polygon, bsc];
  const projectId = "224165c7c706bdb7b2da9e310d7bed63";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </WagmiConfig>
      <div className='z-[9999] relative'>
        <Web3Modal  projectId={projectId} ethereumClient={ethereumClient} />
      </div>{" "}
    </BrowserRouter>
  );
}
