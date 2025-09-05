"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { anvil, zksync } from "wagmi/chains";

export default getDefaultConfig({
  appName: "T-sender App",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_WALLET_PROJECT_ID!,
  //   Use non-null assertion (!)
  // If you’re 100% sure the env variable will always exist
  // Every dApp that relies on WalletConnect now needs t  o obtain a projectId from WalletConnect Cloud.

  chains: [anvil, zksync],
  ssr: false, // If your dApp uses server side rendering (SSR) , Then true
});

// export default function RainbowKitConfig() {
// }
