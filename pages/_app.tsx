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
import { useRouter } from 'next/router';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../store/store';

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
  const router = useRouter()
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    setUserLoading(true)
    AOS.init()
    const token = localStorage.getItem('token') || ''
    axios
      .get('/api/user', { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response: any) => {
        if (response?.data?.user) {
          setUser(response.data.user)
        }
        setUserLoading(false)
      })
      .catch((error: any) => {
        setUserLoading(false)
      })

  }, [])

  useEffect(() => {
    if (router.asPath === '/verify') {
      return
    }
    if (user?.verificationCode) {
      router.push('/verify')
    }
  }, [user])

  const modifiedProps = {
    ...pageProps,
    user,
    setUser,
  }

  return (
    <>
      <Provider store={store}>
        <ToastContainer position='top-right' autoClose={5000} />
        <ConfigProvider theme={theme}>
          <Layout>
            <Component {...modifiedProps} />
          </Layout>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default MyApp
