import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { Layout } from 'layout'
import { AccountProvider } from 'contexts/account';

function App({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <Layout>
          <AccountProvider>
            <Component {...pageProps} />
          </AccountProvider>
        </Layout>
        <ToastContainer />
      </ChakraProvider>
  )
}

export default App
