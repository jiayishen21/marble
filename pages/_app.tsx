import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

// Redux
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState, AppDispatch } from "../store/store";
import { setUser, setUserLoading } from "../store/userSlice";
import { setShares, setSharesLoading } from "../store/shareSlice";
import { setPolls, setPollsLoading } from "../store/pollSlice";

const theme = {
  components: {
    Input: {
      colorPrimary: "#2f5a8d",
      colorSecondary: "#2f5a8d",
      fontFamily: "Montserrat",
    },
  },
  token: {
    colorPrimary: "#5687a8",
  },
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Marble Investments</title>
      </Head>
      <Provider store={store}>
        <AppComponent
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </Provider>
    </>
  );
}

const AppComponent: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);
  const userLoading = useSelector((state: RootState) => state.user.userLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUserLoading(true));
    dispatch(setSharesLoading(true));
    dispatch(setPollsLoading(true));
    AOS.init({
      duration: 1000,
      easing: "ease-out",
    });

    axios
      .get("/api/user")
      .then((response: any) => {
        if (response?.data?.user) {
          dispatch(setUser(response.data.user));
        }
        dispatch(setUserLoading(false));
      })
      .catch(() => {
        dispatch(setUserLoading(false));
      });

    axios
      .get("/api/shares")
      .then((response: any) => {
        if (response?.data?.shares) {
          dispatch(setShares(response.data.shares));
        }
        dispatch(setSharesLoading(false));
      })
      .catch(() => {
        //throw new Error('Server error: could not find investment data. Please try again later.')
      });

    axios
      .get("/api/poll")
      .then((response: any) => {
        if (response?.data?.polls) {
          dispatch(setPolls(response.data.polls));
        }
        dispatch(setPollsLoading(false));
      })
      .catch(() => {
        //throw new Error('Server error: could not find poll data. Please try again later.')
      });
  }, []);

  useEffect(() => {
    if (userLoading) return;
    const guestRestrictions = ["/dashboard", "/verify", "/shares", "/admin"];
    const verifyRestrictions = [
      "/login",
      "/register",
      "/forgot",
      "/dashboard",
      "/shares",
      "/admin",
    ];
    const userRestrictions = [
      "/login",
      "/register",
      "/forgot",
      "/verify",
      "/admin",
    ];
    const adminRestrictions = ["/login", "/register", "/verify", "/forgot"];

    const path = router.asPath;

    const isGuestRestricted = guestRestrictions.some((restriction) =>
      path.startsWith(restriction)
    );
    const isVerifyRestricted = verifyRestrictions.some((restriction) =>
      path.startsWith(restriction)
    );
    const isUserRestricted = userRestrictions.some((restriction) =>
      path.startsWith(restriction)
    );
    const isAdminRestricted = adminRestrictions.some((restriction) =>
      path.startsWith(restriction)
    );

    if (!user && isGuestRestricted) {
      router.push("/");
    } else if (user && user.verificationCode && isVerifyRestricted) {
      router.push("/verify");
    } else if (user && !user.verificationCode && user.accountType === "client" && isUserRestricted) {
      router.push("/dashboard");
    } else if (user && user.accountType === "admin" && isAdminRestricted) {
      router.push("/dashboard");
    }
  }, [user, userLoading, router.asPath]);

  const modifiedProps = {
    ...pageProps,
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <ConfigProvider theme={theme}>
        <Layout>
          <Component {...modifiedProps} />
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default MyApp;
