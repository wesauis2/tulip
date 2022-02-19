import { AppProps } from "next/app";
import "../styles/global.css";

function GlobalComponent({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default GlobalComponent;
