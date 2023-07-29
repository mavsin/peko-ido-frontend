import { Button } from "@material-tailwind/react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseUnits } from "viem/utils";
import { IDO_CONTRACT_ABI, IDO_CONTRACT_ADDRESS, SALE_INDEX_OF_PRIVATE_SALE, SALE_INDEX_OF_PUBLIC_SALE } from "../../utils/constants";
import { toast } from "react-toastify";

export default function ControllerForOwner() {

  //  Start public sale
  const { config: configOfStartPublicSale, isSuccess: startPublicSaleIsPrepared } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'startSale',
    args: [parseUnits(`${SALE_INDEX_OF_PUBLIC_SALE}`, 0)]
  })
  const { write: startPublicSale, data: dataOfStartPublicSale } = useContractWrite(configOfStartPublicSale)
  const { isLoading: startPublicSaleIsLoading } = useWaitForTransaction({
    hash: dataOfStartPublicSale?.hash,
    onSuccess: () => {
      toast.success('Public sale has been started.')
    },
    onError: () => {
      toast.error('Starting public sale has been failed')
    }
  })

  //  Start private sale
  const { config: configOfStartPrivateSale, isSuccess: startPrivateSaleIsPrepared } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'startSale',
    args: [parseUnits(`${SALE_INDEX_OF_PRIVATE_SALE}`, 0)]
  })
  const { write: startPrivateSale, data: dataOfStartPrivateSale } = useContractWrite(configOfStartPrivateSale)
  const { isLoading: startPrivateSaleIsLoading } = useWaitForTransaction({
    hash: dataOfStartPrivateSale?.hash,
    onSuccess: () => {
      toast.success('Private sale has been started.')
    },
    onError: () => {
      toast.error('Starting private sale has been failed')
    }
  })

  //  Stop sale
  const { config: configOfStopSale, isSuccess: stopSaleIsPrepared } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'stopSale'
  })
  const { write: stopSale, data: dataOfStopSale } = useContractWrite(configOfStopSale)
  const { isLoading: stopSaleIsLoading } = useWaitForTransaction({
    hash: dataOfStopSale?.hash,
    onSuccess: () => {
      toast.success('Sale has been stopped.')
    },
    onError: () => {
      toast.error('Stopping sale has been failed.')
    }
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
          disabled={startPrivateSaleIsLoading || !startPrivateSaleIsPrepared}
          onClick={() => startPrivateSale?.()}
        >Start private sale</Button>
      </div>
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
          disabled={startPublicSaleIsLoading || !startPublicSaleIsPrepared}
          onClick={() => startPublicSale?.()}
        >Start public sale</Button>
      </div>
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
          disabled={stopSaleIsLoading || !stopSaleIsPrepared}
          onClick={() => stopSale?.()}
        >Stop sale</Button>
      </div>
    </div>
  )
}