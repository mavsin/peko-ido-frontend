import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { createPublicClient, http } from "viem";
import { WagmiConfig, createConfig } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./Routes";

//  --------------------------------------------------------------------------------------

const chains = [lineaTestnet]
const projectId = import.meta.env.VITE_PROJECT_ID || ''
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: createPublicClient({
    chain: lineaTestnet,
    transport: http()
  })
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

//  --------------------------------------------------------------------------------------

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>

  )
}

export default App
