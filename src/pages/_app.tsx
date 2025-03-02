import "@/styles/globals.css";
import type { AppProps } from "next/app";

import CartContextProvider from "@/context/cartContext";
import Header from "@/components/layout/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full">
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </div>
  );
}
