import { useMemo } from 'react';
import { Button } from '@material-tailwind/react'
import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { formatEther, formatUnits } from 'viem';
import { toast } from 'react-toastify';
import { CHAIN_ID, FIXED_DECIMAL, IDO_CONTRACT_ABI, IDO_CONTRACT_ADDRESS, MSG_CONNECT_WALLET, MSG_SWITCH_NETWORK, PEKO_DECIMAL } from '../../utils/constants'

export default function Claim1() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  //  ----------------------------------------------------------------------------------------

  //  Get claimable PEKO amount in bigint
  const { data: claimAmountInBigint } = useContractRead({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'getClaimAmount',
    args: [address],
    watch: true
  });
  console.log('>>>>>>>>> claimAmountInBigint => ', claimAmountInBigint)

  //  Get paid eth amount of a user
  const { data: paidEthAmountInBigint } = useContractRead({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'userDeposited',
    args: [address],
    watch: true,
  })

  //  ----------------------------------------------------------------------------------------

  //  Claimable PEKO amount in number
  const claimAmount = useMemo<number>(() => {
    if (typeof claimAmountInBigint === 'bigint') {
      return Number(formatUnits(claimAmountInBigint, PEKO_DECIMAL))
    }
    return 0
  }, [claimAmountInBigint])

  //  Claim PEKO
  const { config: configOfClaimRewardToken } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'claimRewardToken'
  })
  const { write: claimRewardToken, data: dataOfClaimRewardToken } = useContractWrite(configOfClaimRewardToken)
  const { isLoading: claimRewardTokenIsLoading } = useWaitForTransaction({
    hash: dataOfClaimRewardToken?.hash,
    onSuccess: () => {
      toast.success('Claimed.')
    },
    onError: () => {
      toast.error('Claim failed.')
    }
  })

  //  ----------------------------------------------------------------------------------------

  //  Paid ETH amount
  const paidEthAmount = useMemo<number>(() => {
    if (typeof paidEthAmountInBigint === 'bigint') {
      return Number(formatEther(paidEthAmountInBigint))
    }
    return 0
  }, [paidEthAmountInBigint])

  //  ----------------------------------------------------------------------------------------

  //  Claim Peko
  const handleClaimPeko = () => {
    if (isConnected) {
      if (chain?.id === CHAIN_ID) {
        if (claimAmount > 0) {
          claimRewardToken?.()
        } else {
          toast.warn('Please purchase token by clicking "Buy" button.')
        }
      } else {
        toast.warn(MSG_SWITCH_NETWORK)
      }
    } else {
      toast.info(MSG_CONNECT_WALLET)
    }
  }

  //  ----------------------------------------------------------------------------------------

  return (
    <div className="p-4 grid grid-cols-7 gap-4 md:gap-0">
      <div className="col-span-7 md:col-span-3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Total purchased */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Purchased:</span>
            <span className="text-base text-gray-100 uppercase font-bold">{paidEthAmount.toFixed(FIXED_DECIMAL)} ETH</span>
          </div>

          {/* Receivable PEKO */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Receivable PEKO:</span>
            <span className="text-base text-gray-100 uppercase font-bold">
              {claimAmount} PEKO
            </span>
          </div>
        </div>

        {/* Receivable ETH */}
        {/* <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-800">Receivable ETH:</span>
          <span className="text-base text-gray-100 uppercase font-bold">- - ETH</span>
        </div> */}
      </div>

      <div className="col-span-7 md:col-span-4 flex flex-col justify-center items-center">
        <Button
          color="amber"
          className="text-base normal-case"
          disabled={claimRewardTokenIsLoading || claimAmount <= 0}
          onClick={handleClaimPeko}
        >Claim PEKO</Button>
      </div>
    </div>
  )
}