import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'
import Header from '../components/Header/index'
import Footer from '../components/Footer/index'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Box bg='#F1F2E6' minH='93vh'>
      <Header />
        <Box marginBottom='60px'>
          {children}
        </Box>
      <Footer />
    </Box>
  </>
)
