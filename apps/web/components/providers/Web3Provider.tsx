"use client";

import React from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { wagmiConfig } from "@/lib/wagmi.config";
import { Toaster } from "@/components/ui/Toaster";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:        1000 * 60,         // 1 min
      gcTime:           1000 * 60 * 5,     // 5 min
      retry:            2,
      refetchOnWindowFocus: false,
    },
  },
});

const rainbowDark = darkTheme({
  accentColor:          "#3b82f6",
  accentColorForeground: "white",
  borderRadius:         "medium",
  fontStack:            "system",
  overlayBlur:          "small",
});

const rainbowLight = lightTheme({
  accentColor:          "#3b82f6",
  accentColorForeground: "white",
  borderRadius:         "medium",
  fontStack:            "system",
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={{ lightMode: rainbowLight, darkMode: rainbowDark }}
            modalSize="compact"
            coolMode
          >
            {children}
            <Toaster />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
