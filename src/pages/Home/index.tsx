import { lazy, useState } from "react"
import { Button } from '@material-tailwind/react'
import Container from "../../components/Container"
import { useAccount } from "wagmi"
import { TSaleMode } from "../../utils/types"
import { OWNER_WALLET_ADDRESS } from "../../utils/constants"

//  ------------------------------------------------------------------------------------------------------

const SaleBoard = lazy(() => import('./SaleBoard'))
const Claim1 = lazy(() => import('./Claim1'))
const ControllerForOwner = lazy(() => import('./ControllerForOwner'))
const SaleInfoBoard = lazy(() => import('./SaleInfoBoard'))

//  ------------------------------------------------------------------------------------------------------

export default function Home() {
  const { address } = useAccount()

  const [saleMode, setSaleMode] = useState<TSaleMode>('private')

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <div className="flex items-center">
            <Button
              color="amber"
              variant="outlined"
              className={`text-lg font-normal normal-case py-2 rounded-tr-none rounded-br-none ${saleMode === 'private' ? 'text-gray-100' : ''}`}
              onClick={() => setSaleMode('private')}
            >Private</Button>
            <Button
              color="amber"
              variant="outlined"
              className={`text-lg font-normal normal-case py-2 rounded-tl-none rounded-bl-none ${saleMode === 'public' ? 'text-gray-100' : ''}`}
              onClick={() => setSaleMode('public')}
            >Public</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 xl:col-span-2 flex flex-col gap-8">
            {/* Logo and Sale */}
            <div className="grid grid-cols-7 gap-8">
              {/* Logo */}
              <div className="col-span-3 border-2 border-yellow-800 rounded-md hidden md:flex flex-col justify-center items-center">
                <img src="/assets/images/logo.png" alt="Logo" className="w-40" />
              </div>

              <SaleBoard />
            </div>

            {/* Total raised */}
            <div className="border-2 border-yellow-800 rounded-md">
              {/* title */}
              <div className="py-2 px-4 border-b-2 border-yellow-800">
                <h2 className="text-yellow-800 text-lg">Total raised: <span className="uppercase">- - ETH</span></h2>
              </div>
              {/* Content 1 */}
              <Claim1 />

              {/* Content 2 */}
              {/* <Claim2 /> */}
            </div>

            {address === OWNER_WALLET_ADDRESS && <ControllerForOwner />}
          </div>



          {/* Sale Info */}
          <SaleInfoBoard saleMode={saleMode} />
        </div>
      </div>
    </Container>
  )
}