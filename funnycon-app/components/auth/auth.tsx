import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../../pages/api/ethersRPC";
import { Box, Button, Center, Text } from '@chakra-ui/react'

const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rpc.ankr.com/polygon_mumbai';

const Auth: React.FC = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

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

  return (
      <>
        <Center h='60vh'>
          <Box>
            <Button bg='white' h='140px' borderRadius='0' border='1px solid black' onClick={web3auth?.provider? logout : login}>
              <Text color='black'>
                久しぶりに<br />
                ログインしたら<br />
                最悪だった。<br />
                なんで？
              </Text>
            </Button>
            <Text color='black' fontWeight='bold' fontSize='sm' mt='10px'>
              ↑クリックしてログイン
            </Text>
          </Box>
        </Center>
      </>
  );
}

export default Auth;
