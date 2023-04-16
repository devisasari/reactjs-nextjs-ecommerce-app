import Head from "next/head";
import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { createStore } from "redux";
import allReducers from "../redux/reducers";
import "../styles/global.css";

//REDUX devtools currently offline
const store = createStore(allReducers);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <html lang="en">
        <Head>
          <meta
            name="description"
            content="E-Commerce Store Front made with ReactJS & NextJS"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <title>Store</title>
        </Head>
      </html>

      <UserProvider>
        <Provider store={store}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </UserProvider>
    </>
  );
};

export default MyApp;
