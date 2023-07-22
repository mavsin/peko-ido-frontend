import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./Routes";
import { publicProvider } from "wagmi/providers/public";

//  --------------------------------------------------------------------------------------

const projectId = import.meta.env.VITE_PROJECT_ID || ''

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient: createPublicClient({
//     chain: lineaTestnet,
//     transport: http()
//   })
// })
const { chains, publicClient, webSocketPublicClient } = configureChains([lineaTestnet], [publicProvider()])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient
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
