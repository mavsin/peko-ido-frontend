import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from "wagmi"
import { Link } from 'react-router-dom'
import { Button } from "@material-tailwind/react";
import { useWeb3Modal } from "@web3modal/react"
import Container from "../../components/Container";

//  ---------------------------------------------------------------------------------------------------

const chainId = import.meta.env.VITE_CHAIN_ID || ''

//  ---------------------------------------------------------------------------------------------------

export default function Navbar() {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  return (
    <nav className="flex justify-center py-4 bg-black border-b border-gray-500">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="logo" className="w-8" />
          </Link>

          {isConnected ? chain?.id === Number(chainId) ? (
            <Button color="amber" className="normal-case text-sm" onClick={() => disconnect?.()}>Disconnect</Button>
          ) : (
            <Button color="amber" className="normal-case text-sm" onClick={() => switchNetwork?.(Number(chainId))}>Switch Network</Button>
          ) : (
            <Button color="amber" className="normal-case text-sm" onClick={() => open()}>Connect Wallet</Button>
          )}
        </div>
      </Container>
    </nav>
  )
}