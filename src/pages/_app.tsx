import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Logo from "@/assets/logo.svg";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-start h-screen justify-center">
      <header className="py-8 w-full max-w-[1180px] m-auto my-0">
        <Image src={Logo} alt="Ignite Shop Logo" />
      </header>
      <Component {...pageProps} />
    </div>
  );
}
