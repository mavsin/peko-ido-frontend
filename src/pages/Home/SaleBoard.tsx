import { Button } from '@material-tailwind/react'
import Input from "../../components/Input";

export default function SaleBoard() {
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
              endAdornment={<Button color="amber" className="text-base font-normal py-1 px-3 rounded-lg">Max</Button>}
            />
            <Button color="amber" className="text-base hidden md:block">Buy</Button>
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