import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import "@/styles/globals.css";
import { StateContent } from "@/context/StateContext";
import store from "@/store";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <StateContent>
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateContent>
      </Provider>
    </>
  );
}
