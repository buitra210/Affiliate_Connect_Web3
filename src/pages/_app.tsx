import AppTheme from "../components/AppTheme";
import { AppProps } from "next/app";
import AuthContextProvider from "@centic-scoring/context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HighchartsGlobalConfig from "@centic-scoring/components/Highcharts/HighchartsGlobalConfig";
import { Provider } from "react-redux";
import Script from "next/script";
import { store } from "@centic-scoring/redux/store";
import Head from "next/head";
import { Meta } from "@centic-scoring/components/Meta";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//SOME LIB CSS
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InitUserPermission from "@centic-scoring/module/InitUserPermission";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function CenticApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* Product script */}
      <Script
        id="google-analytic-script"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MR83Q8TL');`,
        }}
      />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Meta
        title={"Centic Web3 Growth"}
        description={
          "A comprehensive solution that scores, tracks, and analyzes entire blockchain entities."
        }
        url={"https://centic.io"}
      />
      <AppTheme>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AuthContextProvider>
                <ToastContainer
                  limit={3}
                  theme="colored"
                  hideProgressBar
                  position="top-right"
                  autoClose={1500}
                  closeButton={false}
                  toastStyle={{
                    // "--toastify-font-family": primaryFont.style.fontFamily,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                />
                <HighchartsGlobalConfig />
                <InitUserPermission />
                {getLayout(<Component {...pageProps} />)}
              </AuthContextProvider>
            </LocalizationProvider>
          </Provider>
        </QueryClientProvider>
      </AppTheme>
    </>
  );
}
