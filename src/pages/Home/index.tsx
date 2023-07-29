import { lazy, useMemo, useEffect, useState } from "react"
import { Button } from '@material-tailwind/react'
import { useAccount, useContractRead } from "wagmi"
import { IDO_CONTRACT_ABI, IDO_CONTRACT_ADDRESS, SALE_INFOS } from "../../utils/constants"
import { formatEther } from "viem"
import { ISaleInfo } from "../../utils/interfaces"
import Container from "../../components/Container"

//  ------------------------------------------------------------------------------------------------------

const SaleBoard = lazy(() => import('./SaleBoard'))
const Claim1 = lazy(() => import('./Claim1'))
const ControllerForOwner = lazy(() => import('./ControllerForOwner'))
const SaleInfoBoard = lazy(() => import('./SaleInfoBoard'))

//  ------------------------------------------------------------------------------------------------------

export default function Home() {
  const [saleInfo, setSaleInfo] = useState<ISaleInfo>(SALE_INFOS[0])

  const { address } = useAccount()

  //  Owner's wallet address
  const { data: walletAddressOfOwner } = useContractRead({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'owner',
    watch: true
  })

  const { data: saleIndexInBigint } = useContractRead({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'saleIndex',
    watch: true
  })

  //  Get the price of 1 PEKO
  const { data: priceOfPekoInBigint } = useContractRead({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'getPrice'
  })

  //  The price of 1 PEKO in ETH
  const priceOfPekoInEth = useMemo<number>(() => {
    if (typeof priceOfPekoInBigint === 'bigint') {
      return Number(formatEther(priceOfPekoInBigint))
    }
    return 0
  }, [priceOfPekoInBigint])

  /**
   * 0: Pending
   * 1: Private sale
   * 2: Public sale
   */
  const saleIndex = useMemo<number>(() => {
    if (saleIndexInBigint !== undefined) {
      return Number(saleIndexInBigint)
    }
    return -1
  }, [saleIndexInBigint])

  console.log('>>>>>>>> saleIndex => ', saleIndex)

  useEffect(() => {
    const _saleInfo = SALE_INFOS[saleIndex]
    if (_saleInfo) {
      if (saleIndex === 1) {
        _saleInfo.priceInEth = priceOfPekoInEth
        _saleInfo.saleType = 'Private'
      } else if (saleIndex === 2) {
        _saleInfo.priceInEth = priceOfPekoInEth
        _saleInfo.saleType = 'Public'
      }
      setSaleInfo(_saleInfo)
    }
  }, [saleIndex])

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <div className="flex items-center">
            <Button
              color="amber"
              variant="outlined"
              className={`text-lg font-normal normal-case py-2 rounded-tr-none rounded-br-none ${saleIndex === 1 ? 'text-gray-100' : ''}`}
            >Private</Button>
            <Button
              color="amber"
              variant="outlined"
              className={`text-lg font-normal normal-case py-2 rounded-tl-none rounded-bl-none ${saleIndex === 2 ? 'text-gray-100' : ''}`}
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

              <SaleBoard priceOfPekoInBigint={priceOfPekoInBigint} />
            </div>

            {/* Total raised */}
            <div className="border-2 border-yellow-800 rounded-md">
              {/* title */}
              <div className="py-2 px-4 border-b-2 border-yellow-800">
                <h2 className="text-yellow-800 text-lg">Total raised: <span className="uppercase">- - ETH</span></h2>
              </div>

              {/* Content 1 */}
              <Claim1 />
            </div>
            {address === walletAddressOfOwner && <ControllerForOwner />}
          </div>

          {/* Sale Info */}
          <SaleInfoBoard saleInfo={saleInfo} />
        </div>
      </div>
    </Container>
  )
}