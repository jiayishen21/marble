import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserType } from '../types';

const theme = {
  components: {
    Input: {
      colorPrimary: '#2f5a8d',
      colorSecondary: '#2f5a8d',
      fontFamily: "Hind",

    }
  },
  token: {
    colorPrimary: '#5687a8',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init()
  }, [])
  const [user, setUser] = useState<UserType | undefined>(undefined)

  const modifiedProps = {
    ...pageProps,
    user,
    setUser,
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} />
      <ConfigProvider theme={theme}>
        <Layout>
          <Component {...modifiedProps} />
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default MyApp
