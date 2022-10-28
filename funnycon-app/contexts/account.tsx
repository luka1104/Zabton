import React, { ReactNode, useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "pages/api/ethersRPC";

const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rpc.ankr.com/polygon_mumbai';

type Props = {
  children: ReactNode
}

export interface AccountContextInterface {
  web3auth: Web3Auth | null
  provider: SafeEventEmitterProvider | null
  address: string
  setAddress: Function
  getAddress: Function
  login: Function
  logout: Function
}
export const AccountContext = React.createContext<AccountContextInterface>({} as AccountContextInterface);

export const AccountProvider = ({ children }: Props) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)
  const [address, setAddress] = useState<string>('')

  const getAddress = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address)
  };

  const login = async () => {
    console.log(web3auth);
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log(web3authProvider);
    if (web3authProvider) setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  useEffect(() => {
    console.log(clientId, API_URL);

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: API_URL,
          },
        });
        setWeb3auth(web3auth);
        await web3auth.initModal();if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if(!provider) return
    getAddress()
  }, [provider])

  return (
    <AccountContext.Provider
      value={{
        web3auth,
        provider,
        address,
        setAddress,
        getAddress,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
