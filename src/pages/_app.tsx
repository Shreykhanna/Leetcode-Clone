import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Leet Code Clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Web application that contains leetcode problems and video solution"
        />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
// import * as React from "react";
// import Head from "next/head";
// import { AppProps } from "next/app";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import { CacheProvider, EmotionCache } from "@emotion/react";
// import theme from "../../config/theme";
// import createEmotionCache from "../../config/createEmotionCache";

// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
//   emotionCache?: EmotionCache;
// }

// export default function MyApp(props: MyAppProps) {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
//   return (
//     <CacheProvider value={emotionCache}>
//       <Head>
//         <title>Leet Code Clone</title>
//         <meta name="viewport" content="initial-scale=1, width=device-width" />
//         <link rel="icon" href="/favicon.png" />
//         <meta
//           name="description"
//           content="Web application that contains leetcode problems and video solution"
//         />
//       </Head>
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }
