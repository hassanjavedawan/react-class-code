/** @format */

import React from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useConnect, useEnsName } from "wagmi";

const Home = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  function truncate(str, n) {
    return str.length > n ? str.slice(0, 4) + "..." + str.slice(-4) : str;
  }
  return (
    <div className=' h-screen flex justify-center items-center'>
      <button
      onClick={open}
        className='w-[150px] text-center inline-flex items-center justify-center gap-x-3 rounded-full px-8 py-4 font-medium text-white transition transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 sm:w-[195px]'
        style={{
          background: "linear-gradient(32deg, #F42D32 68.96%, #FCCB4C 100%)",
          boxShadow: "0px 25px 30px 0px rgba(21, 0, 53, 0.16)",
        }}>
        {" "}
        {isConnected
          ? truncate(`${ensName ? `${ensName} (${address})` : address}`, 8)
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Home;
