import { ChakraProvider } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { createContext, useState } from "react";

import "@/styles/swiper.css";

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);

export const UserContext = createContext();

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  return (
    <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </UserContext.Provider>
  );
}
