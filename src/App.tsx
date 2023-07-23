import { Suspense } from "react";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Routes from "./Routes";
import Loading from "./components/Loading";

//  --------------------------------------------------------------------------------------

const projectId = import.meta.env.VITE_PROJECT_ID || ''

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
    <Suspense fallback={<Loading />}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Suspense>

  )
}

export default App
