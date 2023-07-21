import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { createPublicClient, http } from "viem";
import { WagmiConfig, createConfig } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import stylesheet from "~/tailwind.css";

//  ---------------------------------------------------------------------------------------------------------

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

//  ---------------------------------------------------------------------------------------------------------

const chains = [lineaTestnet]
const projectId = process.env.PROJECT_ID || ''
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: createPublicClient({
    chain: lineaTestnet,
    transport: http()
  })
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

//  ---------------------------------------------------------------------------------------------------------

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <WagmiConfig config={wagmiConfig}>
          <Outlet />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
