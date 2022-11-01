import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { Layout } from 'layout'
import { AccountContext, AccountProvider } from 'contexts/account';

// const useAccessControll = () => {
//   const { user, loading } = useContext(AccountContext)
//   const router = useRouter()
//   useEffect(() => {
//     if (!loading && !user) router.replace('/mypage/auth')
//   }, [router])
// }

function App({ Component, pageProps }: AppProps) {
  // useAccessControll()
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
