import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import axios from 'axios';

// Redux
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from '../store/store';
import { setUser, setUserLoading } from '../store/userSlice';

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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <AppComponent Component={Component} pageProps={pageProps} router={router} />
      </Provider>
    </>
  )
}

const AppComponent: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  const user = useSelector((state: RootState) => state.user.user);
  const userLoading = useSelector((state: RootState) => state.user.userLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUserLoading(true))
    AOS.init()
    const token = localStorage.getItem('token') || ''
    axios
      .get('/api/user', { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response: any) => {
        if (response?.data?.user) {
          dispatch(setUser(response.data.user))
        }
        dispatch(setUserLoading(false))
      })
      .catch((error: any) => {
        dispatch(setUserLoading(false))
      })
  }, [])

  useEffect(() => {
    console.log(user)
    if (router.asPath === '/verify') {
      return
    }
    if (user?.verificationCode) {
      router.push('/verify')
    }
  }, [user])

  const modifiedProps = {
    ...pageProps,
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
