import { useState, ChangeEvent, useMemo, useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { toast } from 'react-toastify'
import { parseEther } from 'viem'
import Input from "../../components/Input"
import { CEIL_OF_ETH_AMOUNT_TO_PAY, CHAIN_ID, FLOOR_OF_ETH_AMOUNT_TO_PAY, IDO_CONTRACT_ABI, IDO_CONTRACT_ADDRESS, MSG_CONNECT_WALLET, MSG_SWITCH_NETWORK, REGEX_NUMBER_VALID } from '../../utils/constants'

//  ----------------------------------------------------------------------------------------

interface IProps {
  priceOfPekoInEth: number;
}

//  ----------------------------------------------------------------------------------------

export default function SaleBoard({ priceOfPekoInEth }: IProps) {
  const [amount, setAmount] = useState<string>('0')
  const [maxAmount, setMaxAmount] = useState<number>(0)
  const [minAmount, setMinAmount] = useState<number>(0)

  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  //  -----------------------------------------------------------------

  //  The amount in number type
  const amountInNumberType = useMemo<string>(() => {
    if (amount[0] === '0') {
      if (amount[1] !== '.')
        return `${Number(amount)}`
    }
    return amount
  }, [amount])

  //  Eth amount to pay to purchase PEKO.
  const ethAmountToPay = useMemo<number>(() => {
    return priceOfPekoInEth * Number(amountInNumberType)
  }, [priceOfPekoInEth, amountInNumberType])

  //  Buy with ETH
  const { config: configOfBuy } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'buy',
    value: parseEther(`${ethAmountToPay}`),
    onError: (error) => {
      console.log('>>>>>>>>>> error.message of buy => ', error.message)
    }
  })
  const { write: buy, data: dataOfBuy } = useContractWrite(configOfBuy)
  const { isLoading: buyIsLoading } = useWaitForTransaction({
    hash: dataOfBuy?.hash,
    onSuccess: () => {
      toast.success('Purchased.');
    }
  })

  //  -----------------------------------------------------------------

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setAmount(value);
    }
  }

  const handleBuy = () => {
    if (isConnected) {
      if (chain?.id === CHAIN_ID) {
        if (ethAmountToPay >= FLOOR_OF_ETH_AMOUNT_TO_PAY && ethAmountToPay <= CEIL_OF_ETH_AMOUNT_TO_PAY) {
          if (buy) {
            buy()
          } else {
            toast.warn("You aren't whitelisted.")
          }
        } else {
          toast.warn(`You must purchase ${minAmount} to ${maxAmount} PEKO.`)
        }
      } else {
        toast.warn(MSG_SWITCH_NETWORK)
      }
    } else {
      toast.info(MSG_CONNECT_WALLET)
    }
  }

  //  -----------------------------------------------------------------

  useEffect(() => {
    setMaxAmount(Math.floor(CEIL_OF_ETH_AMOUNT_TO_PAY / priceOfPekoInEth))
    setMinAmount(Math.ceil(FLOOR_OF_ETH_AMOUNT_TO_PAY / priceOfPekoInEth))
  }, [priceOfPekoInEth])

  //  -----------------------------------------------------------------

  return (
    <div className="col-span-7 md:col-span-4 border-2 border-yellow-800 rounded-md">
      {/* title */}
      <div className="py-2 px-4 border-b-2 border-yellow-800">
        <h2 className="text-yellow-800 uppercase text-lg">Sale</h2>
      </div>
      {/* content */}
      <div className="p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Amount:</span>
            <Input
              className="!border !border-yellow-800 rounded-lg"
              onChange={handleAmount}
              value={amountInNumberType}
              endAdornment={
                <Button
                  color="amber"
                  className="text-base font-normal py-1 px-3 rounded-lg"
                  onClick={() => setAmount(`${maxAmount}`)}
                >
                  Max
                </Button>
              }
            />
            <Button
              color="amber"
              className="text-base hidden md:block"
              disabled={Number(amount) <= 0 || buyIsLoading}
              onClick={() => handleBuy()}
            >Buy</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Balance:</span>
              <span className="text-gray-100 text-base uppercase font-bold">- - ETH</span>
            </div>
            <Button color="amber" className="text-base block md:hidden py-2">Buy</Button>
          </div>

        </div>

        {/* Sale ends in */}
        <div className="flex flex-col gap-2">
          <h2 className="text-yellow-800 uppercase text-lg">Sale ends in</h2>
          <p className="text-gray-100">
            2 Days : 7 Hours : 14 Minutes : 10 Seconds
          </p>
        </div>
      </div>
    </div>
  )
}