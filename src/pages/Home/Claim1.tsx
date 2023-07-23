import { Button } from '@material-tailwind/react'

export default function Claim1() {
  return (
    <div className="p-4 border-b-2 border-yellow-800 grid grid-cols-7 gap-4 md:gap-0">
      <div className="col-span-7 md:col-span-3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Total purchased */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Purchased:</span>
            <span className="text-base text-gray-100 uppercase font-bold">- - ETH</span>
          </div>

          {/* Receivable PEKO */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Receivable PEKO:</span>
            <span className="text-base text-gray-100 uppercase font-bold">- - PEKO</span>
          </div>
        </div>

        {/* Receivable ETH */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-800">Receivable ETH:</span>
          <span className="text-base text-gray-100 uppercase font-bold">- - ETH</span>
        </div>
      </div>

      <div className="col-span-7 md:col-span-4 flex flex-col justify-center items-center">
        <Button color="amber" className="text-base normal-case">Claim ETH and PEKO</Button>
      </div>
    </div>
  )
}