import { useState, ChangeEvent, useMemo, useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import { useAccount, useBalance, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { toast } from 'react-toastify'
import { parseEther } from 'viem'
import Input from "../../components/Input"
import { CEIL_OF_ETH_AMOUNT_TO_PAY, CHAIN_ID, FIXED_DECIMAL, FLOOR_OF_ETH_AMOUNT_TO_PAY, IDO_CONTRACT_ABI, IDO_CONTRACT_ADDRESS, MSG_CONNECT_WALLET, MSG_SWITCH_NETWORK, REGEX_NUMBER_VALID } from '../../utils/constants'
import api from '../../utils/api'

//  ----------------------------------------------------------------------------------------

interface IProps {
  saleIndex: number;
}

//  ----------------------------------------------------------------------------------------

export default function SaleBoard({ saleIndex }: IProps) {
  const [amount, setAmount] = useState<string>('0')
  const [proof, setProof] = useState<Array<string>>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { address, isConnected } = useAccount()
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

  const { data: ethBalanceData } = useBalance({ address })

  //  Buy with ETH
  const { config: configOfBuy } = usePrepareContractWrite({
    address: IDO_CONTRACT_ADDRESS,
    abi: IDO_CONTRACT_ABI,
    functionName: 'buy',
    args: [proof],
    value: parseEther(amount),
    onError: (error) => {
      const errorObject = JSON.parse(JSON.stringify(error))
      setErrorMessage(errorObject.cause.reason)
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

  const ethBalanceOfWallet = useMemo<number>(() => {
    if (ethBalanceData) {
      return Number(ethBalanceData.formatted)
    }
    return 0
  }, [ethBalanceData])

  const maxAmount = useMemo<number>(() => {
    if (ethBalanceOfWallet <= CEIL_OF_ETH_AMOUNT_TO_PAY) {
      return ethBalanceOfWallet
    }
    return CEIL_OF_ETH_AMOUNT_TO_PAY
  }, [ethBalanceOfWallet])

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
        if (saleIndex === 1) {
          if (Number(amount) >= FLOOR_OF_ETH_AMOUNT_TO_PAY && Number(amount) <= CEIL_OF_ETH_AMOUNT_TO_PAY) {
            if (buy) {
              buy()
            } else {
              toast.warn(errorMessage)
            }
          } else {
            toast.warn(`You must purchase ${FLOOR_OF_ETH_AMOUNT_TO_PAY} to ${CEIL_OF_ETH_AMOUNT_TO_PAY} PEKO.`)
          }
        } else {
          buy?.()
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
    if (address && saleIndex === 1) {
      api.post('/proof', { address })
        .then(res => {
          console.log('>>>>>>>>>> res.data.proof => ', res.data.proof)
          if (res.data.proof.length > 0) {
            setProof(res.data.proof)
          } else {
            toast.warn("You aren't whitelisted.")
          }
        })
        .catch(error => {
          console.log('>>>>>>>>> error => ', error)
        })
    }
  }, [address, saleIndex])

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
                <>
                  {saleIndex === 1 && (
                    <Button
                      color="amber"
                      className="text-base font-normal py-1 px-3 rounded-lg"
                      onClick={() => setAmount(`${maxAmount}`)}
                    >Max</Button>
                  )}
                </>
              }
            />
            {saleIndex === 1 ? (
              <Button
                color="amber"
                className="text-base hidden md:block"
                disabled={buyIsLoading || Number(amount) > ethBalanceOfWallet || Number(amount) > maxAmount || Number(amount) < FLOOR_OF_ETH_AMOUNT_TO_PAY || proof.length === 0}
                onClick={() => handleBuy()}
              >Buy</Button>
            ) : saleIndex === 2 ? (
              <Button
                color="amber"
                className="text-base hidden md:block"
                disabled={buyIsLoading || Number(amount) <= 0}
                onClick={() => handleBuy()}
              >Buy</Button>
            ) : (<></>)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Balance:</span>
              <span className="text-gray-100 text-base uppercase font-bold">
                {address ? Number(ethBalanceData?.formatted).toFixed(FIXED_DECIMAL) : '- -'} ETH
              </span>
            </div>
            <Button color="amber" className="text-base block md:hidden py-2">Buy</Button>
          </div>
        </div>

        {/* Sale ends in */}
        <div className="flex flex-col gap-2">
          <h2 className="text-yellow-800 uppercase text-lg">Sale ends in</h2>
          <p className="text-gray-100">

          </p>
        </div>
      </div>
    </div>
  )
}