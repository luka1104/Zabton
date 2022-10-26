import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  )
}

export default App
